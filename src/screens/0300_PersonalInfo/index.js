import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Autocomplete, Box, Button, Grid, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { fonts } from '@theme';
import { StyledTextInput } from '@components/TextInput';
import { styles } from './styles';
import Subtitle from '@components/Subtitle';
import { MainButton } from '@components/Button';
import axios from 'axios';
import SearchAddress from '@components/AutoComplete';
import MainCheckBox from '@components/CheckBox';
import bookingStore from '@store/zustand/booking.store';
import { encryptData } from '@utils';
import { HLIVE_SERVER_URI } from '@constants';
import moment from 'moment';

export default function PersonalInfo(props) {
  const { currentStep, setCurrentStep, isLiveConsult } = props;
  const { selectedVehicleInfo, selectedDealershipInfo, selectedBookingDate, selectedBookingTime, customerInfo, setRequestResult } = bookingStore();

  const convertedBookingDate = moment(selectedBookingDate).format('YYYY-MM-DD');

  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [geoLocation, setGeoLocation] = useState();
  const [title, setTitle] = useState('Mr.');
  const [firstName, setFirstName] = useState(customerInfo?.firstName || '');
  const [lastName, setLastName] = useState(customerInfo?.lastName || '');
  const [email, setEmail] = useState(customerInfo?.email || '');
  const [userPhoneNumber, setUserPhoneNumber] = useState(customerInfo?.phone) || '';
  const [street, setStreet] = useState(customerInfo?.street || '');
  const [houseNumber, setHouseNumber] = useState(customerInfo?.houseNumber || '');
  const [postCode, setPostCode] = useState(customerInfo?.postCode || '');
  const [city, setCity] = useState(customerInfo?.city || '');
  const [comment, setComment] = useState(customerInfo?.comment || '');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userPhoneNumberError, setUserPhoneNumberError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [houseNumberError, setHouseNumberError] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [marketingAgreement, setMarketingAgreement] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [marketingMail, setMarketingMail] = useState(false);
  const [marketingPhone, setMarketingPhone] = useState(false);
  const [marketingMessenger, setMarketingMessenger] = useState(false);

  const nameRegex = /\d/g;
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const phoneNumberRegex = /[0-9]{9,14}/g;

  const getGeoLocation = async () => {
    try {
      const response = await axios.get('https://geolocation-db.com/json/');
      setGeoLocation(response.data);
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  useEffect(() => {
    getGeoLocation();
  }, []);

  const handleSubmit = async () => {
    const streetAndHouseNumber = [street, houseNumber].join(' ');
    const postCodeAndCity = [postCode, city].join(' ');
    const address = [streetAndHouseNumber, postCodeAndCity].join(', ');

    const req = {
      userInfo: {
        title,
        firstName,
        lastName,
        email,
        userPhoneNumber,
        street,
        houseNumber,
        postCode,
        city,
        address,
        comment,
        ipAddress: geoLocation?.IPv4,
        // countryCode: geoLocation?.country_code,
        // country: geoLocation?.country_name,
        country: 'Poland',
        countryCode: 'PL',
        language: 'English',
        languageCode: 'EN',
        userType: 'GUEST',
        mobile: userPhoneNumber,
        marketingEmail,
        marketingMail,
        marketingPhone,
        marketingMessenger,
      },
      location: {
        type: 'Point',
        coordinates: [geoLocation?.latitude || 0, geoLocation?.longitude || 0],
      },
      country: 'PL',
      bookingDate: isLiveConsult ? '' : convertedBookingDate,
      bookingTime: isLiveConsult ? '' : selectedBookingTime,
      requestType: isLiveConsult ? 'H_LIVE_REQUEST' : 'H_LIVE',
      requestStatus: 'REQUESTED',
      lastModifier: 'GUEST',
      liveConsult: true,
      requestData: {
        type: 'hLive',
        data: {
          modelCode: selectedVehicleInfo.modelId,
          modelName: selectedVehicleInfo.modelDescription,
          modelImage: selectedVehicleInfo.image,
        },
      },
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      requestDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      callCondition: 'WAITING',
      dealer: {
        dealerCode: 'HMP0003',
        dealerName: 'dealer1',
        dealerProfile:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rocketpunch.com%2F%40k98051223&psig=AOvVaw1adAIgfkUze2GElIuU0xFG&ust=1666956079736000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDW1rmlgPsCFQAAAAAdAAAAABAE',
        dealerTelephone: '01054548484',
      },
      dealership: {
        businessHour: selectedDealershipInfo.businessHour,
        holiday: selectedDealershipInfo.holiday,
        // dealershipCode: selectedDealershipInfo.dealershipCode,
        dealershipCode: 'C27AG02190',
        dealershipName: selectedDealershipInfo.name,
        dealershipAddress: selectedDealershipInfo.address,
        representativeEmail: selectedDealershipInfo.email,
        representativeWeb: selectedDealershipInfo.website,
        dealershipTelephone: selectedDealershipInfo.telephone,
        dealershipLocation: selectedDealershipInfo.position,
      },
    };
    console.log(req);
    const encryptedBody = await encryptData(req);
    try {
      const response = await axios.post('http://localhost:4000/viva/apis/hLiveCustomerWeb/createHLiveRequest', {
        encryptedBody,
      });
      if (response) {
        setRequestResult(response.data.data.serviceRequest._id);
        const requestId = response.data.data.serviceRequest._id;

        isLiveConsult
          ? navigate('/live', {
              state: {
                requestId,
              },
            })
          : setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEmailValidation = (event) => {
    setEmail(event.target.value);
    setEmailError(!emailRegex.test(email));
  };

  const handlePhoneNumberValidation = (event) => {
    setUserPhoneNumber(event.target.value);
    setUserPhoneNumberError(!phoneNumberRegex.test(userPhoneNumber));
  };

  // checkbox button
  const handlePrivacyCheckBox = () => {
    setPrivacyAgreement(!privacyAgreement);
  };

  const handleMarketingCheckBox = () => {
    setMarketingAgreement(!marketingAgreement);
  };

  const handleMarketingEmail = () => {
    setMarketingEmail(!marketingEmail);
  };

  const handleMarketingMail = () => {
    setMarketingMail(!marketingMail);
  };

  const handleMarketingPhone = () => {
    setMarketingPhone(!marketingPhone);
  };

  const handleMarketingMessenger = () => {
    setMarketingMessenger(!marketingMessenger);
  };

  return (
    <>
      <Subtitle title={t('input_your_information')} />
      <div>
        <FormControl>
          <RadioGroup
            sx={styles.radioGroup}
            value={title}
            onChange={handleTitleChange}
            aria-labelledby="radio-label"
            // defaultValue="male"
            name="radio-group"
          >
            <FormControlLabel value="Mr." control={<Radio sx={styles.radioButton} />} label={t('mr')} />
            <FormControlLabel value="Ms." control={<Radio sx={styles.radioButton} />} label={t('ms')} />
          </RadioGroup>
        </FormControl>

        <Grid container rowSpacing={'20px'} columnSpacing={'12px'}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <StyledTextInput
              label={t('first_name')}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={firstNameError}
              helperText={firstNameError ? 'Invalid format' : null}
              required
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <StyledTextInput
              label={t('last_name')}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              error={lastNameError}
              helperText={lastNameError ? 'Invalid format' : null}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <StyledTextInput
              label={t('email')}
              value={email}
              onChange={(event) => handleEmailValidation(event)}
              error={emailError}
              helperText={emailError ? 'Invalid format' : null}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <StyledTextInput
              label={t('mobile')}
              value={userPhoneNumber}
              onChange={(event) => handlePhoneNumberValidation(event)}
              error={userPhoneNumberError}
              helperText={userPhoneNumberError ? 'Invalid format' : null}
              required
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <StyledTextInput
              label={t('street')}
              onChange={(event) => setStreet(event.target.value)}
              required
              helperText={streetError ? 'Invalid format' : null}
              InputProps={{
                endAdornment: <></>,
              }}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <StyledTextInput
              label={t('apartment_suite_unit_etc')}
              value={houseNumber}
              onChange={(event) => setHouseNumber(event.target.value)}
              error={houseNumberError}
              helperText={houseNumberError ? 'Invalid format' : null}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <StyledTextInput
              label={t('city')}
              value={city}
              onChange={(event) => setCity(event.target.value)}
              error={cityError}
              helperText={cityError ? 'Invalid format' : null}
              autoComplete="on"
              required
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <StyledTextInput
              label={t('zip_postalcode')}
              value={postCode}
              onChange={(event) => setPostCode(event.target.value)}
              error={postCodeError}
              helperText={postCodeError ? 'Invalid format' : null}
              autoComplete="on"
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <StyledTextInput
              multiline
              rows={4}
              value={comment}
              placeholder="Leave us message"
              onChange={(event) => setComment(event.target.value)}
              error={commentError}
              helperText={commentError ? 'Invalid format' : null}
            />
          </Grid>
        </Grid>

        <Typography style={styles.mandatoryField}>
          {t('mark_required')} {t('mandatory_field')}
        </Typography>
      </div>

      <div style={styles.checkBoxContainer}>
        <div style={styles.privacyStatWrapper}>
          <Typography styles={fonts.b1_head_m}>{t('privacy_statement')}</Typography>
          <Box style={styles.contentsBox}>
            <MainCheckBox onChange={handlePrivacyCheckBox} checked={privacyAgreement} />
            <Typography style={styles.privacyStatText}>
              {t('yes_i_am_aware_that_i_can_read_more_about_how_Hyundai')} {t('clicking_here')}
            </Typography>
          </Box>
        </div>

        <div>
          <Typography styles={fonts.b1_head_m}>{t('marketing_authorization')}</Typography>
          <Box style={styles.contentsBox}>
            <MainCheckBox onChange={handleMarketingCheckBox} checked={marketingAgreement} />
            <Box>
              <Typography style={styles.privacyStatText}>{t('yes_i_want_good_offers_and_discounts')}</Typography>
              <Box style={styles.methodWrapper}>
                <Box style={styles.methodBox}>
                  <MainCheckBox onChange={handleMarketingEmail} checked={marketingEmail} />
                  <Typography style={styles.privacyStatText}>{t('email')}</Typography>
                </Box>
                <Box style={styles.methodBox}>
                  <MainCheckBox onChange={handleMarketingMail} checked={marketingMail} />
                  <Typography style={styles.privacyStatText}>{t('mail')}</Typography>
                </Box>
                <Box style={styles.methodBox}>
                  <MainCheckBox onChange={handleMarketingPhone} checked={marketingPhone} />
                  <Typography style={styles.privacyStatText}>{t('phone')}</Typography>
                </Box>
                <Box style={styles.methodBox}>
                  <MainCheckBox onChange={handleMarketingMessenger} checked={marketingMessenger} />
                  <Typography style={styles.privacyStatText}>{t('messenger_service')}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </div>

      <div style={styles.buttonBox}>
        <MainButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          disabled={!(firstName && lastName && email && userPhoneNumber && street && postCode && city && privacyAgreement === true)}
        >
          {isLiveConsult ? `${t('request_h_live')}` : `${t('request')}`}
        </MainButton>
      </div>
    </>
  );
}

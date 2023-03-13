import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography } from '@mui/material';
import { styles } from './styles';
import { fonts } from '@theme';
import bookingStore from '@store/booking.store';
import Banner from '@components/Banner';
import { displayString } from '@utils';
import moment from 'moment';
import axios from 'axios';
import { HLIVE_SERVER_URI, SERVER_URI } from '@constants';

export default function Confirmation() {
  //                                                             VARIABLE
  const { requestResult } = bookingStore();
  console.log('render & store result', requestResult);
  const [confirmedInfo, setConfirmedInfo] = useState();
  const vehicleModelInfo = confirmedInfo?.requestData.data;
  const dealershipInfo = confirmedInfo?.dealership;
  const customerInfo = confirmedInfo?.requestUser;
  const bookingDate = moment(confirmedInfo?.bookingDate).format('MMMM DD, YYYY');
  const bookingTime = confirmedInfo?.bookingTime;
  const { t } = useTranslation();

  //                                                              FUNCTIONS
  const getAllInfoById = async () => {
    try {
      // const response = await axios.post('http://localhost:4000/viva/apis/hLiveCustomerWeb/getAllInfoById', {
      //   id: requestResult,
      // });
      const response = await axios.post(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/getAllInfoById`, {
        id: requestResult,
      });

      if (response) {
        console.log(response);
        setConfirmedInfo(response.data[0]);
      }
    } catch (e) {
      console.error(e);
      alert('An error was occured. Please try again');
      return false;
    }
  };

  useEffect(() => {
    getAllInfoById();
  }, []);

  //                                                             RENDER
  return (
    <>
      <div>
        <Banner>
          <Typography style={styles.bannerTitle}>{t('thank_you')}</Typography>
          <Typography style={fonts.b2_head_r}>{t('your_schedule_for_h_live_has_been_delivered')}</Typography>
          <Typography style={fonts.b2_head_r}>{displayString(t('once_it_is_confirmed'), customerInfo?.email)}</Typography>
        </Banner>
      </div>

      <div style={styles.contentsContainerWrapper}>
        <div style={styles.contentsContainer}>
          <div style={styles.confirmInfoCard}>
            <Typography style={fonts.b2_head_m}>{t('model')}</Typography>
            <Divider style={styles.infoDivider} />
            <Box style={styles.infoBox}>
              <Typography style={fonts.s2}>{vehicleModelInfo?.modelName}</Typography>
              {vehicleModelInfo?.modelImage ? <img src={vehicleModelInfo.modelImage} style={styles.vehicleModelImage} alt="vehicle_image" /> : null}
            </Box>
          </div>

          <div style={styles.confirmInfoCard}>
            <Typography style={fonts.b2_head_m}>{t('dealership')}</Typography>
            <Divider style={styles.infoDivider} />
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('dealership_name')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo?.dealershipName}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('address')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo?.dealershipAddress}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('telephone')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo?.dealershipTelephone}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('email')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo?.representativeEmail}</Typography>
            </Box>
          </div>

          <div style={styles.confirmInfoCard}>
            <Typography style={fonts.b2_head_m}>{t('schedule')}</Typography>
            <Divider style={styles.infoDivider} />
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('date')}</Typography>
              <Box style={styles.infoBox}>
                <Typography style={fonts.b1_text_m}>{`${bookingDate} / ${bookingTime}`} </Typography>
              </Box>
            </Box>
          </div>

          <div style={styles.confirmInfoCard}>
            <Typography style={fonts.b2_head_m}>{t('personal_info')}</Typography>
            <Divider style={styles.infoDivider} />
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('name')}</Typography>
              <Typography style={fonts.b1_text_m}>{`${customerInfo?.firstName} ${customerInfo?.lastName}`}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('email')}</Typography>
              <Typography style={fonts.b1_text_m}>{customerInfo?.email}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('phone')}</Typography>
              <Typography style={fonts.b1_text_m}>{customerInfo?.userPhoneNumber}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('comments')}</Typography>
              <Typography style={fonts.b1_text_m}>{customerInfo?.comment}</Typography>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

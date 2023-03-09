import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '@components/DatePicker';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { fonts } from '@theme';
import TimePicker from '@components/TimePicker';
import { MainButton } from '@components/Button';

export default function Reservation({ vehicleModelInfo, dealershipInfo, customerInfo, handleClose }) {
  const { t } = useTranslation();
  const [dealershipAvailable, setDealershipAvailable] = useState(true);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.reservationHeader}>
          <Typography style={fonts.s2}>{t('book_a_schedule')}</Typography>
          <IconButton onClick={handleClose} style={styles.closeIcon}>
            <CloseIcon />
          </IconButton>
        </div>

        <div style={styles.contentsWrapper}>
          {dealershipAvailable ? null : (
            <Box style={styles.infoBanner}>
              <Typography style={fonts.b1_head_m}>{t('we_re_sorry')}</Typography>
              <Typography style={styles.infoBannerText}>{t('the_dealer_is_currently_unable_to_respond')}</Typography>
              <Typography style={styles.infoBannerText}>{t('the_dealer_will_contact_you')}</Typography>
            </Box>
          )}

          <div style={styles.contentsContainer}>
            <div style={styles.infoCardWrapper}>
              <div>
                <Box style={styles.infoCardHeader}>
                  <Typography style={fonts.b2_head_r}>{t('model')}</Typography>
                </Box>
                <Box style={styles.infoCardBox}>
                  <Typography style={fonts.s2}>{vehicleModelInfo?.modelName}</Typography>
                  {vehicleModelInfo?.modelImage ? <img style={styles.modelImage} src={vehicleModelInfo?.modelImage} alt="vehicle_image" /> : null}
                </Box>
              </div>

              <div>
                <Box style={styles.infoCardHeader}>
                  <Typography style={fonts.b2_head_r}>{t('dealership')}</Typography>
                </Box>
                <Box style={styles.infoCardBox}>
                  <Box style={styles.dealershipCard}>
                    <Box style={styles.mapInfo}></Box>
                    <Box style={styles.dealershipInfo}>
                      <Typography style={fonts.b2_head_m}>{dealershipInfo?.dealershipName}</Typography>
                      <Typography style={styles.cardInfoText}>{dealershipInfo?.dealershipAddress}</Typography>
                      <Typography style={styles.cardInfoText}>{dealershipInfo?.representativeEmail}</Typography>
                      <Typography style={styles.cardInfoText}>{dealershipInfo?.representativeWeb}</Typography>
                    </Box>
                  </Box>
                </Box>
              </div>

              <div>
                <Box style={styles.infoCardHeader}>
                  <Typography style={fonts.b2_head_r}>{t('personal_information')}</Typography>
                </Box>
                <Box style={styles.infoCardBox}>
                  <Box style={styles.personalInfoCard}>
                    <Typography style={fonts.b2_head_m}>{`${customerInfo.firstName} ${customerInfo.lastName}`}</Typography>
                    <Typography style={styles.cardInfoText}>{customerInfo?.address}</Typography>
                    <Typography style={styles.cardInfoText}>{customerInfo?.userPhoneNumber}</Typography>
                    <Typography style={styles.cardInfoText}>{customerInfo?.email}</Typography>
                    <Typography style={styles.cardInfoText}>{customerInfo?.comment}</Typography>
                  </Box>
                </Box>
              </div>
            </div>

            <div style={styles.datePickerContainer}>
              <DatePicker />
              <TimePicker />
            </div>
          </div>
          <div style={styles.buttonBox}>
            <MainButton variant="contained" color="primary" size="large" onClick={() => {}}>
              <Typography>{t('book_a_reservation')}</Typography>
            </MainButton>
          </div>
        </div>
      </div>
    </>
  );
}

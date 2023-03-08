import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography } from '@mui/material';
import { styles } from './styles';
import { fonts } from '@theme';
import bookingStore from '@store/zustand/booking.store';
import Banner from '@components/Banner';
import { displayString } from '@utils';
import moment from 'moment';

export default function Confirmation() {
  const { confirmationResult } = bookingStore();
  console.log(confirmationResult);
  const vehicleModelInfo = confirmationResult.requestData.data;
  const dealershipInfo = confirmationResult.dealership;
  const customerInfo = confirmationResult.requestUser;
  const bookingDate = moment(confirmationResult.bookingDate).format('MMMM DD, YYYY');
  const bookingTime = confirmationResult.bookingTime;
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Banner>
          <Typography style={fonts.h1}>{t('thank_you')}</Typography>
          <Typography style={fonts.b2_head_r}>{displayString(t('your_reservation_history_email_has_been_sent'), customerInfo.email)}</Typography>
          <Typography style={fonts.b2_head_r}>{t('we_are_planning_to_send_you_a_reminder_notification')}</Typography>
        </Banner>
      </div>

      <div style={styles.contentsContainerWrapper}>
        <div style={styles.contentsContainer}>
          <div style={styles.confirmInfoCard}>
            <Typography style={fonts.b2_head_m}>{t('model')}</Typography>
            <Divider style={styles.infoDivider} />
            <div style={styles.infoBox}>
              <Typography style={fonts.s2}>{vehicleModelInfo?.modelCode}</Typography>
              {vehicleModelInfo?.modelImage ? <img src={vehicleModelInfo.modelImage} style={styles.vehicleModelImage} alt="vehicle_image" /> : null}
            </div>
          </div>

          <div style={styles.confirmInfoCard}>
            <Typography style={fonts.b2_head_m}>{t('dealership')}</Typography>
            <Divider style={styles.infoDivider} />
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('dealership_name')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo.dealershipName}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('address')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo.dealershipAddress}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('telephone')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo.dealershipTelephone}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('email')}</Typography>
              <Typography style={fonts.b1_text_m}>{dealershipInfo.representativeEmail}</Typography>
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
              <Typography style={fonts.b1_text_m}>{`${customerInfo.firstName} ${customerInfo.lastName}`}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('email')}</Typography>
              <Typography style={fonts.b1_text_m}>{customerInfo.email}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('phone')}</Typography>
              <Typography style={fonts.b1_text_m}>{customerInfo.userPhoneNumber}</Typography>
            </Box>
            <Box style={styles.infoBox}>
              <Typography style={styles.infoTitleText}>{t('comments')}</Typography>
              <Typography style={fonts.b1_text_m}>{customerInfo.comment}</Typography>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

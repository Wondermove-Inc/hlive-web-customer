import { Box, IconButton, Typography } from '@mui/material/';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { fonts } from '@theme';
import { useTranslation } from 'react-i18next';
import { MainButton } from '@components/Button';
import { styles } from './styles';
import bookingStore from '@store/zustand/booking.store';

export default function DealershipInfoModal(props) {
  const { selectedDealershipInfo, setSelectedDealershipInfo } = bookingStore();
  const { currentStep, setCurrentStep, handleModalClose, dealershipInfo, handleClick } = props;

  const { t } = useTranslation();

  // const handleClick = (dealershipInfo) => {
  //   setSelectedDealershipInfo(dealershipInfo);
  //   console.log('!! Modal click Event --->', selectedDealershipInfo);
  //   // setCurrentStep(currentStep + 1);
  // };

  return (
    <>
      <div style={styles.cardContainer}>
        <div style={styles.cardHeader}>
          <Typography style={fonts.b1_head_m}>{dealershipInfo?.name}</Typography>
          <IconButton onClick={handleModalClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <Box style={styles.contentsWrapper}>
          <Box style={styles.contentsBox}>
            <PlaceIcon />
            <Typography style={fonts.b1_text_r}>{dealershipInfo.address}</Typography>
          </Box>

          <Box style={styles.contentsBox}>
            <PhoneIcon />
            <Typography style={fonts.b1_text_r}>{dealershipInfo.telephone}</Typography>
          </Box>

          <Box style={styles.contentsBox}>
            <MailOutlineIcon />
            <Typography style={fonts.b1_text_r}>{dealershipInfo.email}</Typography>
          </Box>

          <Box style={styles.contentsBox}>
            <EastIcon />
            <Typography style={fonts.b1_text_r}>{dealershipInfo.website}</Typography>
          </Box>
        </Box>

        <div style={styles.cardButton}>
          <MainButton variant="outlined" color="primary" size="small" autoFocus onClick={() => handleClick(dealershipInfo)}>
            <Typography>{t('select')}</Typography>
          </MainButton>
        </div>
      </div>
    </>
  );
}

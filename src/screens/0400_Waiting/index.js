import { useState, useEffect } from 'react';
import { Box, Button, LinearProgress, Modal, Typography } from '@mui/material';
import image_waiting_consult from '@images/image_waiting_consult.png';
import { useTranslation } from 'react-i18next';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Reservation from '@screens/0410_Reservation';
import { color } from '@theme';
import CloseIcon from '@mui/icons-material/Close';
import EastIcon from '@mui/icons-material/East';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { MainButton } from '@components/Button';
import { styles } from './styles';

export default function Waiting({ confirmationInfo }) {
  //                                                             VARIABLE
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  //                                                              FUNCTIONS
  // // * mount 시 modal 올라가게 하기
  // useEffect(() => {
  //   openModalScreen.start();
  // }, []);

  // // * mount 시 60초를 카운트하기위해 setInterval 실행
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
  //   }, ONE_SECOND);
  //   setSecondsInterval(interval);
  //   return () => {
  //     clearInterval(secondsInterval);
  //     clearInterval(remainingSeconds);
  //     setSecondsInterval(0);
  //     setRemainingSeconds(0);
  //   };
  // }, []);

  // // * 남은 시간 bar animation
  // useEffect(() => {
  //   Animated.timing(remainingTimeBarValue, {
  //     toValue: remainingSeconds - 1,
  //     duration: 1000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  //   // return () => {};
  // }, [remainingSeconds]);

  // // * 0초가 되면 clearInterval 및 isUnsuccessfulRequest = true
  // useEffect(() => {
  //   if (remainingSeconds === 0) {
  //     clearInterval(secondsInterval);
  //     // setIsUnsuccessfulRequest(true);
  //     closeEndTime();
  //   }
  //   // return () => {};
  // }, [remainingSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //                                                             RENDER
  return (
    <>
      <div style={styles.container}>
        <Typography style={styles.subtitle}>{t('request_live_consult')}</Typography>
        <Box style={styles.modelImageBox}>
          <img src={image_waiting_consult} style={styles.modelImage} alt={'image_waiting_consult'} />
        </Box>

        {openModal ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: color.grey_white }}>
            <ErrorOutlineIcon style={styles.progressIcon} />
            <Typography>{t('cancelled')}</Typography>
          </div>
        ) : (
          <div>
            <Box style={styles.progressBarBox}>
              <AccessTimeIcon style={styles.progressIcon} />
              <Typography>{t('remaining_time_is')}</Typography>
              <span>&nbsp;</span>
              <Typography style={styles.remainingTime}> 56 {t('seconds')}</Typography>
            </Box>
            <LinearProgress sx={styles.progressBar} variant="determinate" value={progress} />
          </div>
        )}
      </div>

      <Modal open={openModal} onClose={setOpenModal}>
        <Box style={styles.modalContainer}>
          <Reservation confirmInfo={confirmationInfo} handleClose={handleClose} />
        </Box>
      </Modal>

      <div style={styles.footerWrapper}>
        {openModal ? (
          <div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <MainButton variant="contained" color="secondary" size="large">
                {t('request_again')}
              </MainButton>
              <MainButton variant="contained" color="secondary" size="large">
                {t('book_a_reservation')}
              </MainButton>
            </div>
          </div>
        ) : (
          <div style={styles.footerContainer}>
            <Typography style={styles.footerText}>{t('do_you_want_to_cancel_the_live_consult')}</Typography>
            <Button style={styles.textButton} onClick={handleOpen}>
              {t('book_a_reservation')}
              <EastIcon />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

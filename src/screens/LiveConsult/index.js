import { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Divider, IconButton, LinearProgress, Modal, Typography } from '@mui/material';
import Consulting from '@screens/0500_Consulting';
import ConsultTimeChecker from '@components/TimeChecker';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { color } from '@theme';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EastIcon from '@mui/icons-material/East';
import Reservation from '@screens/0410_Reservation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { MainButton } from '@components/Button';
import Lottie from 'lottie-react';
import lottie_request from '@lotties/lottie_request.json';
import AlertPopup from '@components/Alert';
import moment from 'moment';
import bookingStore from '@store/zustand/booking.store';
import { encryptData } from '@utils';
import { io } from 'socket.io-client';
import { baseUrl, wsUrl } from '@config';

const REQUEST_DURATION_IN_SECONDS = 60;
const ONE_SECOND = 1000;

const SOCKET_URL = wsUrl; // 'http://wondermove.kr/viva'

export default function LiveConsult() {
  const { confirmationResult, setConfirmationResult } = bookingStore();
  const vehicleModelInfo = confirmationResult.requestData.data;
  const dealershipInfo = confirmationResult.dealership;
  const customerInfo = confirmationResult.requestUser;
  const locationInfo = confirmationResult.location;

  const [secondsInterval, setSecondsInterval] = useState();
  const [isWaiting, setIsWaiting] = useState(true);
  const [isRequestCancelled, setIsRequestCancelled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(REQUEST_DURATION_IN_SECONDS);
  const { t } = useTranslation();
  const [isModalOpened, setIsModalOpened] = useState(false);

  console.log('live rendered', confirmationResult);
  console.log('live chatRoomId', confirmationResult._id);

  const socket = useRef();

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      // alertUser;
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const updateLiveRequest = async () => {
    const data = {
      requestId: confirmationResult._id,
      requestStatus: 'CANCELLED',
    };
    const userId = customerInfo.userId;
    const userType = customerInfo.userId;
    const countryCode = customerInfo.countryCode;

    const user = { userId, userType, countryCode };
    const encryptedBody = await encryptData(data);

    try {
      const response = await axios.post('http://localhost:4000/viva/apis/hLiveCustomerWeb/updateServiceRequest', {
        encryptedBody,
        user,
      });
      if (response) {
        const result = response.data.data;
        console.log('cancel result', result);
        setIsRequestCancelled(true);
        setIsModalOpened(true);
      }
    } catch (e) {
      console.error(e);
      alert('An error was occured. Please try again');
      return false;
    }
  };

  const createLiveRequest = async () => {
    const req = {
      userInfo: {
        title: customerInfo.title,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        userPhoneNumber: customerInfo.userPhoneNumber,
        street: customerInfo.street,
        houseNumber: customerInfo.houseNumber,
        postCode: customerInfo.postCode,
        city: customerInfo.city,
        address: customerInfo.address,
        comment: customerInfo.comment,
        ipAddress: customerInfo.ipAddress,
        country: 'Poland',
        countryCode: 'PL',
        language: 'English',
        languageCode: 'EN',
        userType: 'GUEST',
        mobile: customerInfo.userPhoneNumber,
        marketingAgreement: customerInfo.marketingAgreement,
      },
      location: locationInfo,
      country: 'PL',
      bookingDate: '',
      bookingTime: '',
      requestType: 'H_LIVE_REQUEST',
      requestStatus: 'REQUESTED',
      lastModifier: 'GUEST',
      liveConsult: true,
      requestData: {
        type: 'hLive',
        data: vehicleModelInfo,
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
      dealership: dealershipInfo,
    };

    const encryptedBody = await encryptData(req);
    try {
      const response = await axios.post('http://localhost:4000/viva/apis/hLiveCustomerWeb/createHLiveRequest', {
        encryptedBody,
      });
      if (response) {
        console.log('req again', response);
        setConfirmationResult(response.data.data.serviceRequest);
        setRemainingSeconds(REQUEST_DURATION_IN_SECONDS);
        setIsRequestCancelled(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => setIsModalOpened(false);

  // SOCKET
  // const acceptListener = async ({ consultId, sender, receiver, chatRoomId }) => {
  //   console.log('🚀acceptListener ~ chatRoomId', chatRoomId, sender, receiver, chatRoomId);
  //   // closeModalScreen.start();
  //   dealerOnAccept(consultId, sender, receiver, chatRoomId);
  // };

  // const socketInitializer = async () => {
  //   const { requestId, userId } = requestInfo;
  //   socket.current = io(SOCKET_URL, {
  //     transports: ['websocket'],
  //   });

  //   socket.current.on('connect', () => {
  //     socket.current.emit('join', { roomId: requestId, sender: userId });
  //     console.log("🚀 ~ file: index.js ~ line 447 ~ socket.current.on ~ 'connect'", socket.current.connected);
  //   });

  //   socket.current.on('accept', acceptListener);
  // };

  // useEffect(() => {
  //   if (isVisible && socket.current == null) {
  //     socketInitializer();
  //   } else if (isVisible && socket.current != null) {
  //     socket.current.connect();
  //   }

  //   return () => {
  //     console.log('off');
  //     socket.current.off('accept', acceptListener);
  //     socket.current.disconnect();
  //     socket.current = null;
  //   };
  // }, [isVisible]);

  // PROGRESS BAR
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [confirmationResult._id]);

  // 60 SECONDS COUNTDOWN
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
    }, ONE_SECOND);
    setSecondsInterval(interval);
    return () => {
      clearInterval(secondsInterval);
      clearInterval(remainingSeconds);
      setSecondsInterval(0);
      setRemainingSeconds(0);
    };
  }, []);

  // * 0초가 되면 clearInterval
  useEffect(() => {
    if (remainingSeconds === 0) {
      clearInterval(secondsInterval);
      console.log('effect trigger');
      updateLiveRequest();
    }
    // return () => {};
  }, [remainingSeconds]);

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <div style={styles.headerBox}>
          <Box style={styles.headerLogoBox}>
            <Typography style={styles.headerTitle}>{t('h_live')}</Typography>
            {isWaiting ? null : <ConsultTimeChecker />}
          </Box>
          <IconButton>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <CloseIcon style={styles.closeButton} />
            </Link>
          </IconButton>
        </div>

        <Divider style={styles.headerDivider} />
        <div style={styles.dealershipInfoBox}>
          <Box style={styles.dealerAvatar}></Box>
          <div>
            <Typography style={styles.consultantName}>Consultant Name</Typography>
            <Typography style={styles.dealershipName}>Dealership Name</Typography>
          </div>
        </div>
      </div>

      {/* {chatRoomId ? <Consulting chatRoomId={chatRoomId} /> : null} */}

      <div style={styles.contentsContainer}>
        <Typography style={styles.subtitle}>{t('request_live_consult')}</Typography>
        <Box style={styles.vehicleModelBox}>
          <Lottie animationData={lottie_request} style={styles.lottieImage} loop={true} />
          <img src={vehicleModelInfo.modelImage} style={styles.modelImage} alt={'image_waiting_consult'} />
        </Box>

        {isRequestCancelled ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: color.grey_white }}>
            <ErrorOutlineIcon style={styles.warningIcon} />
            <Typography>{t('cancelled')}</Typography>
          </div>
        ) : (
          <div style={styles.progressBarBox}>
            <Box style={styles.remainingTimeCount}>
              <AccessTimeIcon style={styles.progressIcon} />
              <Typography>{t('remaining_time_is')}</Typography>
              <span>&nbsp;</span>
              <Typography style={styles.remainingTime}>
                {remainingSeconds} {t('seconds')}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" sx={styles.progressBar} value={(remainingSeconds / REQUEST_DURATION_IN_SECONDS) * 100} />
          </div>
        )}

        <Modal open={isModalOpened} onClose={setIsModalOpened}>
          <Box style={styles.modalContainer}>
            <Reservation confirmationResult={confirmationResult} handleClose={handleClose} />
          </Box>
        </Modal>
      </div>

      <div style={styles.footerWrapper}>
        {isRequestCancelled ? (
          <div>
            <div style={styles.buttonContainer}>
              <MainButton onClick={createLiveRequest} variant="contained" color="secondary" size="large">
                {t('request_again')}
              </MainButton>

              <MainButton
                onClick={() => {
                  setIsModalOpened(true);
                }}
                variant="contained"
                color="secondary"
                size="large"
              >
                {t('book_a_reservation')}
              </MainButton>
            </div>
          </div>
        ) : (
          <div style={styles.footerContainer}>
            <Typography style={styles.footerText}>{t('do_you_want_to_cancel_the_live_consult')}</Typography>
            <Button style={styles.textButton} onClick={updateLiveRequest}>
              {t('book_a_reservation')}
              <EastIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

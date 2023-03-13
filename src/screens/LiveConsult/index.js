import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Divider, IconButton, LinearProgress, Modal, Typography } from '@mui/material';
import Consulting from '@screens/0500_Consulting';
import ConsultTimeChecker from '@components/TimeChecker';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { color } from '@theme';
import image_empty_car from '@images/image_empty_car.png';
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
import bookingStore from '@store/booking.store';
import { encryptData } from '@utils';
import io, { Manager, Socket } from 'socket.io-client';
import { SOCKET_URI, SOCKET_NAMESPACE, WEBRTC_URI, WEBRTC_SLAVE_URI, WEBRTC_PORT, WEBRTC_ROOM_URI, WEBRTC_PATH, HLIVE_SERVER_URI } from '@constants';

const REQUEST_DURATION_IN_SECONDS = 60;
const ONE_SECOND = 1000;

export default function LiveConsult() {
  //                                                            VARIABLE
  const { requestResult, setRequestResult } = bookingStore();
  const _id = requestResult;
  const [confirmedInfo, setConfirmedInfo] = useState();
  const vehicleModelInfo = confirmedInfo?.requestData.data;
  const dealershipInfo = confirmedInfo?.dealership;
  const customerInfo = confirmedInfo?.requestUser;

  const [secondsInterval, setSecondsInterval] = useState();
  const [isWaiting, setIsWaiting] = useState(true);
  const [isRequestCancelled, setIsRequestCancelled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(REQUEST_DURATION_IN_SECONDS);
  const { t } = useTranslation();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isConsultVisible, setIsConsultVisible] = useState(false);

  const [socketInstance, setSocketInstance] = useState();
  const [socketLoaded, setSocketLoaded] = useState(false);

  //                                                              FUNCTIONS
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

  const getAllInfoById = async () => {
    try {
      const response = await axios.post('http://localhost:4000/viva/apis/hLiveCustomerWeb/getAllInfoById', {
        id: _id,
      });
      if (response) {
        setConfirmedInfo(response.data[0]);
        console.log('getAllInfo', confirmedInfo);
      }
    } catch (e) {
      console.error(e);
      alert('An error was occured. Please try again');
      return false;
    }
  };

  useEffect(() => {
    getAllInfoById();
  }, [requestResult]);

  const updateLiveRequest = async () => {
    const data = {
      requestId: _id,
      requestStatus: 'CANCELLED',
    };

    const user = {
      userId: customerInfo.userId,
      userType: customerInfo.userType,
      countryCode: customerInfo.countryCode,
    };
    const encryptedBody = await encryptData(data);

    try {
      const response = await axios.post(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/updateServiceRequest`, {
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
      },
      location: confirmedInfo.location,
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
      const response = await axios.post(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/createHLiveRequest`, {
        encryptedBody,
      });
      if (response) {
        setRequestResult(response.data.data.serviceRequest._id);
        console.log('new request --> ', requestResult);
        setRemainingSeconds(REQUEST_DURATION_IN_SECONDS);
        setIsRequestCancelled(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => setIsModalOpened(false);

  // SOCKET
  // const socketInitializer = async (_id) => {

  //   const manager = new Manager(SOCKET_URI, { transports: ['websocket'] });
  //   const socket = manager.socket(SOCKET_NAMESPACE);
  //   console.log('socket', socket);

  //   socket.on('connect', () => {
  //     console.log(`socket join, { roomId: ${_id}, sender: 'DEALER' }`);
  //     socket.emit('join', { roomId: _id, sender: 'DEALER' });
  //     console.log('socket joined');
  //     setSocketLoaded(true);
  //   });

  //   setSocketInstance(socket);
  //   return socket;
  // };

  // useEffect(() => {
  //   let socket;
  //   if (_id) {
  //     console.log('socket on');
  //     (async () => {
  //       if (_id) {
  //         socket = await socketInitializer(_id);
  //       }
  //     })();
  //   }
  //   return () => {
  //     console.log('socket off');
  //     if (socket) {
  //       socket.disconnect();
  //       setSocketLoaded(false);
  //     }
  //   };
  // }, [_id]);

  // useEffect(() => {
  //   const manager = new Manager(SOCKET_URI, { transports: ['websocket'] });
  //   const socket = manager.socket(SOCKET_NAMESPACE);
  //   console.log('🚀 effect: acceptListener');

  //   socket.on('accept', () => {
  //     socket.emit('join', {
  //       consultId: _id,
  //       sender: 'DEALER',
  //       receiver: 'CUSTOMER',
  //       chatRoomId: _id,
  //     });
  //   });

  //   setIsConsultVisible(true);
  //   console.log('accept listener set visible', isConsultVisible);

  //   return () => {
  //     console.log('socket off');
  //     if (socket) {
  //       socket.disconnect();
  //       setSocketLoaded(false);
  //     }
  //   };
  // }, [socketInstance, _id]);

  // Progress bar Animation
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
  }, []);

  // 60 seconds countdown
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
      updateLiveRequest();
    }
    // return () => {};
  }, [remainingSeconds]);

  //                                                             RENDER
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

      {/* {_id ? <Consulting chatRoomId={_id} confirmedInfo={confirmedInfo} /> : null} */}
      {/* {isConsultVisible && _id ? <Consulting chatRoomId={_id} confirmedInfo={confirmedInfo} /> : null} */}

      <div style={styles.contentsContainer}>
        <Typography style={styles.subtitle}>{t('request_live_consult')}</Typography>
        <Box style={styles.vehicleModelBox}>
          <Lottie animationData={lottie_request} style={styles.lottieImage} loop={true} />
          {vehicleModelInfo?.modelImage ? (
            <img src={vehicleModelInfo.modelImage} style={styles.modelImage} alt="vehicle_image" />
          ) : (
            <img src={image_empty_car} style={styles.emptyModelImage} alt="empty_vehicle_image" />
          )}
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
            <Reservation vehicleModelInfo={vehicleModelInfo} dealershipInfo={dealershipInfo} customerInfo={customerInfo} handleClose={handleClose} />
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

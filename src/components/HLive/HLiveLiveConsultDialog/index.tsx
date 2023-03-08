// ** React Imports
import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';

// ** MUI Imports
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

// ** Store & Actions Imports
// import { useDispatch, useSelector } from 'react-redux';
// import { sendMsg, selectChat } from 'src/store/apps/chat';

// ** Types
// import { RootState, AppDispatch } from 'src/store';
// import { StatusObjType, StatusType } from 'src/types/apps/chatTypes';

// ** Hooks
// import { useSettings } from 'src/@core/hooks/useSettings';

// ** Socket Imports
import io, { Socket } from 'socket.io-client';

// ** Utils Imports
// import { getInitials } from 'src/@core/utils/get-initials';
// import { formatDateToMonthShort } from 'src/@core/utils/format';
// import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
// import ThemeComponent from 'src/@core/theme/ThemeComponent';

// ** Chat App Components Imports
// import SidebarLeft from 'src/views/apps/chat/ChatList';
// import ChatContent from 'src/views/apps/callcenter/hLiveChat/ChatContent';
import {
  Avatar,
  Badge,
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  Icon,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  Send as SendIcon,
  CameraAlt as CameraIcon,
  NoPhotography as CameraOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  InfoOutlined as InfoIcon,
  ChatBubble as ChatBubbleIcon,
  ExitToApp as ExitIcon,
  CallEnd as CallEndIcon,
  ScreenShare as ScreenShareIcon,
  Close as CloseIcon,
  InfoOutlined,
} from '@mui/icons-material';
// import CustomAvatar from 'src/@core/components/mui/avatar';
// import ItemBox from 'src/components/ItemBox';
// import Requested from 'src/views/apps/user/Requested';
// import { serviceNameTemplate } from 'src/utils/messageTemplates';
import axios from 'axios';
import { SERVER_URI } from '@constants';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useRequestStore from '@store/zustand/request.store';
import useTokenStore from '@store/zustand/token.store';
import { encryptData } from '@store/apps/encrypt';

import useRtc from '@hooks/useRtc';

const HLiveLiveConsultDialog = ({ modalOpenYn, setModalOpenYn, chat }) => {
  console.log('--> HLiveLiveConsultDialog', chat);
  const [cardOpenedIndex, setCardOpenedIndex] = useState<number>(1);
  // const { requestDetail, setRequestDetail, requestAll, resetRequestDetail } = useRequestStore();

  const [requestDetail, setRequestDetail] = useState({
    _id: chat?._id,
    userInfo: {
      mobile: '123456789',
      firstName: 'RSA',
      lastName: 'Test',
      email: 'abcd@abcd.com',
      userPhoneNumber: '123456789',
      countryCode: 'PL',
      country: 'Poland',
      languageCode: 'en',
      language: 'English',
      street: 'street~~',
      houseNumber: 'houseNumber~~',
      postCode: 'postCode~',
      city: 'city~~',
      address: 'address~~~~~',
      userType: 'GUEST',
      comment: 'comments',
    },
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    country: 'PL',
    bookingDate: '',
    bookingTime: '',
    requestType: 'H_LIVE_REQUEST',
    requestStatus: 'REQUESTED',
    lastModifier: 'CUSTOMER',
    liveConsult: true,
    requestData: {
      type: 'hLive',
      data: {
        modelCode: 'GQ|*||B',
        modelName: 'i10',
        modelImage: 'https://www.hyundai.com/eu/dam/hpp/hway/hmpl/miniatury/i10%20N%20Line.png',
        buyingType: 'LEASE',
        minBudget: 250,
        maxBudget: 7000,
        usedCar: false,
      },
    },
    dealership: {
      dealershipCode: 'C24AC17556',
      dealershipLocation: {
        coordinates: [22.608603, 51.248079],
        type: 'Point',
      },
      dealershipName: 'Auto Broker',
      dealershipAddress: 'Mazowieckie Warszawa ul. Kransnobrodzka 5 03-214, Poland',
      dealershipTelephone: '+48 (81) 710 32 65',
      representativeEmail: 'salon.hyundaiautobroker@pl.com',
      representativeWeb: 'https://auto-broker.hyundai.pl/',
      businessHour: {
        monday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
        tuesday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
        wednesday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
        thursday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
        friday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
        saturday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
        sunday: {
          active: true,
          open: '09:00',
          close: '18:00',
          lunchStart: '12:00',
          lunchEnd: '13:00',
        },
      },
      holiday: [
        {
          startDate: '11/22/2022',
          endDate: '11/24/2022',
          note: '',
        },
        {
          startDate: '12/24/2022',
          endDate: '12/26/2022',
          note: '',
        },
      ],
    },
    dealer: {
      dealerCode: 'HMP0002',
      dealerName: 'dealer1',
      dealerProfile:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rocketpunch.com%2F%40k98051223&psig=AOvVaw1adAIgfkUze2GElIuU0xFG&ust=1666956079736000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDW1rmlgPsCFQAAAAAdAAAAABAE',
      dealerTelephone: '01054548484',
    },
    requestDateTime: '2023-03-05 07:57:59',
    callDateTime: '2023-03-05 07:57:59',
    callCondition: 'WAITING',
  });

  const [requesting, setRequesting] = useState<boolean>(false);

  // const router = useRouter();
  // const { userType } = router.query;

  // ** Hooks
  // const theme = useTheme();
  // const { settings } = useSettings();
  // const dispatch = useDispatch<AppDispatch>();
  // const hidden = useMediaQuery(theme.breakpoints.down('lg'));

  // const store = useSelector((state: RootState) => state.chat);
  const { token } = useTokenStore();

  // ** Vars
  // const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  // const mdAbove = useMediaQuery(theme.breakpoints.up('md'));
  // const { skin, appBar, footer, layout, navHidden } = settings;
  // const statusObj: StatusObjType = {
  //   busy: 'error',
  //   away: 'warning',
  //   online: 'success',
  //   offline: 'secondary',
  // };

  const {
    mediaStatus,
    connectStatus,
    stream,
    setCameraOnYn,
    setMicOnYn,
    onStop,
    onStart,
    leaveSocket,
    setScreenSharingYn,
    player,
    onRefresh,
    socketInstance,
  } = useRtc({
    chatRoomId: requestDetail?._id,
    dealerYn: 'customer',
  });
  const { cameraOnYn, micOnYn, screenSharingYn, customerMicOnYn, customerCameraOnYn } = mediaStatus;
  const {
    connecting,
    connected,
    finding,
    peerId,
    destination,
    customerLeftYn,
    leftYn,
    timeDiff,
    peerErrorMessage,
    streamCameraErrored,
    streamMicErrored,
    networkErrored,
  } = connectStatus;

  const { localStream, remoteStream } = stream;
  const { playerRef, remotePlayerRef } = player;
  const { t }: { t: (any) => string } = useTranslation();

  const [customerLeftModalShown, setCustomerLeftModalShown] = useState<boolean>(false);
  const [liveEndModalShown, setLiveEndModalShown] = useState<boolean>(false);

  useEffect(() => {
    if (modalOpenYn) onStart();
    else onStop();
    return () => {
      console.log('modal off');
      onStop();
    };
  }, [modalOpenYn]);

  const onChangeHandler = () => {};

  useEffect(() => {
    if (customerLeftYn) {
      // onCloseModal();
      setCustomerLeftModalShown(true);
    }
  }, [customerLeftYn]);

  const onCloseCustomerLeftModal = () => {
    setCustomerLeftModalShown(false);
    onCloseModal();
  };

  const onEndCall = async () => {
    setRequesting(true);
    // return await axios
    //   .post(
    //     SERVER_URI + '/chat/addChat',
    //     {
    //       requestId: requestDetail._id,
    //       writer: 'DEALER',
    //       template: '',
    //       messageContents: 'Live call has been started',
    //       messageType: 'LIVE_CALL_END',
    //     },
    //     {
    //       headers: {
    //         Authorization: 'Bearer ' + token,
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     // response.data
    //     socketInstance.emit('chat', {
    //       roomId: requestDetail._id,
    //       sender: 'DEALER',
    //       msg: response.data.data,
    //       messageType: 'LIVE_CALL_END',
    //     });
    //     onCloseModal();
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     // todo: 빈값 전송 처리 //
    //     if (error.status === 400) {
    //     }
    //     // todo: 잘못된 아이디 혹은 비밀번호 처리 //
    //     if (error.status === 403) {
    //     }
    //   })
    //   .finally(() => {
    //     setRequesting(false);
    //   });
  };

  const onCloseModal = async () => {
    setRequesting(true);
    leaveSocket();
    console.log(`token: ${token}`);

    const data = {
      requestId: requestDetail._id,
      requestStatus: 'COMPLETED',
      // requestStatus: 'CANCELLED',
    };

    const encryptedBody = await encryptData(data);

    axios
      .post(
        SERVER_URI + '/serviceRequest/updateServiceRequest',
        {
          encryptedBody,
        },
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then((response) => {
        console.log(response.data.data);
        setRequestDetail(null);
        onStop();
        setModalOpenYn(false);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setRequesting(false);
      });
  };

  const timeDiffFormat = (value) => {
    let h = moment.duration(value, 'second').hours();
    let m = moment.duration(value, 'second').minutes();
    let s = moment.duration(value, 'second').seconds();
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  };

  if (!modalOpenYn) return null;
  if (!requestDetail) return null;

  return (
    <>
      {/* <ThemeComponent settings={{ ...settings, mode: 'dark' }}> */}
      <Dialog fullScreen open={modalOpenYn}>
        <Stack
          sx={{
            height: '100vh',
            width: '100vw',
            justifyContent: 'stretch',
          }}
        >
          {/* 닫기버튼 */}

          <Box bgcolor="#000" display={'flex'} justifyContent="flex-end">
            <Button size={'small'} variant="contained" color="error" onClick={onCloseModal} sx={{ borderRadius: 0 }}>
              <CloseIcon />
            </Button>
          </Box>

          {/* 메인 콘텐트 영역 */}
          <Box flex={1} position={'relative'} overflow={'hidden'} display={'flex'} alignItems="stretch">
            <Grid container spacing={1} alignItems="stretch">
              {/* left */}
              <Grid item xs flex={1} display={'flex'}>
                <Stack flex={1}>
                  <Box display={'flex'} p={5} flexWrap="wrap">
                    <Grid container gap={3}>
                      {/* <CustomAvatar
                        src={chat.requestUser?.userProfilePic}
                        alt={chat.requestUser?.firstName}
                        sx={{
                          width: 40,
                          height: 40,
                          fontSize: '1rem',
                        }}
                      /> */}
                      <Box>
                        <Typography variant="body1" color={'text.secondary'}>
                          {chat.requestUser?.firstName} {chat.requestUser?.lastName}
                        </Typography>
                        <Typography variant="body2" color={'text.disabled'}>
                          {t('common.' + chat.requestType)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Typography></Typography>
                  </Box>

                  <Stack alignItems={'flex-start'} justifyContent="flex-start" p={5} position="relative" sx={{ width: '100%', height: '100%' }}>
                    <Box
                      display={'flex'}
                      bgcolor={'black'}
                      borderRadius={2}
                      overflow="hidden"
                      alignSelf={'stretch'}
                      width={'100%'}
                      position="relative"
                      flex={1}
                      sx={{
                        isolation: 'isolate',
                      }}
                    >
                      {remoteStream ? (
                        <video
                          ref={remotePlayerRef}
                          autoPlay
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                          }}
                        ></video>
                      ) : (
                        <Box
                          flex={1}
                          display={'flex'}
                          textAlign={'center'}
                          alignItems="center"
                          justifyContent={'center'}
                          flexDirection={'column'}
                          style={{ width: '100%', height: '100%' }}
                        >
                          <Typography>{t('common.loading')}</Typography>
                          <Typography variant="body2" maxWidth={600} my={1} sx={{ opacity: 0.9 }}>
                            * {t('c_live_consult.loading_warning_text')}
                          </Typography>
                        </Box>
                      )}
                      {remoteStream && !customerCameraOnYn && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          display="flex"
                          flexDirection="column"
                          width="100%"
                          height="100%"
                          borderRadius={5}
                          alignItems="center"
                          justifyContent={'center'}
                          sx={{
                            backgroundColor: 'black',
                          }}
                        >
                          <CameraOffIcon sx={{ width: 100, color: 'rgba(255, 255, 255, 0.4)' }}></CameraOffIcon>
                          <Typography variant="body1">{t('c_live_consult.camera_off')}</Typography>
                        </Box>
                      )}
                      {remoteStream && !customerMicOnYn && (
                        <Box
                          position="absolute"
                          bottom={16}
                          left={16}
                          display="flex"
                          py={2}
                          px={4}
                          borderRadius={5}
                          sx={{
                            backgroundColor: 'rgba(28, 27, 27, 0.4)',
                          }}
                        >
                          <MicOffIcon></MicOffIcon>
                          <Typography variant="body1">{t('c_live_consult.mic_off')}</Typography>
                        </Box>
                      )}
                      {(streamMicErrored && customerMicOnYn) ||
                        (streamCameraErrored && customerCameraOnYn && (
                          <Box position="absolute" bottom={0} left={0} py={4} px={4} width="100%">
                            <Box borderRadius={5} display="flex" py={1} px={4} bgcolor="error.main" alignItems="center" justifyContent="center">
                              <InfoOutlined sx={{ mr: 2, fontSize: 20 }}></InfoOutlined>
                              <Typography variant="body1" fontSize={14}>
                                Bad network connection
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                    <Box
                      sx={{
                        mt: 5,
                        width: 230,
                        height: 130,
                        isolation: 'isolate',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        p: 2,
                      }}
                      borderRadius={1}
                      bgcolor={'black'}
                    >
                      {localStream ? (
                        <video ref={playerRef} autoPlay muted style={{ width: '100%', height: '100%' }}></video>
                      ) : (
                        <Box
                          flex={1}
                          display={'flex'}
                          textAlign={'center'}
                          alignItems="center"
                          justifyContent={'center'}
                          style={{ width: '100%', height: '100%' }}
                        >
                          <Typography>{t('common.loading')}...</Typography>
                        </Box>
                      )}
                      {localStream && !cameraOnYn && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          display="flex"
                          flexDirection="column"
                          width="100%"
                          height="100%"
                          borderRadius={5}
                          alignItems="center"
                          justifyContent={'center'}
                          sx={{
                            backgroundColor: 'black',
                          }}
                        >
                          <CameraOffIcon sx={{ width: 40, color: 'rgba(255, 255, 255, 0.4)' }}></CameraOffIcon>
                        </Box>
                      )}
                      {localStream && !micOnYn && (
                        <Box
                          position="absolute"
                          bottom={8}
                          left={8}
                          display="flex"
                          py={2}
                          px={4}
                          borderRadius={5}
                          sx={{
                            backgroundColor: 'rgba(28, 27, 27, 0.4)',
                          }}
                        >
                          <MicOffIcon></MicOffIcon>
                          <Typography variant="body1">{t('c_live_consult.mic_off')}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </Grid>

              {/* right */}
              <Grid item sx={{ width: 430 }} display="flex">
                <Stack p={5} flex={1} width={'100%'} alignItems="stretch">
                  {/* <ThemeComponent settings={{ ...settings, mode: 'light' }}> */}
                  {cardOpenedIndex == 2 ? (
                    <Card sx={{ height: '100%', width: '100%' }}>
                      <CardHeader titleTypographyProps={{ variant: 'h3' }} title={'Switch to mobile device'}></CardHeader>
                      <Divider sx={{ m: 0 }}></Divider>
                      <CardContent sx={{ height: '100%', width: '100%' }}>
                        <Box
                          alignSelf={'stretch'}
                          justifySelf="stretch"
                          display={'flex'}
                          alignItems="center"
                          textAlign={'center'}
                          justifyContent="center"
                          flex={1}
                          height="100%"
                        >
                          <Box display={'flex'} flexDirection="column" alignItems={'center'}>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mb: 5 }}>
                              {`Scan the QR code\nto switch to your mobile device.`}
                            </Typography>
                            <Box bgcolor={'black'} width={178} height={178}></Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ) : cardOpenedIndex == 0 ? (
                    <Card sx={{ height: '100%', width: '100%' }}>
                      <CardHeader titleTypographyProps={{ variant: 'h3' }} title={t('c_live_consult.requested_information')}></CardHeader>
                      <Divider sx={{ m: 0 }}></Divider>
                      {/* <CardContent>
                        <Requested serviceRequest={chat} setServiceRequest={selectChat}></Requested>
                      </CardContent> */}
                    </Card>
                  ) : (
                    <Card
                      sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'background.default',
                        flexWrap: 'wrap',
                      }}
                    >
                      <CardHeader titleTypographyProps={{ variant: 'h3' }} title={t('c_live_consult.chat')}></CardHeader>
                      <Divider sx={{ m: 0 }}></Divider>
                      <CardContent
                        sx={{
                          p: 0,
                          display: 'flex',
                          flex: 1,
                          flexWrap: 'wrap',
                          '&:last-of-type': { paddingBottom: 0 },
                          '&.MuiGrid-root': {
                            width: '100%',
                          },
                        }}
                      >
                        {/* <ChatContent
                          // store={store}
                          chat={requestDetail}
                          setChat={setRequestDetail}
                          hidden={hidden}
                          sendMsg={sendMsg}
                          mdAbove={mdAbove}
                          dispatch={dispatch}
                          statusObj={statusObj}
                          getInitials={getInitials}
                          userProfileRightOpen={true}
                          toggleLiveModal={setModalOpenYn}
                          canTransferDealer={false}
                        /> */}
                      </CardContent>
                    </Card>
                  )}
                  {/* </ThemeComponent> */}
                </Stack>
              </Grid>
            </Grid>
          </Box>
          {/* 하단 액션바 영역 */}
          <Box height={80}>
            <Grid container justifyContent={'space-between'}>
              <Grid item minWidth={100}>
                <Box p={5}>
                  <Chip
                    color="error"
                    label={
                      <Typography color={'white'} variant="body2" sx={{ fontSize: 16 }}>
                        {connected ? 'LIVE ' + timeDiffFormat(timeDiff) : t('common.loading')}
                      </Typography>
                    }
                  ></Chip>
                  {/* <Box>
                  <Typography></Typography>
                  <Typography>[local] your id: {peerId}</Typography>
                  <Typography>[remote] destination id: {destination}</Typography>
                </Box> */}
                </Box>
              </Grid>

              <Grid item>
                <Box p={5}>
                  <Grid container gap={5}>
                    <Button
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                      onClick={() => onStop()}
                    >
                      stop
                    </Button>
                    <Button
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                      onClick={() => onStart()}
                    >
                      start
                    </Button>
                    <Button
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                      onClick={() => setCameraOnYn(!cameraOnYn)}
                    >
                      {cameraOnYn ? <CameraIcon /> : <CameraOffIcon />}
                    </Button>

                    <Button
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                      onClick={() => setMicOnYn(!micOnYn)}
                    >
                      {micOnYn ? <MicIcon /> : <MicOffIcon />}
                    </Button>
                    <Button
                      onClick={() => setScreenSharingYn(!screenSharingYn)}
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                    >
                      <ScreenShareIcon color={screenSharingYn ? 'secondary' : 'inherit'} />
                    </Button>
                    <Button
                      onClick={() => setLiveEndModalShown(true)}
                      className="action-btn"
                      // color="error"
                      // variant="circle"
                    >
                      <CallEndIcon />
                    </Button>
                    {/* <Button
                        onClick={onRefresh}
                        className="action-btn"
                        color="info"
                        variant="circle"
                      >
                        <CallEndIcon />
                      </Button> */}
                  </Grid>
                </Box>
              </Grid>

              <Grid item>
                <Box p={5}>
                  <Grid container gap={5}>
                    <Button
                      onClick={() => setCardOpenedIndex(0)}
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                    >
                      <InfoIcon color={cardOpenedIndex == 0 ? 'secondary' : 'inherit'} />
                    </Button>
                    <Button
                      onClick={() => setCardOpenedIndex(1)}
                      className="action-btn"
                      // color="black"
                      // variant="circle"
                    >
                      <ChatBubbleIcon color={cardOpenedIndex == 1 ? 'secondary' : 'inherit'} />
                    </Button>
                    {/* <Button
                    onClick={() => setCardOpenedIndex(2)}
                    className="action-btn"
                    color="black"
                    variant="circle"
                  >
                    <ExitIcon color={cardOpenedIndex == 2 ? 'secondary' : 'inherit'} />
                  </Button> */}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Dialog>

      <Dialog fullScreen={false} open={requesting} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box p={2} textAlign="center">
          <CircularProgress color="secondary"></CircularProgress>
          <Typography variant={'body1'} mt={2}>
            {t('common.saving')}
          </Typography>
        </Box>
      </Dialog>
      {/** 번역 필요~!~! */}
      {/* </ThemeComponent> */}
      <Dialog open={customerLeftModalShown} disableEscapeKeyDown onClose={onCloseCustomerLeftModal}>
        <DialogTitle>{t('c_live_consult.consult_ended_modal_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('c_live_consult.consult_ended_modal_body')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseCustomerLeftModal} autoFocus>
            {t('button.end_call')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={networkErrored}
        disableEscapeKeyDown
        // onClose={onCloseCustomerLeftModal}
      >
        <DialogTitle>{t('c_live_consult.network_error_modal_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{connecting ? t('c_live_consult.connecting') : t('c_live_consult.network_error_modal_body')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal}>{t('button.end_call')}</Button>
          <Button onClick={onRefresh}> {t('button.try_again')}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={liveEndModalShown} disableEscapeKeyDown onClose={() => setLiveEndModalShown(false)}>
        <DialogTitle>{t('c_live_consult.consult_end_modal_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('c_live_consult.consult_end_modal_body')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={requesting || !socketInstance} color="info" onClick={onEndCall}>
            {t('button.end_call')}
          </Button>
          <Button onClick={() => setLiveEndModalShown(false)}>{t('button.stay_on_call')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HLiveLiveConsultDialog;

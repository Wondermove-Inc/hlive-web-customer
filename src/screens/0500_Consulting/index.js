import { useState } from 'react';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import LiveConsultChat from '@components/Chatting';
import { styles } from './styles';
import HLiveLiveConsultDialog from '@components/HLive/HLiveLiveConsultDialog';
import useRequestStore from '@store/zustand/request.store';

export default function Consulting({ chatRoomId }) {
  console.log('--> consulting comp', chatRoomId);
  const [HLiveliveModalVisible, setHLiveLiveModalVisible] = useState(true);
  console.log('consulting screen', HLiveliveModalVisible);
  // const { requestDetail, setRequestDetail, requestAll, resetRequestDetail } = useRequestStore();

  const [requestDetail, setRequestDetail] = useState({
    _id: chatRoomId,
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

  return (
    <>
      <div style={styles.container}>
        <Box style={styles.screenContainer}>
          {/* <Typography>Connecting video...</Typography> */}

          <HLiveLiveConsultDialog
            modalOpenYn={HLiveliveModalVisible}
            setModalOpenYn={setHLiveLiveModalVisible}
            chat={requestDetail}
          ></HLiveLiveConsultDialog>
        </Box>

        {/* <Box>
          <LiveConsultChat />
        </Box> */}
      </div>
    </>
  );
}

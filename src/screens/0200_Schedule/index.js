import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { fonts } from '@theme';
import Subtitle from '@components/Subtitle';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { MainButton } from '@components/Button';
import bookingStore from '@store/zustand/booking.store';
import TimePicker from '@components/TimePicker';
import DatePicker from '@components/DatePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './styles.css';
// import { HLIVE_SERVER_URI } from '@constants';

export default function Schedule(props) {
  const { currentStep, setCurrentStep, setIsLiveConsult } = props;
  const { selectedBookingDate, selectedBookingTime, setSelectedBookingDate, setSelectedBookingTime } = bookingStore();

  console.log(selectedBookingDate);

  const [selectedDealerInfo, setSelectedDealerInfo] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getReservationInfoByDealer = async () => {
    try {
      // const response = await axios.get(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/getReservationInfoByDealer`, {
      //   params: { dealerCode: 'HMP0002' },
      // });
      const response = await axios.get('http://localhost:4000/viva/apis/hLiveCustomerWeb/getReservationInfoByDealer', {
        params: { dealerCode: 'HMP0002' },
      });
      const result = response.data;
      setSelectedDealerInfo(result);
      // console.log(selectedDealerInfo);
    } catch (e) {
      console.error(e);
      alert('An error was occured. Please try again');
      return false;
    }
  };

  useEffect(() => {
    getReservationInfoByDealer();
  }, []);

  const handleTimeClick = (timeInfo) => {
    setSelectedBookingTime(timeInfo);
  };

  const handleRequestClick = () => {
    setIsLiveConsult(false);
    // navigate('/personalinfo');
    setCurrentStep(currentStep + 1);
  };

  const handleLiveConsultClick = () => {
    setIsLiveConsult(true);
    // navigate('/personalinfo');
    setCurrentStep(currentStep + 1);
  };

  const handleDateClick = (dateInfo) => {
    console.log(dateInfo);
    setSelectedBookingDate(dateInfo);
  };

  return (
    <>
      <Subtitle title={t('select_date_and_time')} />
      <div style={styles.requestBanner}>
        <Typography style={fonts.h3_head_m}>{t('do_you_want_to_join_h_live_now')}</Typography>
        <Box style={styles.textButtonBox}>
          <TrendingFlatIcon />
          <Button onClick={handleLiveConsultClick} sx={styles.textButton}>
            {t('real_time_live_consult')}
          </Button>
        </Box>
      </div>

      <div style={styles.contentsContainer}>
        <div style={styles.calendarBox}>
          <Calendar
            locale="en"
            value={selectedBookingDate ? selectedBookingDate : new Date()}
            onChange={handleDateClick}
            className="react-calender"
            tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
          />
        </div>

        <div style={styles.timeSelectBox}>
          <Box style={styles.timeSelectTitle}>
            <Typography style={fonts.h3_head_m}>{t('select_time')}</Typography>
          </Box>
          <TimePicker selectedBookingTime={selectedBookingTime} handleTimeClick={(event) => handleTimeClick(event.target.value)} />
        </div>
      </div>

      <div style={styles.buttonWrapper}>
        <MainButton
          disabled={!(selectedBookingDate && selectedBookingTime)}
          onClick={handleRequestClick}
          variant="contained"
          color="primary"
          size="large"
        >
          <Typography>{t('next')}</Typography>
        </MainButton>
      </div>
    </>
  );
}

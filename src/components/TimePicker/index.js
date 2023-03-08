import { useEffect, useState } from 'react';
import { ToggleButtonGroup } from '@mui/material';
import { TimeToggleButton, styles } from './styles';
import moment from 'moment';

export default function TimePicker({ selectedBookingTime, handleTimeClick }) {
  const [availableTime, setAvailableTime] = useState([]);

  const createAvailableTimeArray = () => {
    const openHour = moment('09:00', 'HH:mm');
    const closeHour = moment('18:00', 'HH:mm');
    const duration = moment.duration(closeHour.diff(openHour));
    const diff = duration.hours();
    const timeOptionArray = [];

    for (let i = 0; diff >= i; i++) {
      let result = moment(openHour).add(i, 'hours').format('HH:mm');
      timeOptionArray.push(result);
    }
    setAvailableTime(timeOptionArray);
  };

  useEffect(() => {
    createAvailableTimeArray();
  }, []);

  return (
    <>
      <div style={styles.selectTimeBox}>
        <ToggleButtonGroup exclusive value={selectedBookingTime} style={styles.timeButtonWrapper}>
          {availableTime?.map((timeOption, index) => {
            const disabled = false;
            return (
              <TimeToggleButton onClick={handleTimeClick} value={timeOption} disabled={disabled} key={index}>
                {timeOption}
              </TimeToggleButton>
            );
          })}
        </ToggleButtonGroup>

        {/* <div style={styles.timeInfoWrapper}>
          <div style={styles.timeInfoBox}>
            <div style={styles.recommededTimeIcon}></div>
            <Typography style={fonts.b1_text_r}>{t('recommended_time')}</Typography>
          </div>
          <div style={styles.timeInfoBox}>
            <div style={styles.alternativeTimeIcon}></div>
            <Typography style={fonts.b1_text_r}>{t('other_times_available')}</Typography>
          </div>
        </div> */}
      </div>
    </>
  );
}

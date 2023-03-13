import { useEffect, useState } from 'react';
import { ToggleButtonGroup } from '@mui/material';
import { TimeToggleButton, styles } from './styles';

export default function TimePicker({ selectedDealerSchedule, selectedBookingTime, handleTimeClick }) {
  return (
    <>
      <div style={styles.selectTimeBox}>
        <ToggleButtonGroup exclusive value={selectedBookingTime} style={styles.timeButtonWrapper}>
          {selectedDealerSchedule?.map((timeOption, index) => {
            return (
              <TimeToggleButton onClick={handleTimeClick} value={timeOption} disabled={!timeOption.isAble} key={index}>
                {timeOption.time}
              </TimeToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
    </>
  );
}

import bookingStore from '@store/booking.store';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

export default function DatePicker() {
  const { setSelectedBookingDate } = bookingStore();
  const handleDateClick = (dateInfo) => {
    const newDateFormat = new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
    const newMomentDate = moment(dateInfo, 'YYYY-MM-DD');
    const convertedDate = dateInfo.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setSelectedBookingDate(convertedDate);
  };

  return <Calendar locale="en" onChange={handleDateClick} className="react-calender" tileDisabled={({ date }) => [0, 6].includes(date.getDay())} />;
}

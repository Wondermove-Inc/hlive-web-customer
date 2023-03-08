import { Routes, Route } from 'react-router-dom';
import Booking from '@screens/Booking';
import LiveConsult from '@screens/LiveConsult';
import VehicleModel from '@screens/0000_VehicleModel';
import Dealership from '@screens/0100_Dealership';
import Schedule from '@screens/0200_Schedule';
import PersonalInfo from '@screens/0300_PersonalInfo';
import Confirmation from '@screens/0430_Confirmation';
import Consulting from '@screens/0500_Consulting';

function App() {
  return (
    <Routes>
      <Route path={'/*'} element={<Booking />} />
      <Route path={'/live/*'} element={<LiveConsult />} />
    </Routes>
  );
}

export default App;

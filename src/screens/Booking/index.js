import { useState, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Step, Stepper, StepButton, Box, Button, Typography, StepLabel } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTranslation } from 'react-i18next';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Banner from '@components/Banner';
import VehicleModel from '@screens/0000_VehicleModel';
import Dealership from '@screens/0100_Dealership';
import Schedule from '@screens/0200_Schedule';
import PersonalInfo from '@screens/0300_PersonalInfo';
import Confirmation from '@screens/0430_Confirmation';
import { styles } from './styles';
import { fonts } from '@theme';
import bookingStore from '@store/booking.store';
import moment from 'moment';

export default function Booking() {
  //                                                             VARIABLE
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const { selectedVehicleInfo, selectedDealershipInfo, selectedBookingDate, selectedBookingTime } = bookingStore();
  const steps = [t('model'), t('dealership'), t('schedule'), t('personalinfo')];
  const [completed, setCompleted] = useState({});
  const [isLiveConsult, setIsLiveConsult] = useState(false);
  const convertedBookingDate = moment(selectedBookingDate).format('MMM.DD.YYYY');

  //                                                              FUNCTIONS
  const handleStep = (step) => () => {
    setCurrentStep(step);
  };

  const StepScreens = (props) => {
    switch (props.currentStep) {
      case 0:
        return <VehicleModel {...props} />;
      case 1:
        return <Dealership {...props} />;
      case 2:
        return <Schedule {...props} />;
      case 3:
        return <PersonalInfo {...props} />;
      case 4:
        return <Confirmation {...props} />;
      default:
        return <VehicleModel {...props} />;
    }
  };

  //                                                             RENDER
  return (
    <>
      <Header />
      {currentStep === steps.length ? null : (
        <>
          <Banner>
            <Typography style={fonts.h1}>{t('h_live')}</Typography>
            <Typography style={fonts.b1}>{t('service_introduction_catchphrase_etc')}</Typography>
          </Banner>

          <div style={styles.stepperWrapper}>
            <div style={styles.stepperBox}>
              <Stepper nonLinear activeStep={currentStep} connector={<KeyboardArrowRightIcon style={styles.stepConnector} />}>
                <Step completed={completed[0]} sx={styles.step}>
                  <StepButton style={styles.stepButton} onClick={handleStep(0)}>
                    {selectedVehicleInfo.modelId ? (
                      <Box style={styles.stepLabelBox}>
                        <Typography>{t('model')}</Typography>
                        {selectedVehicleInfo.modelDescription}
                      </Box>
                    ) : (
                      `${t('model')}`
                    )}
                  </StepButton>
                </Step>
                <Step completed={completed[1]} sx={styles.step}>
                  <StepButton style={styles.stepButton} onClick={handleStep(1)}>
                    {selectedDealershipInfo._id ? (
                      <Box style={styles.stepLabelBox}>
                        <Typography>{t('dealership')} </Typography>
                        {selectedDealershipInfo.name}
                      </Box>
                    ) : (
                      `${t('dealership')}`
                    )}
                  </StepButton>
                </Step>
                <Step completed={completed[2]} sx={styles.step}>
                  <StepButton style={styles.stepButton} onClick={handleStep(2)}>
                    {convertedBookingDate && selectedBookingTime ? (
                      <Box style={styles.stepLabelBox}>
                        <Typography>{t('schedule')}</Typography>
                        {convertedBookingDate} {selectedBookingTime}
                      </Box>
                    ) : (
                      `${t('schedule')}`
                    )}
                  </StepButton>
                </Step>
                <Step completed={completed[3]} sx={styles.step}>
                  <StepButton style={styles.stepButton} onClick={handleStep(3)}>
                    {t('personal_info')}
                  </StepButton>
                </Step>
              </Stepper>
            </div>
          </div>
        </>
      )}

      {currentStep === steps.length ? (
        <Confirmation />
      ) : (
        <div style={styles.stepScreenWrapper}>
          <div style={styles.MainContainer}>
            <StepScreens
              handleStep={handleStep}
              completed={completed}
              setCompleted={setCompleted}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isLiveConsult={isLiveConsult}
              setIsLiveConsult={setIsLiveConsult}
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

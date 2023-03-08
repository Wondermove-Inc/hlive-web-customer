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
import { color, fonts } from '@theme';
import bookingStore from '@store/zustand/booking.store';

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const { selectedVehicleInfo, selectedDealershipInfo, selectedBookingDate, selectedBookingTime } = bookingStore();
  const steps = [t('model'), t('dealership'), t('schedule'), t('personalinfo')];
  const [completed, setCompleted] = useState({});
  const [isLiveConsult, setIsLiveConsult] = useState(false);

  const handleStep = (step) => () => {
    const newCompleted = completed;
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
    setCurrentStep(step);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return currentStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
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
                    <StepLabel sx={styles.stepLabel}>
                      {/* {t('model')} */}
                      {selectedVehicleInfo.modelId ? `${t('model')} ${selectedVehicleInfo.modelDescription}` : <Typography>{t('model')}</Typography>}
                    </StepLabel>
                  </StepButton>
                </Step>
                <Step completed={completed[1]} sx={styles.step}>
                  <StepButton style={styles.stepButton} onClick={handleStep(1)}>
                    {selectedDealershipInfo._id ? (
                      <Typography style={{ color: color.primary_blue }}>{selectedDealershipInfo.name}</Typography>
                    ) : (
                      `${t('dealership')}`
                    )}
                  </StepButton>
                </Step>
                <Step completed={completed[2]} sx={styles.step}>
                  <StepButton style={styles.stepButton} onClick={handleStep(2)}>
                    {selectedBookingDate && selectedBookingTime ? `${selectedBookingDate} ${selectedBookingTime}` : `${t('schedule')}`}
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

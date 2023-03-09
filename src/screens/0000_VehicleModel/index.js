import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Subtitle from '@components/Subtitle';
import { fonts } from '@theme';
import { styles } from './styles';
import { Button, Box, Typography } from '@mui/material';
import bookingStore from '@store/zustand/booking.store';
import { Link, useNavigate } from 'react-router-dom';
import { HLIVE_SERVER_URI } from '@constants';

export default function VehicleModel(props) {
  const { currentStep, setCurrentStep, handleStep, completed, setCompleted } = props;
  const { setSelectedVehicleInfo } = bookingStore();

  const carType = ['Hatchback', 'SUV', 'Fastback', 'Sedan', 'Wagon'];
  const [hppVehicles, setHppVehicles] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getVehicleModels = async () => {
    try {
      // PL, SK, NO, CZ
      // const response = await axios.get(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/getVehicleModels`, { params: { country: 'PL' } });
      const response = await axios.get('http://localhost:4000/viva/apis/hLiveCustomerWeb/getVehicleModels', { params: { country: 'PL' } });
      if (response) {
        console.log('status', response.status);
        const result = response.data[0].hppModels;
        setHppVehicles(result);
      }
    } catch (e) {
      console.error(e);
      alert('An error was occured. Please try again');
      return false;
    }
  };

  useEffect(() => {
    getVehicleModels();
  }, []);

  const handleClick = (modelInfo) => {
    setSelectedVehicleInfo(modelInfo);
    const newCompleted = completed;
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
    setCurrentStep(currentStep + 1);
  };

  const vehicleCategory = carType.map((typeName) => {
    return hppVehicles.filter((item) => item.carType1Desc === typeName);
  });
  const allVehicles = Object.fromEntries(carType.map((_, i) => [carType[i], vehicleCategory[i]]));

  return (
    <>
      <Subtitle title={t('select_a_model')} />

      <div>
        {allVehicles &&
          Object.entries(allVehicles).map((item, index) => {
            const vehicleType = Object.values(item);
            const vehicleTypeName = vehicleType[0];
            const vehicleTypeModels = vehicleType[1];
            return (
              <div style={styles.categoryGridContainer} key={index}>
                <Typography style={styles.categoryName}>{vehicleTypeName}</Typography>

                <div style={styles.modelGridContainer}>
                  {vehicleTypeModels.map((model) => {
                    return (
                      <Button onClick={() => handleClick(model)} disableRipple style={styles.modelBox} key={model.modelId}>
                        <Box sx={styles.modelButton}>
                          <img src={model.image} style={styles.modelImage} alt="model_image" />
                        </Box>
                        <Typography style={fonts.s1}>{model.modelDescription}</Typography>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

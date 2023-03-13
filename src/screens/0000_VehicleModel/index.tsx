import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Subtitle from '@components/Subtitle';
import { fonts } from '@theme';
import { styles } from './styles';
import { Button, Box, Typography } from '@mui/material';
import bookingStore from '@store/booking.store';
import { Link, useNavigate } from 'react-router-dom';
import { HLIVE_SERVER_URI } from '@constants';

export default function VehicleModel(props) {
  //                                                             VARIABLE
  const { currentStep, setCurrentStep, completed, setCompleted } = props;
  const { setSelectedVehicleInfo } = bookingStore();
  const [hppVehicles, setHppVehicles] = useState<Array<any>>([]);
  // const [modelTypeArray, setModelTypeArray] = useState<Array<string>>([]);
  // const [vehicleGroupsByType, setVehicleGroupsByType] = useState<Array<string>>([]);

  const [allVehicles, setAllvehicles] = useState<any>();

  const { t } = useTranslation();
  const navigate = useNavigate();

  //                                                              FUNCTIONS
  const getHppVehicleModels = async () => {
    try {
      // PL, SK, NO, CZ
      const response = await axios.get(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/getVehicleModels`, { params: { country: 'PL' } });
      if (response) {
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
    getHppVehicleModels();
  }, []);

  useEffect(() => {
    const vehicleTypeArray = hppVehicles.map((item) => {
      return item.carType1Desc;
    });

    vehicleTypeArray.filter((item, index) => {
      return vehicleTypeArray.indexOf(item) === index;
    });

    const vehicleGroupByTypes = vehicleTypeArray.map((typeName) => {
      return hppVehicles.filter((item) => item.carType1Desc === typeName);
    });

    const vehicleObject = Object.fromEntries(vehicleTypeArray.map((_, i) => [vehicleTypeArray[i], vehicleGroupByTypes[i]]));
    setAllvehicles(vehicleObject);
  }, [hppVehicles]);

  const handleClick = (modelInfo) => {
    setSelectedVehicleInfo(modelInfo);
    const newCompleted = completed;
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
    setCurrentStep(currentStep + 1);
  };

  //                                                             RENDER
  return (
    <div>
      <Subtitle title={t('select_a_model')} />
      <div>
        {allVehicles &&
          Object.entries(allVehicles).map((item, index) => {
            const vehicleType = Object.values(item);
            const vehicleTypeName: any = vehicleType[0];
            const vehicleGroups: any = vehicleType[1];

            return (
              <div style={styles.categoryGridContainer} key={index}>
                <Typography style={styles.categoryName}>{vehicleTypeName}</Typography>

                <div style={styles.modelGridContainer}>
                  {vehicleGroups?.map((model: any) => {
                    return (
                      <Button onClick={() => handleClick(model)} sx={styles.modelBox} disableRipple key={model.modelId}>
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
    </div>
  );
}

import { useState, useEffect, useRef, useMemo } from 'react';
import { styles } from './styles';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { DealershipMap } from '@components/Map';
import { Box, Button, IconButton, Checkbox, TextField, InputAdornment, Typography } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TuneIcon from '@mui/icons-material/Tune';
import { fonts, color } from '@theme';
import Subtitle from '@components/Subtitle';
import DealershipInfoModal from '@components/DealershipInfoModal';
import bookingStore from '@store/booking.store';
import { useNavigate } from 'react-router-dom';
import { HLIVE_SERVER_URI } from '@constants';

export default function Dealership(props) {
  //                                                            VARIABLE
  const { currentStep, setCurrentStep, completed, setCompleted } = props;
  const { setSelectedDealershipInfo } = bookingStore();

  const [dealershipList, setDealershipList] = useState([]);
  const [filterOpened, setFilterOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalDealershipInfo, setModalDealershipInfo] = useState();

  const hMapRef = useRef(null);
  const scrollRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  //                                                              FUNCTIONS
  const getDealershipByCountry = async () => {
    try {
      const response = await axios.get(`${HLIVE_SERVER_URI}/hLiveCustomerWeb/getDealershipByCountry`, {
        params: { country: 'PL' },
      });
      const result = response.data;
      setDealershipList(result);
    } catch (e) {
      console.error(e);
      alert('An error was occured. Please try again');
      return false;
    }
  };

  useEffect(() => {
    getDealershipByCountry();
  }, []);

  console.log('dealership', dealershipList);

  // useEffect(() => {
  //   scrollRef?.current?.scrollTo(0, scrollRef.current.scrollHeight);
  // }, [dealershipList]);

  const handleModalOpen = (dealershipInfo) => {
    setModalDealershipInfo(dealershipInfo);
    setModalOpened(true);
    hMapRef.current.setCenter({ lat: dealershipInfo?.position.coordinates[1], lng: dealershipInfo?.position.coordinates[0] });
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleFilter = () => {
    setFilterOpened(!filterOpened);
  };

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const label = { InputProps: { 'aria-label': 'Checkbox Nofitication' } };

  const searchDealershipList = useMemo(
    () =>
      dealershipList?.filter((item) => {
        if (searchKeyword != null && searchKeyword !== '') {
          return item.name?.toLowerCase().includes(searchKeyword?.toLowerCase()) || item.addr?.toLowerCase().includes(searchKeyword?.toLowerCase());
        } else {
          return item.name?.toLowerCase().includes(searchKeyword?.toLowerCase()) || item.addr?.toLowerCase().includes(searchKeyword?.toLowerCase());
        }
      }),
    [dealershipList, searchKeyword],
  );

  const handleClick = (dealershipInfo) => {
    setSelectedDealershipInfo(dealershipInfo);
    const newCompleted = completed;
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
    setCurrentStep(currentStep + 1);
  };

  //                                                             RENDER
  return (
    <>
      <Subtitle title={t('select_a_dealer')} />
      <div style={styles.container}>
        <Box sx={styles.searchFilterContainer}>
          <TextField
            onChange={handleChange}
            sx={styles.searchBar}
            placeholder={t('postcode_dealership_name_city')}
            id="outlined-basic"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: filterOpened ? color.secondary_active_blue : color.grey_white }}
                    onClick={handleFilter}
                    aria-label="filter"
                    edge="end"
                  >
                    <TuneIcon />
                  </IconButton>
                  <IconButton style={styles.filterPopupButton} aria-label="location" edge="end">
                    <MyLocationIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {filterOpened ? (
            <Box sx={styles.filterPopup}>
              <Typography style={fonts.c2}>{t('business_hour')}</Typography>
              <Box style={styles.filterOption}>
                <Checkbox disableRipple style={styles.checkBox} {...label} size="small" />
                <Typography style={fonts.cta2}>{t('open')}</Typography>
              </Box>
              <Box style={styles.filterOption}>
                <Checkbox disableRipple style={styles.checkBox} {...label} size="small" />
                <Typography style={fonts.cta2}>{t('closed')}</Typography>
              </Box>
            </Box>
          ) : null}

          <div style={styles.dealershipWrapper}>
            {dealershipList?.length > 0 && (
              <div style={styles.dealershipListBox} ref={scrollRef}>
                {searchDealershipList.map((dealershipInfo) => {
                  return (
                    <Button onClick={() => handleModalOpen(dealershipInfo)} key={dealershipInfo._id} sx={styles.dealershipListButton}>
                      <Typography style={styles.dealershipInfoText}>{dealershipInfo.name}</Typography>
                      <Typography style={styles.dealershipInfoText}>{dealershipInfo.address}</Typography>

                      {dealershipInfo.isOpened ? (
                        <Typography style={styles.openInfoText}>{t('open')}</Typography>
                      ) : (
                        <Typography style={styles.openInfoText}>{t('closed')}</Typography>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </Box>

        <Box sx={styles.mapContainer}>
          <DealershipMap ref={hMapRef} dealershipList={dealershipList} modalDealershipInfo={modalDealershipInfo} handleModalOpen={handleModalOpen} />
          {modalOpened ? (
            <DealershipInfoModal
              dealershipInfo={modalDealershipInfo}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              modalOpened={modalOpened}
              handleModalClose={handleModalClose}
              handleClick={() => handleClick(modalDealershipInfo)}
            />
          ) : null}
        </Box>
      </div>
    </>
  );
}

import { useState, useEffect, useRef, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { StyledTextInput } from '@components/TextInput';
import { styles } from './styles';

export default function SearchAddress({ setCity, setPostalCode }) {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchAddressResult, setSearchAddressResult] = useState();
  const [streetError, setStreetError] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const { t } = useTranslation();

  const handleChange = async (keyword) => {
    setSearchAddress(keyword);
    console.log(searchAddress);
    const HEREMAPS_API_KEY = 'xfywUXv4ASL07-UtiHWxg4ytKjGJJe6L3Vr3GL1kzmQ';
    const response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${searchAddress}&apiKey=${HEREMAPS_API_KEY}`);
    const result = response.data.items;
    setSearchAddressResult(result);
    console.log(searchAddressResult);
    setSelectedAddress();
  };

  const defaultArray = [];

  const handleSelect = (selectedOption) => {
    console.log('handle select', selectedOption);
    setSelectedAddress(selectedOption.address.street);
    setCity(selectedOption.address.city);
    setPostalCode(selectedOption.address.postalCode);
  };

  return (
    <>
      <Autocomplete
        disableCloseOnSelect
        onChange={(searchAddressResult) => handleSelect(searchAddressResult)}
        id="search-address"
        options={searchAddressResult ? searchAddressResult.map((item) => item.title) : defaultArray}
        required
        renderInput={(params) => (
          <StyledTextInput
            {...params}
            label={t('street')}
            onChange={(event) => handleChange(event.target.value)}
            required
            helperText={streetError ? 'Invalid format' : null}
            InputProps={{
              ...params.InputProps,
              endAdornment: <></>,
            }}
          />
        )}
      />

      {/* <Autocomplete
        id="google-map-demo"
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
        renderOption={(props, option) => {
          const matches = option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <LocationOnIcon sx={{ color: 'text.secondary' }} />
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  {parts.map((part, index) => (
                    <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                      {part.text}
                    </Box>
                  ))}

                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      /> */}
    </>
  );
}

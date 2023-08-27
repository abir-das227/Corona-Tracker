import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     setCountries(await fetchCountries());
  //   };

  //   fetchAPI();
  // }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        // Handle the error here, e.g., display an error message or log it.
        console.error('Error fetching data:', error);
      }
    };

    fetchAPI();
  }, []);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">USA</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

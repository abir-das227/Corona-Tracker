import axios from 'axios';

const url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  //   try {
  //     const { data: { cases, recovered, deaths, population } } = await axios.get(changeableUrl);
  // console.log("data check", data)
  //     return { cases, recovered, deaths, population };
  //   } catch (error) {
  //     return error;
  //   }

  try {
    const response = await axios.get(changeableUrl);
    const { data } = response;

    // Assuming data is an array of objects
    const mappedData = data.map(item => ({
      cases: item.cases,
      recovered: item.recovered,
      deaths: item.deaths,
      population: item.population
    }));

    console.log("Mapped Data:", mappedData);

    return mappedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }

};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
    return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    // //     const { data: { countries } } = await axios.get(`${url}/countries`);
    // const response = await axios.get(`${url}/countries`);
    // const { data: { countries } } = response;
    //  console.log("HelLo",response.data[0].country)
    //  //return countries.map((country) => country.name);

    const response = await axios.get(`${url}/countries`);
    const countriesArray = response.data.map(item => item.country);
    console.log("Countries Array:", response.data);
    return countriesArray;
  } catch (error) {
    return error;
  }
};

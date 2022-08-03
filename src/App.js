import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CountryView = ({ country }) =>
{
  const langs = Object.values(country.languages);
  return(
    <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages</h3>
          <ul>
            {langs.map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <div>
            <img 
              src={country.flags.png}
              alt={`flag of ${country.name.common}`}
              width="180"
              height="120"
            />
          </div>
        </div>
  );
}

const CountryList = ({ result, countryToView, setCountryView }) =>
{
  if(countryToView === '')
  {
    return(
      <div>
        <h2>Countries Found</h2>
        <ul>
          {result.map(country => <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountryView(country.name.common)}>show</button>
            </li>)}
        </ul>
      </div>
    );
  }else
  {
    return(
      <CountryView country={countryToView}/>
    );
  }
}

function App() {
  const [countrySearch, setCountrySearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryToView, setCountryToView] = useState('');

  const hook = () =>
  {
    axios.get("https://restcountries.com/v3.1/all")
      .then(res => {
        setCountries(res.data);
      });

  }
  useEffect(hook, []);

  const onCountrySearchChanged = (e) =>
  {
    setCountrySearch(e.target.value);
    setCountryToView('');
  }

  const setCountryView = (name) =>
  {
    
    let countryData = '';
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(res => {
      countryData = res.data[0];
      setCountryToView(countryData);
      //console.log(countryData);
    });
    //console.log("country");
  }

  const searchCountries = (filterName) =>
  {
    const result = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()));
    if(result.length === 1)
    {
      const res = result[0];
      return(
        <CountryView country={res}/>
      );
    }else if(result.length > 10)
    {
      return(
        <p>Too many countries!</p>
      );
    }else if(result.length === 0)
    {
      return(
        <p>No Countries Match Search!</p>
      );
    }else
    {
      return(
        <CountryList result={result}
          countryToView={countryToView}
          setCountryView={setCountryView}/>
      );
    }
  }

  return (
    <div>
      <div>
        <h1>Countries</h1>
        <p>Find Countries: <input onChange={onCountrySearchChanged}/></p>
      </div>

      <div>
        {searchCountries(countrySearch)}
      </div>
    </div>
  );
}

export default App;

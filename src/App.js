import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countrySearch, setCountrySearch] = useState('');
  const [countries, setCountries] = useState([]);

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
  }

  const searchCountries = (filterName) =>
  {
    const result = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()));
    if(result.length === 1)
    {
      const res = result[0];
      const langs = Object.values(res.languages);
      return(
        <div>
          <h1>{res.name.common}</h1>
          <p>Capital: {res.capital}</p>
          <p>Area: {res.area}</p>
          <h3>Languages</h3>
          <ul>
            {langs.map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <div>
            <p>{res.flag}</p>
          </div>
        </div>
        
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
        <ul>
          {result.map(country => <li key={country.name.common}>{country.name.common}</li>)}
        </ul>
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
        <h2>Countries Found</h2>
        {searchCountries(countrySearch)}
      </div>
    </div>
  );
}

export default App;

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

import './App.css';
import DataList from './DataList';

function App() {
  const leadingCauseOfDeathData = "https://data.cityofnewyork.us/resource/jb7j-dtam.json";
  const [deathData, setDeathData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRace, setSelectedRace] = useState("none");
  const [selectedYear, setSelectedYear] = useState("none");
  const [selectedSex, setSelectedSex] = useState("none");

  useEffect(() => {
    fetch(leadingCauseOfDeathData)
      .then((response) => {
        if (response.status === 404) {
          return "something happened and we couldn't get the file";
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setDeathData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    console.log("selectedRace", selectedRace);
    console.log("selectedSex", selectedSex);
    // TODO: Add year selection
    const newData = deathData.filter((data) => {
      if (data["race_ethnicity"] === selectedRace &&
        data.sex === selectedSex) {
        return true;
      }
      return false;
    });

    setFilteredData(newData);
  }, [selectedRace, deathData, selectedSex]);

  function filterData(dataProperty, filterValue) {
    if (filterValue === "none") {
      setFilteredData(deathData);
    } else {
      const newData = deathData.filter((data) => {
        // if (data[dataProperty] === filterValue) {
        if (data["race_ethnicity"] === selectedRace) { 
          return true;
        }
        return false;
      });

      setFilteredData(newData);
    }
  }

  return (
    <div className="App" style={{margin: "20px" }}>
      <FormControl variant="filled">
        <InputLabel id="select-race-label">Race Ethnicity</InputLabel>
        <Select
          labelId="select-race-label"
          id="select-race-id"
          value={selectedRace}
          label="Age"
          onChange={(value) => {
            setSelectedRace(value.target.value);
          }}
          autoWidth
        >
          <MenuItem value="none">---</MenuItem>
          <MenuItem value="Other Race/Ethnicity">Other Race/Ethnicity</MenuItem>
          <MenuItem value="Asian and Pacific Islander">Asian and Pacific Islander</MenuItem>
          <MenuItem value="Non-Hispanic Black">Non-Hispanic Black</MenuItem>
          <MenuItem value="Hispanic">Hispanic</MenuItem>
          <MenuItem value="Non-Hispanic White">Non-Hispanic White</MenuItem>
          <MenuItem value="Not Stated/Unknown">Not Stated/Unknown</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled">
        <InputLabel id="select-sex-label">Sex</InputLabel>
        <Select
          labelId="select-sex-label"
          id="select-sex-id"
          value={selectedSex}
          label="Sex"
          onChange={(someothervalue) => {
            setSelectedSex(someothervalue.target.value);
          }}
          autoWidth
        >
          <MenuItem value="none">---</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>

        </Select>
      </FormControl>

      <FormControl variant="filled">
        <InputLabel id="select-year-label">Year</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year-id"
          value={selectedYear}
          label="Year"
          onChange={(value) => {
            filterData("year", value.target.value);
            setSelectedYear(value.target.value);
          }}
          autoWidth
        >
          <MenuItem value="none">---</MenuItem>
          <MenuItem value="2019">2019</MenuItem>
          <MenuItem value="2014">2014</MenuItem>

        </Select>
      </FormControl>
  
      <h1>Leading Causes of Deaths in NYC</h1>
      <DataList data={filteredData} test="Testing" test2="Testing2" /> 
      
    </div>
  );
}

export default App;


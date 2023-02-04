import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

import './App.css';

const APIKEY = "52637932af3c2704ad91e8c8b03a1d3b";

//key we have to access the data
//however not secure because everyone can have access to the key 

function App() {
  // const [movie, setMovie] = useState(undefined);

  // makes the variables ?
  const [release_date, setReleaseDate] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(undefined);
  const [duration, setDuration] = useState(undefined);
  const [userInput, setUserInput] = useState("James Bond"); 
  const link = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US`;
  const linkToGenre  = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}` ;

  function getLink( query = "" ){
    return `${link}&query=${query}`
  }

  useEffect(() => {
    if (userInput.trim() !== "") {
      const newLink = getLink (userInput);
      fetch(newLink)
        .then((response) => {
          if (response.status === 404) {
            return "something happened and we couldn't get the file";
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          setMovies(data?.results);
          setGenre(data?.results);
          //What does this do? 
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [userInput]);

  useEffect(() => {
    fetch(linkToGenre)
      .then((response) => {
        if (response.status === 404) {
          return "something happened and we couldn't get the file";
        }
        return response.json();
      })
      .then((data) => {
         console.log(data);
          console.log("From genre endpoint");
        //What does this do? 
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    console.log("in useEffect, genre: ", genre);
  }, [genre]);
 
  useEffect( () => {
    console.log("In useEffect, duration: ", duration);
  }, [genre]);

  console.log("movies", movies);

  return (
    <div className="App" style={{margin: "40px" }}>
      Movie app through IMDB
      <button onClick={() => setGenre("action")}>
        Action
      </button>
      <button onClick={() => setGenre("sci-fi")}>
        sci-fi
      </button>
      <button onClick={() => setGenre("drama")}>
        drama
      </button>
      <button onClick={ () => setGenre("") }> Insert 
      </button>

      <button onClick ={() => setGenre("drama")} >
        Drama
      </button>
      
      <div> 
        
      <label for="movieInputField">Search Movie Name</label>
      <input type="text" id="movieInputField" name="name" onChange ={(event) => setUserInput(event.target.value) }/>      

      </div>

      {/* <img
        alt=""
        src={`https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`}
      /> */}

       {/* { <img
        alt=""
        src={`https://xmC3HLzNbeU8WfMXV72KCAdS0v0.jpg${movie && movie.poster_path}`}
      /> } */}

     
     { /* unordered list == <ul></ul>*/
      /* ordered list == <ol></ol> */ 
      /* li is list item */
      /* p tag is for paragrapgh, imgs, links etc */
      /* img is an image, IMG is costumed 
      have two attributes
      - alt = alternate text, text read by screen reader 
      - src = where your image is hosted and where you want to link it to */}
      <ul>
        {movies.map((movie) =>
          <li>
            <p>{movie.original_title}</p>
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`}
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;


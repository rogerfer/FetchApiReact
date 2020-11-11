import React, { useEffect, useState } from 'react';
import './App.css';
import Walker from './walker.jpg';
import axios from 'axios';

function App() {

  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query='
  })

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random');
    console.log(result.data.value);
    setState({
      ...state,
      joke: result.data.value
    });
  }

  const searchJoke = (event) => {
    console.log(event.target.value);
    setState({
      ...state,
      searchKeyword: event.target.value
    })
  }


  const fetchMyJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    console.log(result.data.result);

    const jokePosition = Math.floor(Math.random() * result.data.result.length);
    console.log(jokePosition);
    setState({
      ...state,
      joke: result.data.result[jokePosition].value
    })

  }




  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Walker | Texas Ranger API</h1>
          <img src={Walker} alt="Chuck Norris"></img>
        </div>


        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">
              Search word
          </div>
            <div className="card-body">
              <input type="text" onChange={searchJoke}></input>
            </div>
          </div>
          <div>
            <button onClick={fetchMyJoke} className="btn btn-warning btn-lg">
              Generate Joke
          </button>
            <h2 className="subTitle">The joke</h2>
            <h4>{state.joke}</h4>
            <br></br>
          </div>
        
        </div>
       
      </div>
      <iframe className="video" width="420" height="315" src="https://www.youtube.com/embed/NIYZVSElmj4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
}

export default App;

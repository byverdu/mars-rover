import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import { EnumApiRoutes } from './Models/enums';
import DetailsWrapper from './Components/DetailsWrapper';
import { detailsWrapperText } from './config';
import { IPlateauPayload } from './Models/Interfaces';

// https://codepen.io/giana/pen/OrpdLK

const App: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // (async () => {
    //   const result = await axios.get('/api/plateau/');
      
    //   setData(result.data);
    //   console.log(data)
    // })();
  }, [data]);

  const postPlateau = (data: IPlateauPayload) => {
    axios.post(EnumApiRoutes.postPlateau, data)
      .then(resp => setData(resp))
      .catch(err => console.log(err))
      .finally(() => console.log(data))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {data && data.plateau.name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
      <DetailsWrapper
        submitData={postPlateau}
        {...detailsWrapperText}
      />
      </section>
    </div>
  );
}

export default App;

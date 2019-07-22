import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { EnumApiRoutes } from './Models/enums';

// https://codepen.io/giana/pen/OrpdLK

interface DetailsInputProps {
  title: string
}

const DetailsInput: React.FC<DetailsInputProps> = ({title, children}) => {
  return (
    <details>
      <summary>{title}</summary>
      {children}
    </details>
  )
};

const DetailsInputPlateau: React.FC = () => (
  <DetailsInput title="Set Plateau Size">
    <section className="plateau-data">
      <input type="number" name="width" placeholder="Set Width" />
      <input type="number" name="height" placeholder="Set Height" />
    </section>
  </DetailsInput>
);

const DetailsInputRover: React.FC = () => (
  <DetailsInput title="Set Rover Data">
    <section className="rover-data">
      <input type="text" name="position" placeholder="Set Rover Coords" />
      <input type="text" name="steps" placeholder="Set Rover Steps" />
    </section>
  </DetailsInput>
);

const App: React.FC = () => {
  useEffect(() => {
    axios.get(EnumApiRoutes.getPlateau)
      .then(resp => console.log(resp.data))
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DetailsInputPlateau />
        <DetailsInputRover />
        <button onClick={(e) => {
          e.preventDefault();

          const plateauSize = Array.from(document.querySelectorAll('.plateau-data input'));
          
          const width = (plateauSize.find(input => (input as HTMLInputElement).name === 'width') as HTMLInputElement).value;
          
          const height = (plateauSize.find(input => (input as HTMLInputElement).name === 'height') as HTMLInputElement).value;
          
          const tempRovers = Array.from(document.querySelectorAll('.rover-data input'));
          
          const position = (tempRovers.find(input => (input as HTMLInputElement).name === 'position') as HTMLInputElement).value;
          
          const steps = (tempRovers.find(input =>  (input as HTMLInputElement).name === 'steps') as HTMLInputElement).value;

          console.log(position, steps, height, width);

            axios.post(EnumApiRoutes.postPlateau, {
              plateauSize: `${width}x${height}`,
              rovers: [
                {position, steps}
              ]
            });
        }}>Set Data</button>
      </header>
      <section>
      </section>
    </div>
  );
}

export default App;

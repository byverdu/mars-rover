import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import { EnumApiRoutes, EnumProxyAddress } from './Models/enums';
import DetailsWrapper from './Components/DetailsWrapper';
import Plateau from './Components/Plateau';
import { detailsWrapperText } from './config';
import { IPlateauPayload } from './Models/Interfaces';

// https://codepen.io/giana/pen/OrpdLK

interface AppState {
  data: any;
}

export default class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const url = `${EnumProxyAddress[process.env.NODE_ENV]}${
      EnumApiRoutes.getPlateau
    }`;
    console.log(process.env.NODE_ENV);
    const result = await axios.get(EnumApiRoutes.getPlateau);

    console.log(result)

    this.setState({
      data: result.data.plateau.pop()
    });

    let dataLenght = result.data[0].rovers[0].stepsToNextPosition.steps.length;
    let counter = 0;
    let interval;

    setTimeout(() => {
      interval = setInterval(() => {
        if (counter === dataLenght) {
          clearInterval(interval)
          console.log('end')
        }

        console.log('running')

        const steps = this.state.data.rovers[0].stepsToNextPosition.steps.slice(counter, 1)

        this.setState({
          data: {
            ...this.state.data,
            rovers: [{
              ...this.state.data.rovers[0],
              stepsToNextPosition: {
                steps: this.state.data.rovers[0].stepsToNextPosition.steps.slice(1)
              }
            }
            ]
          }
        })

        counter += 1;
      }, 1500)
    }, 1000)
  }

  postPlateau = async (data: IPlateauPayload) => {
    const result = await axios.post(EnumApiRoutes.postPlateau, data);

    this.setState({
      data: result.data.data
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          {data && data.name}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <section>
          <DetailsWrapper
            submitData={this.postPlateau}
            {...detailsWrapperText}
          />
          {data && (
            <Plateau
              width={data.size.width}
              height={data.size.height}
              rovers={data.rovers}
            />
          )}
        </section>
      </div>
    );
  }
}

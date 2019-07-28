import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { EnumApiRoutes } from './Models/enums';
import DetailsWrapper from './Components/DetailsWrapper';
import Plateau from './Components/Plateau';
import { detailsWrapperText } from './config';
import { IPlateauPayload, IRover } from './Models/Interfaces';

interface AppState {
  data: any;
  rovers: IRover[];
}

export default class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      rovers: null
    };
  }

  async componentDidMount() {
    const result = await axios.get(EnumApiRoutes.getPlateau);

    if (Object.keys(result.data).length > 0) {
      this.setState(
        {
          data: result.data,
          rovers: result.data.rovers
        },
        () => this.forceUpdate()
      );
    }
  }

  postPlateau = async (payload: IPlateauPayload) => {
    const { data } = await axios.post(EnumApiRoutes.postPlateau, payload);

    this.setState({
      data,
      rovers: data.rovers
    });
  };

  render() {
    const { data, rovers } = this.state;

    return (
      <div className="App">
        <section>
          <DetailsWrapper
            submitData={this.postPlateau}
            {...detailsWrapperText}
          />
          {data && (
            <Plateau
              width={data.size.width}
              height={data.size.height}
              rovers={rovers}
            />
          )}
        </section>
      </div>
    );
  }
}

import React, { Fragment, Component } from 'react';
import './DetailsWrapper.scss';
import DetailsInput from '../DetailsInput';
import CoordsDropdown from '../Dropdown';
import NextSteps from '../NextSteps';
import {
  IPlateauPayload,
  IRoverPositionPayload
} from '../../Models/Interfaces';
import {
  renderPlateauInfo,
  renderRoverPosition,
  renderRoverNextSteps
} from '../Renderers';

export interface DetailsWrapperProps {
  plateauTitle: string;
  roverTitle: string;
  submitData: (data: IPlateauPayload) => void;
}

interface DetailsWrapperState {
  plateauWidth: number;
  plateauHeight: number;
  roverPosition: string;
  roverNextSteps: string;
  displayForm: boolean;
  rovers: IRoverPositionPayload[];
}

export default class DetailsWrapper extends Component<
  DetailsWrapperProps,
  DetailsWrapperState
> {
  constructor(props) {
    super(props);

    this.state = {
      plateauWidth: 0,
      plateauHeight: 0,
      roverPosition: undefined,
      roverNextSteps: undefined,
      displayForm: true,
      rovers: []
    };
  }

  componentWillReceiveProps(props, nextProps) {
    console.log(props, nextProps);
  }

  toggleForm = (toggle?: boolean) => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  };

  changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: 'plateauWidth' | 'plateauHeight'
  ) => {
    this.setState({
      ...this.state,
      [inputName]: Number(e.target.value)
    });
  };

  addRoverHandler = (rovers: IRoverPositionPayload[]) =>
    this.setState({
      roverNextSteps: '',
      roverPosition: '',
      rovers
    });

  setRoverPosition = (roverPosition) =>
    this.setState({ roverPosition }, this.forceUpdate);

  setRoverNextSteps = (roverNextSteps) => this.setState({ roverNextSteps });

  render() {
    const {
      displayForm,
      plateauHeight,
      plateauWidth,
      roverNextSteps,
      roverPosition,
      rovers
    } = this.state;
    const { plateauTitle, roverTitle, submitData } = this.props;
    const minHeightValue = plateauWidth ? plateauWidth + 1 : 0;
    const addRoverDisabled =
      roverPosition !== undefined && roverNextSteps !== undefined;
    const setDataDisabled =
      rovers.length > 0 && plateauWidth > 0 && plateauHeight > 0;
    return (
      <Fragment>
        <button
          className="toggle-form"
          onClick={() => {
            this.toggleForm();
          }}
        >
          {displayForm ? 'Hide' : 'Show'} Form
        </button>
        <form noValidate style={{ display: displayForm ? 'block' : 'none' }}>
          {plateauWidth &&
            plateauHeight &&
            renderPlateauInfo(plateauWidth, plateauHeight)}
          <div className="container collapse">
            <DetailsInput title={plateauTitle}>
              <section className="plateau-data">
                <label htmlFor="plateau-width">
                  <span>Set Plateau Width</span>
                  <input
                    id="plateau-width"
                    required
                    type="number"
                    value={plateauWidth}
                    placeholder="Set Width"
                    onChange={(e) => this.changeHandler(e, 'plateauWidth')}
                  />
                </label>
                <label htmlFor="plateau-height">
                  <span>
                    Set Plateau Height{' '}
                    <b>
                      {plateauWidth > 0 &&
                        `[Set Height bigger than ${plateauWidth}]`}
                    </b>
                  </span>
                  <input
                    id="plateau-height"
                    required
                    disabled={!plateauWidth}
                    min={minHeightValue}
                    type="number"
                    value={plateauHeight}
                    placeholder={`Set Height bigger than ${plateauWidth}`}
                    onChange={(e) => this.changeHandler(e, 'plateauHeight')}
                  />
                </label>
              </section>
            </DetailsInput>
          </div>
          <div className="container collapse">
            {rovers.map((rover: IRoverPositionPayload, index) => {
              return (
                <section key={index}>
                  {renderRoverPosition(rover.position)}
                  {renderRoverNextSteps(rover.steps)}
                </section>
              );
            })}
            {plateauWidth && plateauHeight && (
              <DetailsInput title={roverTitle}>
                <section className="rover-data">
                  <CoordsDropdown
                    setRoverPosition={this.setRoverPosition}
                    width={plateauWidth}
                    height={plateauHeight}
                  />
                  {roverPosition && roverPosition.length === 5 && (
                    <NextSteps
                      setRoverNextSteps={this.setRoverNextSteps}
                      initialPosition={roverPosition}
                      xAxisOutOfBoundaries={plateauWidth}
                      yAxisOutOfBoundaries={plateauHeight}
                    />
                  )}
                  <button
                    disabled={!addRoverDisabled}
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const tempRovers = [
                        ...rovers,
                        { position: roverPosition, steps: roverNextSteps }
                      ];

                      this.addRoverHandler(tempRovers);
                    }}
                  >
                    Add Rover
                  </button>
                </section>
              </DetailsInput>
            )}
          </div>
          <button
            disabled={!setDataDisabled}
            className="button"
            onClick={(e) => {
              e.preventDefault();
              this.toggleForm(false);
              submitData({
                plateauSize: `${plateauWidth}x${plateauHeight}`,
                rovers
              });
            }}
          >
            Set Data
          </button>
        </form>
      </Fragment>
    );
  }
}

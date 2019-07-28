import React, { useState, Fragment } from 'react';
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

const DetailsWrapper: React.FC<DetailsWrapperProps> = ({
  plateauTitle,
  roverTitle,
  submitData
}) => {
  const [plateauWidth, setPlateauWidth] = useState(0);
  const [plateauHeight, setPlateauHeight] = useState(0);
  const [roverPosition, setRoverPosition] = useState(undefined);
  const [roverNextSteps, setRoverNextSteps] = useState(undefined);
  const [displayForm, setDisplayForm] = useState(true);
  const [rovers, setRovers] = useState([]);

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
          setDisplayForm(!displayForm);
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPlateauWidth(Number(e.target.value))
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPlateauHeight(Number(e.target.value))
                  }
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
                  setRoverPosition={setRoverPosition}
                  width={plateauWidth}
                  height={plateauHeight}
                />
                {roverPosition && roverPosition.length === 5 && (
                  <NextSteps
                    setRoverNextSteps={setRoverNextSteps}
                    initialPosition={roverPosition}
                    outOfBoundaries={plateauWidth}
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

                    setRoverPosition('');
                    setRoverNextSteps('');
                    setRovers(tempRovers);
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
            setDisplayForm(false);
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
};

export default DetailsWrapper;

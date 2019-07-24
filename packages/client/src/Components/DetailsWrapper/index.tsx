import React, { Fragment, useState } from 'react';
import './DetailsWrapper.scss';
import DetailsInput from '../DetailsInput';
import { IPlateauPayload } from '../../Models/Interfaces';

export interface DetailsWrapperProps {
  plateauTitle: string;
  roverTitle: string;
  submitData: (data: IPlateauPayload) => void;
}

const renderPlateauInfo = (plateauWidth, plateauHeight) => {
  if (plateauWidth > 0 || plateauHeight > 0) {
    return (
      <h3>Plateau size {plateauWidth} x {plateauHeight}</h3>
    );
  }

  return null;
}

const renderRoverPosition = (position: string) => {
  if (position.length > 0) {
    return (
      <h3>Initial Rover Position: {position}</h3>
    );
  }

  return null;
}

const renderRoverNextSteps = (steps: string) => {
  if (steps.length > 0) {
    return (
      <h3>Next Steps: {steps}</h3>
    );
  }

  return null;
}

const DetailsWrapper: React.FC<DetailsWrapperProps> = ({
  plateauTitle,
  roverTitle,
  submitData
}) => {

  const [plateauWidth, setPlateauWidth] = useState(0);
  const [plateauHeight, setPlateauHeight] = useState(0);
  const [roverPosition, setRoverPosition] = useState('');
  const [roverNextSteps, setRoverNextSteps] = useState('');

  return (
    <Fragment>
      {renderPlateauInfo(plateauWidth, plateauHeight)}
      {renderRoverPosition(roverPosition)}
      {renderRoverNextSteps(roverNextSteps)}
      <div className="container collapse">
        <DetailsInput title={plateauTitle}>
          <section className="plateau-data">
            <input
              type="number"
              value={plateauWidth}
              placeholder="Set Width"
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setPlateauWidth(Number(e.target.value))
              }
            />
            <input
              type="number"
              value={plateauHeight}
              placeholder="Set Height"
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setPlateauHeight(Number(e.target.value))
              }
            />
          </section>
        </DetailsInput>
      </div>
      <div className="container collapse">
        <DetailsInput title={roverTitle}>
          <section className="rover-data">
            <input
              type="text"
              name="position"
              placeholder="Set Rover Coords"
              value={roverPosition}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setRoverPosition(e.target.value)
              }
            />
            <input
              type="text"
              name="steps"
              placeholder="Set Rover Steps"
              value={roverNextSteps}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setRoverNextSteps(e.target.value)
              }
            />
          </section>
        </DetailsInput>
      </div>
      <button onClick={(e) => {
        e.preventDefault();
        submitData({
          plateauSize: `${plateauWidth}x${plateauHeight}`,
          rovers: [
            { position: roverPosition, steps: roverNextSteps }
          ]
        })

      }}>Set Data</button>
    </Fragment>
  );
}

export default DetailsWrapper

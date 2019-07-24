import React, { Fragment, useState } from 'react';
import './DetailsWrapper.scss';
import DetailsInput from '../DetailsInput';
import DetailsRover from '../DetailsRover';
import { IPlateauPayload, IRoverPositionPayload } from '../../Models/Interfaces';
import { renderPlateauInfo, renderRoverPosition, renderRoverNextSteps } from '../Renderers';

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
  // const [roverPosition, setRoverPosition] = useState('');
  // const [roverNextSteps, setRoverNextSteps] = useState('');
  const [rovers, setRovers] = useState([]);

  const setRoverDataHandler = ({ position, steps }: IRoverPositionPayload) => {
    const tempRovers = [...rovers, { position, steps }];

    setRovers(tempRovers)
  }

  return (
    <Fragment>
      {renderPlateauInfo(plateauWidth, plateauHeight)}

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
      {/* <div className="add-plateau">
        <button>Set Rover Data</button>
      </div> */}
      <div className="container collapse">
        <DetailsRover
          title={roverTitle}
          setRoverDataHandler={setRoverDataHandler}
        />
        {/* {renderRoverPosition(roverPosition)}
        {renderRoverNextSteps(roverNextSteps)}
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
            <button
              onClick={() => {
                const tempRovers = [...rovers, { position: roverPosition, steps: roverNextSteps }];

                setRovers(tempRovers)
              }}
            >Add Rover</button>

          </section>
        </DetailsInput> */}
      </div>
      <button onClick={(e) => {
        e.preventDefault();
        submitData({
          plateauSize: `${plateauWidth}x${plateauHeight}`,
          rovers
        })

      }}>Set Data</button>
    </Fragment>
  );
}

export default DetailsWrapper

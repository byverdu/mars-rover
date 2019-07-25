import React, { Fragment, useState } from 'react';
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
  const [roverPosition, setRoverPosition] = useState('');
  const [roverNextSteps, setRoverNextSteps] = useState('');
  const [rovers, setRovers] = useState([]);

  console.log(roverPosition, roverNextSteps);

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPlateauWidth(Number(e.target.value))
              }
            />
            <input
              type="number"
              value={plateauHeight}
              placeholder="Set Height"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPlateauHeight(Number(e.target.value))
              }
            />
          </section>
        </DetailsInput>
      </div>
      <div className="container collapse">
        {rovers.map((rover: IRoverPositionPayload) => {
          return (
            <section>
              {renderRoverPosition(rover.position)}
              {renderRoverNextSteps(rover.steps)}
            </section>
          );
        })}
        <DetailsInput title={roverTitle}>
          <section className="rover-data">
            <CoordsDropdown
              setRoverPosition={setRoverPosition}
              width={plateauWidth}
              height={plateauHeight}
            />
            <NextSteps setRoverNextSteps={setRoverNextSteps} />
            <button
              onClick={() => {
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
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          submitData({
            plateauSize: `${plateauWidth}x${plateauHeight}`,
            rovers
          });
        }}
      >
        Set Data
      </button>
    </Fragment>
  );
};

export default DetailsWrapper;

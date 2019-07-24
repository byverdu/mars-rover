import React, {useState} from 'react';
import './DetailsRover.scss';
import { renderRoverPosition, renderRoverNextSteps } from '../Renderers';
import DetailsInput from '../DetailsInput';
import { IRoverPositionPayload } from '../../Models/Interfaces';

export interface DetailsRoverProps {
  title: string;
  setRoverDataHandler: (roverData: IRoverPositionPayload) => void;
}

const DetailsRover: React.FC<DetailsRoverProps> = ({title, setRoverDataHandler}) => {
  const [position, setPosition] = useState('');
  const [steps, setSteps] = useState('');
  

  return (
    <div className="container collapse">
      {renderRoverPosition(position)}
      {renderRoverNextSteps(steps)}
      <DetailsInput title={title}>
        <section className="rover-data">
          <input
            type="text"
            name="position"
            placeholder="Set Rover Coords"
            value={position}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setPosition(e.target.value)
              }
            }
          />
          <input
            type="text"
            name="steps"
            placeholder="Set Rover Steps"
            value={steps}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => setSteps(e.target.value)
            }
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setRoverDataHandler({ position, steps });
            }}
          >Add Rover</button>

        </section>
      </DetailsInput>
    </div>
  )
};

export default DetailsRover

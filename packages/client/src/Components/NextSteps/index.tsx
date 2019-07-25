import React, { useState } from 'react';
import './NextSteps.scss';
import { EnumsSteps } from '../../Models/enums';

export interface NextStepsProps {
  setRoverNextSteps: (value: string) => void;
}

const NextSteps: React.FC<NextStepsProps> = ({ setRoverNextSteps }) => {
  const [steps, setSteps] = useState('');

  return (
    <div>
      <h5>Set Rover Next Steps</h5>
      {steps}
      {[EnumsSteps.L, EnumsSteps.M, EnumsSteps.R].map((step) => {
        return (
          <button
            onClick={(e: React.MouseEvent) => {
              const elementText = (e.target as HTMLButtonElement).textContent;
              const newText = steps.concat(elementText);
              setSteps(newText);
              setRoverNextSteps(newText);
            }}
          >
            {step}
          </button>
        );
      })}
    </div>
  );
};

export default NextSteps;

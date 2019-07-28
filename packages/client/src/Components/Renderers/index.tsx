import React from 'react';

export const renderPlateauInfo = (plateauWidth, plateauHeight) => {
  if (plateauWidth > 0 || plateauHeight > 0) {
    return (
      <h3 className="resume">
        Plateau size {plateauWidth} x {plateauHeight}
      </h3>
    );
  }

  return null;
};

export const renderRoverPosition = (position: string) => {
  if (position.length > 0) {
    return <h3 className="resume">Initial Rover Position: {position}</h3>;
  }

  return null;
};

export const renderRoverNextSteps = (steps: string) => {
  if (steps.length > 0) {
    return <h3>Next Steps: {steps}</h3>;
  }

  return null;
};

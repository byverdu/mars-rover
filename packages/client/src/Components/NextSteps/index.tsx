import React from 'react';
import './NextSteps.scss';
import { EnumsSteps } from '../../Models/enums';
import { convertSourceInToCoords } from '../../config/utils';

export interface NextStepsProps {
  setRoverNextSteps: (value: string) => void;
  initialPosition: string;
  outOfBoundaries: number;
}

interface NextStepsState {
  steps: string;
  nextPosition: string;
}

export default class NextSteps extends React.PureComponent<
  NextStepsProps,
  NextStepsState
> {
  constructor(props) {
    super(props);

    this.state = {
      steps: '',
      nextPosition: ''
    };
  }

  componentWillReceiveProps(props: NextStepsProps, state) {
    if (props.initialPosition === '') {
      this.setState({
        steps: ''
      });
    }
  }

  onClickHandler = (e) => {
    const { initialPosition, setRoverNextSteps, outOfBoundaries } = this.props;
    const { steps, nextPosition } = this.state;

    const elementText = (e.target as HTMLButtonElement).textContent;
    const newText = steps.concat(elementText);
    const thisPosition =
      nextPosition.length !== 0 ? nextPosition : initialPosition;
    const nextCoords = convertSourceInToCoords(
      thisPosition,
      elementText,
      outOfBoundaries
    );

    const isMoveForwardOutOfBoundaries = convertSourceInToCoords(
      nextCoords,
      'M',
      outOfBoundaries
    );

    (document.querySelector('[data-step="M"]') as HTMLButtonElement).disabled =
      isMoveForwardOutOfBoundaries === null;

    setRoverNextSteps(newText);

    this.setState({
      nextPosition: nextCoords,
      steps: newText
    });
  };

  render() {
    const { steps } = this.state;

    return (
      <div>
        <h5>Set Rover Next Steps</h5>
        {steps}
        {[EnumsSteps.L, EnumsSteps.M, EnumsSteps.R].map((step) => {
          return (
            <button key={step} data-step={step} onClick={this.onClickHandler}>
              {step}
            </button>
          );
        })}
      </div>
    );
  }
}

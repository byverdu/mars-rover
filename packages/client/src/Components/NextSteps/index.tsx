import React from 'react';
import './NextSteps.scss';
import { EnumsSteps } from '../../Models/enums';
import { convertSourceInToCoords } from '../../config/utils';

export interface NextStepsProps {
  setRoverNextSteps: (value: string) => void;
  initialPosition: string;
  yAxisOutOfBoundaries: number;
  xAxisOutOfBoundaries: number;
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

  componentWillReceiveProps(props: NextStepsProps, nextProps: NextStepsProps) {
    if (this.state.steps.length === 0) {
      this.isMoveForwardOutOfBoundaries(
        props.initialPosition,
        props.yAxisOutOfBoundaries,
        props.xAxisOutOfBoundaries
      );
    }
    if (props.initialPosition === '') {
      this.setState({
        steps: ''
      });
    }
  }

  isMoveForwardOutOfBoundaries(
    initialPosition,
    yAxisOutOfBoundaries,
    xAxisOutOfBoundaries
  ) {
    const isMoveForwardOutOfBoundaries = convertSourceInToCoords(
      initialPosition,
      'M',
      yAxisOutOfBoundaries,
      xAxisOutOfBoundaries
    );

    (document.querySelector('[data-step="M"]') as HTMLButtonElement).disabled =
      isMoveForwardOutOfBoundaries === null;
  }

  onClickHandler = (e) => {
    e.preventDefault();
    const {
      initialPosition,
      setRoverNextSteps,
      yAxisOutOfBoundaries,
      xAxisOutOfBoundaries
    } = this.props;
    const { steps, nextPosition } = this.state;

    const elementText = (e.target as HTMLButtonElement).dataset.step;
    const newText = steps.concat(elementText);
    const thisPosition =
      nextPosition.length !== 0 ? nextPosition : initialPosition;
    const nextCoords = convertSourceInToCoords(
      thisPosition,
      elementText,
      yAxisOutOfBoundaries,
      xAxisOutOfBoundaries
    );

    if (steps.length > 0) {
      this.isMoveForwardOutOfBoundaries(
        nextCoords,
        yAxisOutOfBoundaries,
        xAxisOutOfBoundaries
      );
    }

    this.setState(
      {
        nextPosition: nextCoords,
        steps: newText
      },
      () => setRoverNextSteps(newText)
    );
  };

  convertDirectionToTextContent(direction) {
    const entities = {
      L: '&larr;',
      M: '&uarr;',
      R: '&rarr;'
    };

    return { __html: entities[direction] };
  }

  render() {
    const { steps } = this.state;

    return (
      <div className="next-steps">
        <h5 className="next-steps-title">Set Rover Next Steps</h5>
        <div className="next-steps-resume">{steps}</div>
        <div className="next-steps-actions">
          {[EnumsSteps.L, EnumsSteps.M, EnumsSteps.R].map((step) => {
            return (
              <button
                data-step={step}
                className="key-button"
                key={step}
                onClick={this.onClickHandler}
                dangerouslySetInnerHTML={this.convertDirectionToTextContent(
                  step
                )}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

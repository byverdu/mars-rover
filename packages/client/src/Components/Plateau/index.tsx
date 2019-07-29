import React, { Component } from 'react';
import './Plateau.scss';
import PlateauSquare from '../PlateauSquare';
import Rover from '../Rover';
import { IRover } from '../../Models/Interfaces';
import { EnumCardinalPoints } from '../../Models/enums';

export interface PlateauProps {
  width: number;
  height: number;
  rovers: IRover[];
}

export interface PlateauState {
  roverMoving: IRover;
  countRoversMoved: number;
  rovers: IRover[];
}

function roverAxisFormatter(position: string) {
  const coords = position.split(' ');

  return `x${coords[0]}:y${coords[1]}`.trim();
}

function gridBuilder(width: number, height: number, rover: IRover) {
  const wrapper = [];
  const { rawFormat, position } = rover.lastKnownPosition;
  const nextStepsFormatted = rover.stepsToNextPosition.steps.map((step) =>
    roverAxisFormatter(step)
  );

  function rowBuilder(newHeight) {
    for (let i = 0; i < width; i += 1) {
      const squareAxis = `x${i}:y${height - newHeight}`;
      const roverAxisPos = roverAxisFormatter(rawFormat);
      const isBusy = squareAxis !== roverAxisPos;
      const willBeBusy = nextStepsFormatted.indexOf(squareAxis) !== -1;

      wrapper.push(
        <PlateauSquare
          willBeBusy={willBeBusy}
          key={squareAxis}
          axis={squareAxis}
          empty={isBusy}
        >
          {!isBusy && (
            <Rover
              axis={roverAxisPos}
              direction={position}
              status={rover.status}
            />
          )}
        </PlateauSquare>
      );
    }
  }
  let counter = 1;
  while (counter <= height) {
    rowBuilder(counter);
    counter += 1;
  }

  return wrapper;
}

export default class Plateau extends Component<PlateauProps, PlateauState> {
  constructor(props: PlateauProps) {
    super(props);

    this.state = {
      rovers: props.rovers,
      roverMoving: props.rovers[0],
      countRoversMoved: 0
    };
  }

  // TODO: refactor functionality to move rover so it's not duplicated
  componentWillReceiveProps(props: PlateauProps, nextProps: PlateauProps) {
    const { stepsToNextPosition } = props.rovers[0];
    const stepsLength = stepsToNextPosition.steps.length;
    const roversLength = props.rovers.length;
    let stepsCounter = 0;
    let roversCounter = 0;

    let interval;

    interval = setInterval(() => {
      const steps =
        stepsCounter === 0
          ? stepsToNextPosition.steps
          : stepsToNextPosition.steps.slice(stepsCounter);
      const step = steps[0];

      this.setState({
        countRoversMoved: 0,
        rovers: props.rovers,
        roverMoving: {
          ...props.rovers[0],
          stepsToNextPosition: {
            steps,
            source: stepsToNextPosition.source
          },
          lastKnownPosition: {
            rawFormat: step,
            position: EnumCardinalPoints[step.substring(4)],
            axis: {
              x: Number(step.substring(0, 1)),
              y: Number(step.substring(2, 3))
            }
          }
        }
      });
      stepsCounter += 1;

      if (stepsCounter === stepsLength) {
        roversCounter += 1;
        if (roversCounter < roversLength) {
          // Minor delay to allow the last setInterval to finish
          // before the next state is set
          setTimeout(() => {
            this.setState({
              roverMoving: this.state.rovers[roversCounter],
              countRoversMoved: roversCounter
            });
          }, 1000);
        }

        clearInterval(interval);
      }
    }, 1000);
  }

  componentDidUpdate(prevProps: PlateauProps, prevState: PlateauState) {
    if (
      this.state.countRoversMoved > 0 &&
      this.state.roverMoving.uuid !== prevState.roverMoving.uuid
    ) {
      const { countRoversMoved } = this.state;
      const rover = this.state.rovers[countRoversMoved];
      const { stepsToNextPosition } = this.state.rovers[countRoversMoved];
      const stepsLength = stepsToNextPosition.steps.length;
      const roversLength = this.state.rovers.length;
      let stepsCounter = 0;
      let roversCounter = countRoversMoved;

      let interval;

      interval = setInterval(() => {
        const steps =
          stepsCounter === 0
            ? stepsToNextPosition.steps
            : stepsToNextPosition.steps.slice(stepsCounter);
        const step = steps[0];

        this.setState({
          roverMoving: {
            ...rover,
            stepsToNextPosition: {
              steps,
              source: stepsToNextPosition.source
            },
            lastKnownPosition: {
              rawFormat: step,
              position: EnumCardinalPoints[step.substring(4)],
              axis: {
                x: Number(step.substring(0, 1)),
                y: Number(step.substring(2, 3))
              }
            }
          }
        });
        stepsCounter += 1;

        if (stepsCounter === stepsLength) {
          roversCounter += 1;
          if (roversCounter < roversLength) {
            // Minor delay to allow the last setInterval to finish
            // before the next state is set
            setTimeout(() => {
              this.setState({
                roverMoving: this.state.rovers[roversCounter],
                countRoversMoved: roversCounter
              });
            }, 1000);
          }

          clearInterval(interval);
        }
      }, 1000);
    }
  }

  render() {
    const { width, height } = this.props;
    const { roverMoving } = this.state;
    return (
      <section className="plateau" style={{ width: `${width * 100}px` }}>
        {gridBuilder(width, height, roverMoving)}
      </section>
    );
  }
}

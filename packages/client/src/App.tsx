import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import { EnumApiRoutes, EnumProxyAddress, EnumCardinalPoints } from './Models/enums';
import DetailsWrapper from './Components/DetailsWrapper';
import Plateau from './Components/Plateau';
import { detailsWrapperText } from './config';
import { IPlateauPayload, IRover } from './Models/Interfaces';


// https://codepen.io/giana/pen/OrpdLK

interface AppState {
  data: any;
  actualRover: IRover;
  updateComponent: boolean;
}

export default class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      actualRover: null,
      updateComponent: true
    };
  }

  async componentDidMount() {
    const url = `${EnumProxyAddress[process.env.NODE_ENV]}${
      EnumApiRoutes.getPlateau
    }`;
    console.log(process.env.NODE_ENV);
    const result = await axios.get(EnumApiRoutes.getPlateau);

    this.setState(
      {
        // data: result.data.plateau.pop()
        data: result.data[0],
        actualRover:  result.data[0].rovers[0]
      },
      () => {
        let roversCount = this.state.data.rovers.length;
    let index = 0;
      const allRoverSteps: string[] = []
      this.state.data.rovers.forEach((element: IRover) => {
        allRoverSteps.push(...element.stepsToNextPosition.steps)
      });
      
      let dataLenght = allRoverSteps.length;
      // let dataLenght = this.state.actualRover.stepsToNextPosition.steps.length;
      let counter = 0;

      let interval;

      setTimeout(() => {
        interval = setInterval(() => {
          if (counter === (dataLenght - 1)) {
            clearInterval(interval)
            if (index === roversCount) {
              index += 1;
            }
            console.log('end', this.state.data);

            // this.setState({
            //   actualRover: {
            //     ...this.state.data.rovers[1]
            //   }
            // })

            this.setState({updateComponent: false})
          }

          
          // const steps = counter === 0 ?
          // this.state.actualRover.stepsToNextPosition.steps :
          // this.state.actualRover.stepsToNextPosition.steps.slice(1)
          const steps = counter === 0 ?
          allRoverSteps :
          allRoverSteps.slice(counter)
          const step = steps[0]
          
          console.log('running', counter, dataLenght, step)
          // this.setState({
          //   actualRover: {
          //     ...this.state.actualRover,
          //     stepsToNextPosition: {
          //       steps,
          //       source: this.state.actualRover.stepsToNextPosition.source
          //     },
          //     lastKnownPosition: {
          //       rawFormat: step,
          //       position: EnumCardinalPoints[step.substring(4)],
          //       axis: {
          //         x: Number(step.substring(0,1)),
          //         y: Number(step.substring(2,3))
          //       }
          //     }
          //   }
          // }, () => {
          //   counter += 1;
          // })
          this.setState({
            actualRover: {
              ...this.state.actualRover,
              stepsToNextPosition: {
                steps,
                source: this.state.actualRover.stepsToNextPosition.source
              },
              lastKnownPosition: {
                rawFormat: step,
                position: EnumCardinalPoints[step.substring(4)],
                axis: {
                  x: Number(step.substring(0,1)),
                  y: Number(step.substring(2,3))
                }
              }
            }
          }, () => {
            counter += 1;
          })
        }, 1500)
      }, 1000)
      }
    );
  }

  // shouldComponentUpdate() {
  //   console.log(this.state.updateComponent, 'this.state.updateComponent should')
  //   return this.state.updateComponent;
  // }

  componentWillReceiveProps() {
    console.log(this.state.updateComponent, 'this.state.updateComponent will')
    
    // let roversCount = this.state.data.rovers.length;
    // let index = 0;
      
    //   let dataLenght = this.state.data.rovers[index].stepsToNextPosition.steps.length;
    //   let counter = 0;

    //   let interval;

    //   setTimeout(() => {
    //     interval = setInterval(() => {
    //       if (counter === dataLenght) {
    //         clearInterval(interval)
    //         if (index <= roversCount) {
    //           index += 1;
    //         }
    //         console.log('end');

    //         this.setState({updateComponent: false})
    //       }

    //       console.log('running', index)

    //       const steps = this.state.actualRover.stepsToNextPosition.steps.slice(index)
    //       const step = steps[index]

    //       this.setState({
    //         actualRover: {
    //           ...this.state.actualRover,
    //           stepsToNextPosition: {
    //             steps: steps.slice(index),
    //             source: this.state.actualRover.stepsToNextPosition.source
    //           },
    //           lastKnownPosition: {
    //             rawFormat: step,
    //             position: EnumCardinalPoints[step.substring(4)],
    //             axis: {
    //               x: Number(step.substring(0,1)),
    //               y: Number(step.substring(2,3))
    //             }
    //           }
    //         }
    //       })
    //       counter += 1;
    //     }, 1500)
    //   }, 1000)
  }

  runAsync = (rover: IRover, index) => {
    // return new Promise((resolve) => {
      const {stepsToNextPosition: {steps, source}} = rover;
      // console.log('calling function for', steps.length)

      // for (let index = 0; index <= (steps.length - 1); index++) {
      //   console.log(index, 'inside loop', steps[index])
        return setInterval(() => {
          console.log('resolved for =>', steps[index])
          this.setState({
            actualRover: {
              ...this.state.actualRover,
              stepsToNextPosition: {
                steps: steps.slice(index),
                source
              },
              lastKnownPosition: {
                rawFormat: steps[index],
                position: EnumCardinalPoints[steps[index].substring(4)],
                axis: {
                  x: Number(steps[index].substring(0,1)),
                  y: Number(steps[index].substring(2,3))
                }
              }
            }
          })
        }, 1500)
      // }
    // });
  }

  // runAsync = (rover: IRover) => {
  //   return new Promise((resolve) => {
  //     const {stepsToNextPosition: {steps, source}} = rover;
  //     console.log('calling function for', steps.length)

  //     for (let index = 0; index <= (steps.length - 1); index++) {
  //       console.log(index, 'inside loop', steps[index])
  //       const id = setInterval(() => {
  //         console.log('resolved for =>', steps[index])
  //         this.setState({
  //           actualRover: {
  //             ...this.state.actualRover,
  //             stepsToNextPosition: {
  //               steps: steps.slice(index),
  //               source
  //             },
  //             lastKnownPosition: {
  //               rawFormat: steps[index],
  //               position: EnumCardinalPoints[steps[index].substring(4)],
  //               axis: {
  //                 x: Number(steps[index].substring(0,1)),
  //                 y: Number(steps[index].substring(2,3))
  //               }
  //             }
  //           }
  //         }, () => {
  //           clearInterval(id);
  //           resolve(true);
  //         })
  //       }, 1500)
  //     }
  //   });
  // }

  postPlateau = async (data: IPlateauPayload) => {
    const result = await axios.post(EnumApiRoutes.postPlateau, data);

    this.setState({
      data: result.data.data
    });
  };

  render() {
    const { data, actualRover } = this.state;

    console.log(actualRover)
    return (
      <div className="App">
        <section>
          <DetailsWrapper
            submitData={this.postPlateau}
            {...detailsWrapperText}
          />
          {data && (
            <Plateau
              width={data.size.width}
              height={data.size.height}
              rover={actualRover}
            />
          )}
        </section>
      </div>
    );
  }
}

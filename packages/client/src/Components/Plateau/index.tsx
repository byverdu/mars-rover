import React from 'react';
import './Plateau.scss';
import PlateauSquare from '../PlateauSquare';

function gridBuilder(width, height) {
  const wrapper = []
  function rowBuilder(newHeight) {
      for (let i = 0; i < width; i += 1) {
        const axis = `x${i}:y${(height - newHeight)}`

        wrapper.push(
          <PlateauSquare
            key={axis}
            axis={axis}
            empty={true}
          />
        );
      }
  }
  let counter = 1;
  while (counter <= width) {
      rowBuilder(counter)
      counter += 1;
  }

  return wrapper;
}

export interface PlateauProps {
  width: number;
  height: number;
}

const Plateau: React.FC<PlateauProps> = ({width, height}) => (
  <section className="plateau">
    {gridBuilder(width, height)}
  </section>
);

export default Plateau

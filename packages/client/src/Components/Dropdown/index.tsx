import React, { useState } from 'react';
import './Dropdown.scss';
import { EnumCardinalPoints } from '../../Models/enums';

const classnames = require('classnames');

export interface DropdownProps {
  width: number;
  height: number;
  setRoverPosition: (value: string) => void;
}

function selectedElement(selector): HTMLElement {
  return Array.from(document.querySelectorAll(selector)).find(
    (item: HTMLElement) => item.className.includes('selected')
  );
}

function getTextSiblingSelected(selector): string {
  const selectedElement = document.querySelector(selector);
  return selectedElement ? selectedElement.textContent : '';
}

function coordsBuilder(width, height, setRoverPosition) {
  const wrapper = [];
  function spanBuilder(newHeight) {
    for (let i = 0; i < width; i += 1) {
      wrapper.push(
        <span
          key={`${i}-${height - newHeight}`}
          className="item-coords"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            const alreadySelected = selectedElement('.coords .item-coords');

            if (alreadySelected) {
              alreadySelected.classList.remove('selected');
            }

            const element = e.target as HTMLElement;
            const siblingText = getTextSiblingSelected(
              '.item-cardinals.selected'
            );
            element.classList.add('selected');

            setRoverPosition(`${element.textContent} ${siblingText}`);
          }}
        >
          {i} {height - newHeight}
        </span>
      );
    }
  }
  let counter = 1;
  while (counter <= height) {
    spanBuilder(counter);
    counter += 1;
  }

  return wrapper;
}

function cardinalPointsBuilder(setRoverPosition) {
  return [
    EnumCardinalPoints.N,
    EnumCardinalPoints.S,
    EnumCardinalPoints.E,
    EnumCardinalPoints.W
  ].map((cardinal) => (
    <span
      key={cardinal}
      className="item-cardinals"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const alreadySelected = selectedElement('.cardinals .item-cardinals');
        if (alreadySelected) {
          alreadySelected.classList.remove('selected');
        }
        const element = e.target as HTMLElement;
        const siblingText = getTextSiblingSelected('.item-coords.selected');

        element.classList.add('selected');
        setRoverPosition(`${siblingText} ${element.textContent}`);
      }}
    >
      {cardinal}
    </span>
  ));
}

const CoordsDropdown: React.FC<DropdownProps> = ({
  width,
  height,
  setRoverPosition
}) => {
  const [visibility, setVisibility] = useState(true);
  const itemsClassnames = classnames('items', {
    show: visibility,
    hide: !visibility
  });
  const onWrapperClick = () => setVisibility(!visibility);

  return (
    <div className="wrapper">
      <h5 onClick={onWrapperClick}>Set Rover Coords</h5>
      <div className={itemsClassnames}>
        <div className="coords" style={{ width: `${width * 100}px` }}>
          {coordsBuilder(width, height, setRoverPosition)}
        </div>
        <div className="cardinals">
          {cardinalPointsBuilder(setRoverPosition)}
        </div>
      </div>
    </div>
  );
};

export default CoordsDropdown;

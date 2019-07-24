import React from 'react';
import './DetailsInput.scss';

export interface DetailsInputProps {
  title: string;
}

const DetailsInput: React.FC<DetailsInputProps> = ({title, children}) => (
  <details>
    <summary>{title}</summary>
    <div className="details-wrapper">
    <div className="details-styling">
      {children}
    </div>
    </div>
  </details>
);

export default DetailsInput

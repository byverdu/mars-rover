#!/bin/bash

componentName=$1

mkdir src/Components/$componentName
touch src/Components/$componentName/$componentName.scss

# Create tsx file with mimimal structure
echo "import React from 'react';
import './"$componentName".scss';

export interface "$componentName"Props {}

const "$componentName": React.FC<"$componentName"Props> = () => (<div></div>);

export default "$componentName"" >> src/Components/$componentName/index.tsx

# Create test file with mimimal structure
echo "import React from 'react';
import "$componentName", { "$componentName"Props } from './index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: "$componentName"Props = {

};

describe('<"$componentName" />', () => {
  const wrapper = mount(<"$componentName" {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should a title props', () => {
    expect((wrapper.props() as "$componentName"Props).title).toEqual();
  });
});" >> src/Components/$componentName/$componentName.test.tsx
import React from 'react';
import Calculator from '../app/components/Calculator.js';

export default {
  title: 'Calculator',
  component: Calculator,
};

const Template = (args) => <Calculator {...args} />;

export const Default = Template.bind({});
Default.args = {
};

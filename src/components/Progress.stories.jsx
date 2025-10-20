import React from 'react';
import { Progress } from './Progress';
import { ProgressEnum } from '../enums/ProgressEnum';
import PropTypes from 'prop-types';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Visualiza el progreso en forma de barras utilizando MeterGroup de PrimeReact.',
      },
    },
  },
  argTypes: {
    level: {
      control: { type: 'number', min: 0, max: 100, step: 25 },
      description: 'Nivel de progreso que se quiere mostrar.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
  },
};

const Template = (args) => <Progress {...args} />;

export const New = Template.bind({});
New.args = {
  level: ProgressEnum.NEW.value,
};

export const Beginner = Template.bind({});
Beginner.args = {
  level: ProgressEnum.BEGINNER.value,
};

export const Intermediate = Template.bind({});
Intermediate.args = {
  level: ProgressEnum.INTERMEDIATE.value,
};

export const Advanced = Template.bind({});
Advanced.args = {
  level: ProgressEnum.ADVANCED.value,
};

export const Fluent = Template.bind({});
Fluent.args = {
  level: ProgressEnum.FLUENT.value,
};
Progress.propTypes = {
   level: PropTypes.object,
 };
import React from 'react';
import { Player } from './Player';
import PropTypes from 'prop-types';

export default {
  title: 'Components/Player',
  component: Player,
  tags: ['autodocs'], // Requiere Storybook 7+
  parameters: {
    docs: {
      description: {
        component: 'Reproductor de videos embebidos de YouTube dentro de un Panel de PrimeReact.',
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'URL embebida del video de YouTube (formato https://www.youtube.com/embed/...).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

const Template = (args) => <Player {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
};

export const Empty = Template.bind({});
Empty.args = {
  url: '',
};

Player.propTypes = {

 url: PropTypes.string
}
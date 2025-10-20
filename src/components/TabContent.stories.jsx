// TabContent.stories.jsx
import React from 'react';
import { TabContent } from './TabContent';

const MockTabService = {
  getTabData: (url) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Mocked data from URL: ${url}`);
    }, 800);
  })
};

export default {
  title: 'Components/TabContent',
  component: TabContent,
  tags: ['autodocs'],
  argTypes: {
    tabUrl: { control: 'text' },
    name: { control: 'text' },
    comment: { control: 'text' },
  },
};

const Template = (args) => <TabContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabUrl: '/api/fake/data',
  name: 'Demo Tab',
  comment: 'Este es un comentario inline.',
  tabService: MockTabService, 
};

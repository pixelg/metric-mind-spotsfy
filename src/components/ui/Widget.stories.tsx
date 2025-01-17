import type { Meta, StoryObj } from '@storybook/react';

import Widget from './Widget';

const meta = {
  title: 'UI/Widget',
  component: Widget,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // args: { onClick: fn() },
} satisfies Meta<typeof Widget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'My Widget'
  }
};
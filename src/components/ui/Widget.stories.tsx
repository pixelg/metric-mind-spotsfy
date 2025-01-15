import type { Meta, StoryObj } from '@storybook/react';

import Widget from './Widget';

const meta = {
  component: Widget,
} satisfies Meta<typeof Widget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'My Widget'
  }
};
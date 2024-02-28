import type { Meta, StoryObj } from '@storybook/react';
import BodyCompForm from './BodyCompForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/BodyCompForm',
  component: BodyCompForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof BodyCompForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        userMetrics: {
                weight: 150,
                heightFeet: 6,
                heightInches: 1,
                gender: 'male',
        },
        widmarkFactor: 0,
        ethanol: 0,
        ethanolInDrinkForm: false,
    },
};
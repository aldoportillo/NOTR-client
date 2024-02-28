import type { Meta, StoryObj } from '@storybook/react';

import DilutionResults from './DilutionResults';

const meta = {
  title: 'Components/DilutionResults',
  component: DilutionResults,
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
} satisfies Meta<typeof DilutionResults>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Margarita: Story = {
  args: {
    cocktailAttributes: {
        "dilution": 0.24,
        "finalVolume": 5.89,
        "abv": 0.16977928692699493,
        "sugarConcentration": 5.4244482173174875,
        "acid": 0.7640067911714771,
        "sugarAcid": 7.1000000000000005
    },
  },
};

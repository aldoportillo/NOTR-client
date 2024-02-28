import type { Meta, StoryObj } from '@storybook/react';

import NutritionLabel from './NutritionLabel';

const meta = {
  title: 'Components/NutritionLabel',
  component: NutritionLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NutritionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      calories: 200,
      ethanol: 14,
      fat: 0,
      carb: 22,
      sugar: 18,
      addedSugar: 15,
      protein: 0,
    },
  },
};

export const HighCalories: Story = {
  args: {
    item: {
      calories: 350,
      ethanol: 20,
      fat: 0,
      carb: 40,
      sugar: 35,
      addedSugar: 30,
      protein: 0,
    },
  },
};

export const LowCalories: Story = {
  args: {
    item: {
      calories: 100,
      ethanol: 10,
      fat: 0,
      carb: 10,
      sugar: 8,
      addedSugar: 5,
      protein: 0,
    },
  },
};

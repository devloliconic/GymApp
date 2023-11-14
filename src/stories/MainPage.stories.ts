import type { Meta, StoryObj } from "@storybook/react";

import "@/styles/global.scss";
import { MainPage } from "@/pages/MainPage";

const meta = {
  title: "GYM/Pages",
  component: MainPage,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {};

import { Spin } from "antd";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "@/config/i18n/i18n";

import "@/styles/global.scss";
import "@/api/instanse";

import App from "./App.tsx";
import { useGetMe } from "./api/queries/me.ts";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const a = async () => {
  root.render(<Spin />);

  await useGetMe.prefetch();
};

a().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

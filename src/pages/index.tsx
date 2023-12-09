import { Navigate, Route, Routes } from "react-router-dom";

import { useGetMe } from "@/api/queries/me";
import { pageRoutes } from "@/config/pageRoutes";

import { CoachesPage } from "./CoachesPage";
import { GymPage } from "./GymPage";
import { GymsPage } from "./GymsPage";
import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";
import { SignUpPage } from "./SignUpPage";
import { TicketsPage } from "./TicketsPage";
import { UserPage } from "./UserPage";

const Authorized = () => {
  return (
    <Routes>
      <Route path={pageRoutes.main} element={<MainPage />} />
      <Route path={pageRoutes.login} element={<LoginPage />} />
      <Route path={pageRoutes.signUp} element={<SignUpPage />} />
      <Route path={pageRoutes.account} element={<UserPage />} />
      <Route path={pageRoutes.coaches} element={<CoachesPage />} />
      <Route path={pageRoutes.tickets} element={<TicketsPage />} />
      <Route path={pageRoutes.addresses} element={<GymsPage />} />
      <Route path={pageRoutes.gym} element={<GymPage />} />
      <Route path="*" element={<Navigate to={pageRoutes.main} />} />
    </Routes>
  );
};

const Unauthorized = () => {
  return (
    <Routes>
      <Route path={pageRoutes.main} element={<MainPage />} />
      <Route path={pageRoutes.login} element={<LoginPage />} />
      <Route path={pageRoutes.signUp} element={<SignUpPage />} />
      <Route path={pageRoutes.coaches} element={<CoachesPage />} />
      <Route path={pageRoutes.tickets} element={<TicketsPage />} />
      <Route path={pageRoutes.addresses} element={<GymsPage />} />
      <Route path="*" element={<Navigate to={pageRoutes.main} />} />
    </Routes>
  );
};

export const Pages = () => {
  const { data: user } = useGetMe();

  return user ? <Authorized /> : <Unauthorized />;
};

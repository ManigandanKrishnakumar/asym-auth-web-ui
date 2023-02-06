import { Route, Routes } from "react-router-dom";
import { Home, ProtectedPage } from "../pages";

export const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/protected-page" element={<ProtectedPage />} />
    </Routes>
  );
};

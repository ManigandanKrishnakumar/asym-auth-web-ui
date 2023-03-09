import { Route, Routes } from "react-router-dom";
import { Home, ProtectedPage, TestFunctionality, SignIn } from "../pages";

export const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/protected-page" element={<ProtectedPage />} />
      <Route path="/test-functionality" element={<TestFunctionality />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

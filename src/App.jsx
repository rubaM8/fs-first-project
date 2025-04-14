import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";
import { useColorModeValue } from "@chakra-ui/react";
import LoginPage from "./pages/loginPage";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/create" element={<CreatePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </Box>
  );
}

export default App;
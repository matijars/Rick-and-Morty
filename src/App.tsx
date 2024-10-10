import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Header from "./components/Header";
import Characters from "./components/pages/Characters";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./components/PrivateRoute";
import CharacterDetail from "./components/pages/CharacterDetail";
import Episode from "./components/pages/Episode";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/characters"
            element={
              <PrivateRoute>
                <Characters />
              </PrivateRoute>
            }
          />
          <Route
            path="/characters/:id"
            element={
              <PrivateRoute>
                <CharacterDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/episode/:id"
            element={
              <PrivateRoute>
                <Episode />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

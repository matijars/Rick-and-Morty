import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Header from "./components/Header";
import Characters from "./components/Characters";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
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
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("authToken");

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

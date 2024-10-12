import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/characters");
    }
  }, [navigate]);
};

export default useRedirectIfLoggedIn;

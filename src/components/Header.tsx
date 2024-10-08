import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      {token && (
        <header className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/characters" className="hover:text-gray-200">
                Characters
              </Link>
            </h1>
            <button onClick={handleLogout} className="bg-red-600 p-2 rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;

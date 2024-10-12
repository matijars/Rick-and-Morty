import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {token && (
        <div className="px-7 pt-5 mx-[5%]">
          <header className="flex justify-between bg-gradient-to-r rounded from-blue-900 to-blue-500 text-white p-4 shadow-lg shadow-black/30">
            <h1 className="text-2xl font-bold">
              <Link
                to="/characters"
                className="hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Characters
              </Link>
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1.5 text-sm rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Log out
            </button>
          </header>
        </div>
      )}
    </>
  );
};

export default Header;

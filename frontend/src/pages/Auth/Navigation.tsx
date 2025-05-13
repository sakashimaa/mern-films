import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-800 w-[32rem] px-6 py-4 rounded-xl shadow-lg">
      <section className="flex justify-between items-center">
        {/* Section 1 - Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center group transition-all duration-200 hover:text-blue-400"
          >
            <AiOutlineHome
              className="text-gray-300 group-hover:text-blue-400"
              size={24}
            />
            <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-blue-400">
              Home
            </span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center group transition-all duration-200 hover:text-blue-400"
          >
            <MdOutlineLocalMovies
              className="text-gray-300 group-hover:text-blue-400"
              size={24}
            />
            <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-blue-400">
              Movies
            </span>
          </Link>
        </div>

        {/* Section 2 - User Actions */}
        <div className="relative">
          {userInfo ? (
            <div className="flex items-center">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-200 focus:outline-none hover:text-blue-400 transition-colors"
              >
                <span className="text-sm font-medium">{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2">
                  {userInfo.isAdmin && (
                    <li>
                      <Link
                        to="/admin/movies/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center group transition-all duration-200 hover:text-blue-400"
              >
                <AiOutlineLogin
                  className="text-gray-300 group-hover:text-blue-400"
                  size={24}
                />
                <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-blue-400">
                  Login
                </span>
              </Link>
              <Link
                to="/register"
                className="flex items-center group transition-all duration-200 hover:text-blue-400"
              >
                <AiOutlineUserAdd
                  className="text-gray-300 group-hover:text-blue-400"
                  size={24}
                />
                <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-blue-400">
                  Register
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;

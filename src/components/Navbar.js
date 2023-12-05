import { NavLink, Outlet } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext"; // replace with your actual path
import logo from "../amazon.png";

export function Navbar() {
  const { currentUser, signOut } = useAuthValue();

  return (
    <>
      <div className="bg-gradient-to-r from-green-800 via-brown-500 to-green-800 w-9/10 h-20 flex justify-between items-center px-5 text-lg font-medium sticky top-0 z-50 text-white">
        <div className="hover:text-white flex">
          <img src={logo} className="w-10 h-10 mr-2" alt="logo" />
          <NavLink to="/" className="font-bold text-3xl text-[#F5F5DC]">
            Buy Busy
          </NavLink>
        </div>
        <div className="flex float-right">
          <NavLink to="/">
            <span className="mx-2 cursor-pointer text-[#F5F5DC]">
              <i className="fas fa-home"></i>
              Home
            </span>
          </NavLink>
          {currentUser && (
            <NavLink to="/myorder">
              <span className="mx-2 cursor-pointer text-[#F5F5DC]">
                <i className="fas fa-shopping-bag"></i>
                My Order
              </span>
            </NavLink>
          )}
          {currentUser && (
            <NavLink to="/cart">
              <span className="mx-2 cursor-pointer text-[#F5F5DC]">
                <i className="fas fa-shopping-cart"></i>
                Cart
              </span>
            </NavLink>
          )}
          <NavLink to={!currentUser ? "/signIn" : "/"}>
            <span
              className="mx-2 cursor-pointer text-[#F5F5DC]"
              onClick={!currentUser ? null : signOut}
            >
              {!currentUser ? (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  SignIn
                </>
              ) : (
                <>
                  <i className="fas fa-sign-out-alt"></i>
                  SignOut
                </>
              )}
            </span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
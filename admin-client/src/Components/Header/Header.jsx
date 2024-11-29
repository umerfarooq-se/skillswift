import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Assets/skillswiftLogo.svg";
import {
  adminSignOutAction,
  clearErrors,
  loadCurrentAdminAction,
} from "../Redux/Actions/Actions";
import Skeleton from "react-loading-skeleton";
import { handleShowFailureToast } from "../ToastMessages/ToastMessage";
const Header = () => {
  const [showing, setShowing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isShowingOptions, setShowingOptions] = useState(false);
  const toggleSidebar = () => {
    setShowing((prevShowing) => {
      const newShowing = !prevShowing;
      document.body.classList.toggle("no-scroll", newShowing);
      return newShowing;
    });
  };
  const { adminLoading, adminData } = useSelector(
    (state) => state.loadCurrentAdminReducer
  );
  const { signOutLoading, signOutError, signOutMessage } = useSelector(
    (state) => state.adminSignOutReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentAdminAction());
  }, [dispatch]);
  useEffect(() => {
    if (!signOutLoading && signOutError) {
      handleShowFailureToast(signOutError);
    } else if (!signOutLoading && signOutMessage) {
      const encodedMessage = encodeURIComponent(signOutMessage);
      window.location.href = `/sign-in?message=${encodedMessage}`;
    }
  }, [dispatch, signOutError, signOutLoading, signOutMessage, navigate]);
  const handleSignOut = () => {
    dispatch(clearErrors());
    dispatch(adminSignOutAction());
  };

  return (
    <>
      <div
        className="header-container h-[100px] lg:h-[200px] w-full"
        onClick={() => {
          if (isShowingOptions) setShowingOptions(false);
        }}
      >
        <div className="w-full flex items-end flex-wrap lg:h-[50%] h-[80%]">
          <div className="logo w-full items-center lg:w-7/12 flex lg:justify-end justify-between">
            <div className="menu-bar lg:hidden flex items-center px-10">
              <img
                src={require("../../Assets/menu-bar-icon.png")}
                alt=""
                className="w-10 h-10 cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
            <div className="mr-10 lg:mr-28 flex lg:justify-center justify-end items-center">
              <img src={Logo} alt="" className="w-20 h-20" />
            </div>
          </div>
          <div className="logo-left hidden lg:w-5/12 lg:flex justify-end">
            <div className="image">
              {adminLoading ? (
                <div>
                  <Skeleton width={100} height={50} circle={true} />
                </div>
              ) : (
                <div>
                  <div className="p-[2px] border-[1px] border-solid border-slate-600 rounded-full mr-6 relative">
                    <img
                      src={adminData?.adminAvatar}
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />
                    <img
                      src={require("../../Assets/admin-down-arrow.png")}
                      alt=""
                      onClick={() => setShowingOptions(!isShowingOptions)}
                      className={`${
                        isShowingOptions ? "rotate-180" : ""
                      } w-5 h-5 absolute top-1 right-1 invert cursor-pointer transition-transform ease-in-out duration-700`}
                    />
                  </div>
                  {isShowingOptions ? (
                    <div className="relative">
                      <div className="w-40 h-28 bg-slate-600 absolute top-2 right-4 rounded-lg flex flex-col justify-center items-center gap-3">
                        <button
                          className="bg-white w-[80%] h-9 rounded-lg"
                          onClick={() => {
                            navigate("/sign-in");
                          }}
                        >
                          LOGIN
                        </button>
                        <button
                          className="bg-white w-[80%] h-9 rounded-lg"
                          onClick={handleSignOut}
                        >
                          SignOut
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="nav-bar hidden lg:flex justify-center gap-10 font-extralight text-xl mt-4">
          <div
            className={`${
              location.pathname === "/"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/"}>DISPUTES</Link>
          </div>
          <div
            className={`${
              location.pathname === "/refund"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/refund"}>REFUNDS</Link>
          </div>
          <div
            className={`${
              location.pathname === "/order"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/order"}>ORDERS</Link>
          </div>
          <div
            className={`${
              location.pathname === "/accounts"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/accounts"}>ACCOUNTS</Link>
          </div>
        </div>
      </div>
      {showing && (
        <div
          className={`mobile-screen-container w-full h-screen bg-slate-800 absolute top-0 left-0 block lg:hidden z-20 ${
            showing ? "showing" : ""
          }`}
        >
          <div className="cross w-full flex justify-end py-3 px-5 mt-5">
            <div className="w-10 h-10">
              <img
                src={require("../../Assets/close.png")}
                alt=""
                className="w-full h-full invert cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
          </div>
          <div className="mobile-screen-navbar-container flex flex-col justify-evenly">
            <div
              className={`${
                location.pathname === "/" ? "text-[#4e97fd]" : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link to={"/"} className="text-3xl font-light">
                DISPUTE
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div
              className={`${
                location.pathname === "/refund"
                  ? "text-[#4e97fd]"
                  : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link to={"/refund"} className=" font-extralight text-3xl">
                REFUNDS
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div
              className={`${
                location.pathname === "/order" ? "text-[#4e97fd]" : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link to={"/order"} className="text-3xl font-extralight">
                ORDERS
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div
              className={`${
                location.pathname === "/accounts"
                  ? "text-[#4e97fd]"
                  : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link to={"/accounts"} className="text-3xl font-extralight">
                ACCOUNTS
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div
              className={`text-white nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
              onClick={handleSignOut}
            >
              <span className="text-3xl font-extralight">LOGOUT</span>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, signInAction } from "../Redux/Actions/Actions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../ToastMessages/ToastMessage.js";
import LoaderCircles from "../Loader/LoaderCircles";

// Validation schema
const validationSchema = Yup.object({
  adminEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  adminPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const [eyeToggler, setEyeToggler] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const toastMessage = query.get("message");
  const hasToastShown = useRef(false);
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.signInReducer
  );

  const handleSubmit = async (values) => {
    dispatch(clearErrors());
    dispatch(signInAction(values));
  };

  const formik = useFormik({
    initialValues: {
      adminEmail: "",
      adminPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        handleShowFailureToast(error);
      } else if (message) {
        const encodedMessage = encodeURIComponent(message);
        window.location.href = `/?message=${encodedMessage}`;
      }
    }
  }, [loading, error, message, navigate]);

  useEffect(() => {
    if (toastMessage && !hasToastShown.current) {
      hasToastShown.current = true;
      handleShowSuccessToast(toastMessage);
    }
  }, [toastMessage]);

  const eyeTogglerHandler = () => {
    setEyeToggler((prevState) => !prevState);
    passwordRef.current.type = eyeToggler ? "password" : "text";
  };

  return (
    <>
      <Toaster />
      <div className="sign-in-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">Sign in</h1>
            <form
              onSubmit={formik.handleSubmit}
              className="sign-in-form bg-white w-full h-full"
            >
              <div className="email">
                <label htmlFor="adminEmail">Your email</label>
                <br />
                <input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={formik.values.adminEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.adminEmail && formik.errors.adminEmail
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
                {formik.touched.adminEmail && formik.errors.adminEmail && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.adminEmail}
                  </div>
                )}
              </div>
              <div className="password mt-5 relative">
                <label htmlFor="adminPassword">Password</label>
                <br />
                <input
                  type={eyeToggler ? "text" : "password"}
                  id="adminPassword"
                  name="adminPassword"
                  value={formik.values.adminPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={passwordRef}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl pr-12 ${
                    formik.touched.adminPassword && formik.errors.adminPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                {formik.touched.adminPassword &&
                  formik.errors.adminPassword && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.adminPassword}
                    </div>
                  )}
                <img
                  src={
                    eyeToggler
                      ? require("../../Assets/hiddenEye.png")
                      : require("../../Assets/eye.png")
                  }
                  alt=""
                  className="absolute top-11 right-5 w-5 h-5 cursor-pointer"
                  onClick={eyeTogglerHandler}
                />
              </div>
              <div className="mt-5 flex justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <h1 className="font-extralight">Remember me</h1>
                </div>
                <h1
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </h1>
              </div>
              <div className="mt-8">
                {loading ? (
                  <div className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../Assets/SignInIllustrator.jpg")}
            alt=""
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;

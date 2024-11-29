import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useEffect } from "react";
import LoaderCircles from "../Loader/LoaderCircles";
import { Toaster } from "react-hot-toast";
import { handleShowFailureToast } from "../ToastMessages/ToastMessage";
import { clearErrors, resetPasswordAction } from "../Redux/Actions/Actions";

// Validation schema
const validationSchema = Yup.object({
  adminEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.resetPasswordReducer
  );
  const handeleSubmit = async (values) => {
    dispatch(clearErrors());
    dispatch(resetPasswordAction(values));
  };

  const formik = useFormik({
    initialValues: {
      adminEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: handeleSubmit,
  });
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
        handleShowFailureToast(error);
      } else if (message) {
        console.log(message);
        navigate("/send-email", { state: { message } });
      }
    }
  }, [message, loading, error, navigate]);
  return (
    <>
      <Toaster />
      <div className="sign-in-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Forgot Password
              </h1>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="sign-in-form bg-white w-full h-full"
            >
              <div className="email">
                <label htmlFor="email">Your email</label> <br />
                <input
                  type="email"
                  id="email"
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
                {formik.touched.adminEmail && formik.errors.adminEmail ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.adminEmail}
                  </div>
                ) : null}
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
                    Send Email
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../Assets/forgotPass.jpg")}
            alt=""
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

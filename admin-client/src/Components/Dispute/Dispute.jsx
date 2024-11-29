import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../ToastMessages/ToastMessage.js";
import { Toaster } from "react-hot-toast";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  approveDisputeAction,
  loadDisputesAction,
  rejectDisputeAction,
} from "../Redux/Actions/Actions.js";
import RingLoader from "../Loader/RingLoader.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoaderCircles from "../Loader/LoaderCircles";
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const toastMessage = query.get("message");
  const hasToastShown = useRef(false);
  const dispatch = useDispatch();
  const [rejectId, setRejectId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const formik = useFormik({
    initialValues: {
      disputeResolution: "",
    },
    validationSchema: Yup.object().shape({
      disputeResolution: Yup.string().required("Resolution is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (approveId) {
        dispatch(approveDisputeAction(approveId, values));
        formik.resetForm();
      } else if (rejectId) {
        dispatch(rejectDisputeAction(rejectId, values));
        formik.resetForm();
      }
    },
  });
  const { disputeLoader, disputes } = useSelector(
    (state) => state.loadDisputesReducer
  );
  const { approveLoading, approveError, approveMessage } = useSelector(
    (state) => state.approveDisputeReducer
  );
  const { rejectLoading, rejectError, rejectMessage } = useSelector(
    (state) => state.rejectDisputeReducer
  );
  useEffect(() => {
    if (!hasToastShown.current && toastMessage) {
      hasToastShown.current = true;
      handleShowSuccessToast(toastMessage);
      navigate(location.pathname, { state: { message: null } });
    }
  }, [location.pathname, toastMessage, hasToastShown, navigate]);
  useEffect(() => {
    dispatch(loadDisputesAction());
  }, [dispatch]);
  useEffect(() => {
    if (approveError) {
      handleShowFailureToast(approveError);
      setApproveId(null);
      setRejectId(null);
    } else if (approveMessage) {
      handleShowSuccessToast(approveMessage);
      setApproveId(null);
      setRejectId(null);
      dispatch(loadDisputesAction());
    }
  }, [approveError, approveMessage, dispatch]);
  useEffect(() => {
    if (rejectError) {
      handleShowFailureToast(rejectError);
      setApproveId(null);
      setRejectId(null);
    } else if (rejectMessage) {
      handleShowSuccessToast(rejectMessage);
      dispatch(loadDisputesAction());
      setApproveId(null);
      setRejectId(null);
    }
  }, [rejectError, rejectMessage, dispatch]);
  return (
    <>
      <Toaster />
      <div className="home-container">
        <div className="header">
          <Header />
        </div>
        <div>
          <div className="home-container flex justify-center">
            <div className="sub-home-container w-10/12">
              <h1 className="text-lg lg:xl xl:text-4xl font-bold text-[#4e97fd]">
                Dispute Management
              </h1>
              <div className="dispute-container flex justify-center my-5">
                <div className="dispute-sub-container w-full lg:w-10/12 xl:w-8/12 flex flex-wrap gap-5">
                  {disputeLoader && (
                    <div>
                      <RingLoader />
                    </div>
                  )}
                  {!disputeLoader && disputes?.length > 0 ? (
                    disputes?.map(
                      (dispute) =>
                        !dispute?.disputeResolution && (
                          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 w-full lg:6/12 xl:w-4/12">
                            <h2 className="text-lg xl:text-xl font-semibold mb-4">
                              {dispute?.disputeTitle}
                            </h2>
                            <p className="text-gray-600 mb-2">
                              <span className="font-medium">Reason:</span>{" "}
                              {dispute?.disputeDetails}
                            </p>
                            <div className="mt-4">
                              <h3 className="text-lg font-medium mb-2">
                                Customer Details
                              </h3>
                              <p className="text-gray-600">
                                <span className="font-medium">Name:</span>{" "}
                                {dispute?.disputeFiledBy?.consumerFullName}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {dispute?.disputeFiledBy?.consumerEmail}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Phone:</span>{" "}
                                {dispute?.disputeFiledBy?.consumerPhoneNumber}
                              </p>
                            </div>
                            <div className="mt-4">
                              <h3 className="text-lg font-medium mb-2">
                                Service Provider Details
                              </h3>
                              <p className="text-gray-600">
                                <span className="font-medium">Name:</span>{" "}
                                {
                                  dispute?.disputeFiledAgainst
                                    ?.serviceProviderFullName
                                }
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {
                                  dispute?.disputeFiledAgainst
                                    ?.serviceProviderEmail
                                }
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Phone:</span>{" "}
                                {
                                  dispute?.disputeFiledAgainst
                                    ?.serviceProviderPhoneNumber
                                }
                              </p>
                            </div>
                            <div className="mt-6 flex justify-between">
                              <button
                                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300 w-5/12"
                                onClick={() => {
                                  setRejectId(dispute?._id);
                                }}
                              >
                                Reject
                              </button>
                              <button
                                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 w-5/12"
                                onClick={() => {
                                  setApproveId(dispute?._id);
                                }}
                              >
                                Approve
                              </button>
                            </div>
                          </div>
                        )
                    )
                  ) : (
                    <div>
                      <h1>No disputes in database.</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {(approveId || rejectId) && (
              <div className="w-[90%] lg:w-[70%] xl:w-[50%] bg-[#0b0b0b] absolute top-[20%] right-[5%] lg:right-[15%] xl:right-[25%] rounded-lg">
                <form
                  className="w-full flex flex-col items-center p-4 lg:p-6 xl:p-10"
                  onSubmit={formik.handleSubmit}
                >
                  <textarea
                    className="w-[96%] lg:w-[90%] xl:w-[80%] p-4 bg-transparent border-[0.5px] outline-none border-white text-white"
                    rows={10}
                    name="disputeResolution"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.disputeResolution}
                    placeholder="Enter your resolution message here ..."
                  ></textarea>
                  {formik.touched.disputeResolution &&
                    formik.errors.disputeResolution && (
                      <p className="text-red-500">
                        {formik.errors.disputeResolution}
                      </p>
                    )}
                  <div className="button flex justify-end my-4 w-[96%] lg:w-[90%] xl:w-[80%]">
                    {approveLoading || rejectLoading ? (
                      <div className="bg-slate-600 text-white px-6 lg:px-8 xl:px-10 py-2 rounded-lg flex justify-center items-center">
                        <LoaderCircles />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="bg-slate-600 text-white px-6 lg:px-8 xl:px-10 py-2 rounded-lg"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadRefundsAction,
  rejectRefundAction,
  resolveRefundAction,
} from "../Redux/Actions/Actions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../ToastMessages/ToastMessage";
import LoaderCircles from "../Loader/LoaderCircles";
import { Toaster } from "react-hot-toast";
const Refund = () => {
  const dispatch = useDispatch();
  const { refundLoading, refunds } = useSelector(
    (state) => state.loadRefundsReducer
  );
  const { resolveLoading, resolveError, resolveMessage } = useSelector(
    (state) => state.resolveRefundReducer
  );
  const { rejectLoading, rejectError, rejectMessage } = useSelector(
    (state) => state.rejectRefundReducer
  );
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadRefundsAction());
  }, [dispatch]);
  useEffect(() => {
    if (!resolveLoading && resolveError) {
      handleShowFailureToast(resolveError);
    } else if (!resolveLoading && resolveMessage) {
      handleShowSuccessToast(resolveMessage);
      dispatch(loadRefundsAction());
    }
  }, [dispatch, resolveError, resolveMessage, resolveLoading]);
  useEffect(() => {
    if (!rejectLoading && rejectError) {
      handleShowFailureToast(rejectError);
    } else if (rejectMessage) {
      handleShowSuccessToast(rejectMessage);
      dispatch(loadRefundsAction());
    }
  }, [dispatch, rejectError, rejectMessage, rejectLoading]);
  const resolveRefundHandler = (id) => {
    dispatch(resolveRefundAction(id));
  };
  const rejectRefundHandler = (id) => {
    dispatch(rejectRefundAction(id));
  };

  return (
    <>
      <Toaster />
      <div className="refund-container">
        <div className="header">
          <Header />
        </div>
        <div className="flex w-full justify-center">
          <div className="refund-container w-11/12 lg:w-10/12 xl:w-8/12">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4e97fd]">
              Refund Management
            </h1>
            <div className="refunds flex flex-wrap gap-4">
              {refundLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="spinner-border" role="status">
                    <span className="sr-only text-black">loading ...</span>
                  </div>
                </div>
              ) : refunds?.length === 0 ? (
                <div>
                  <h1>No refunds in database</h1>
                </div>
              ) : (
                refunds?.map((refund) => (
                  <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 w-full  lg:w-8/12 xl:w-4/12 my-4">
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">
                        Refund Requested By
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span>{" "}
                        {refund?.refundRequestedBy?.consumerFullName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span>{" "}
                        {refund?.refundRequestedBy?.consumerEmail}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span>{" "}
                        {refund?.refundRequestedBy?.consumerPhoneNumber}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">
                        Refund Requested Against
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span>{" "}
                        {
                          refund?.refundRequestedAgainst
                            ?.serviceProviderFullName
                        }
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span>{" "}
                        {refund?.refundRequestedAgainst?.serviceProviderEmail}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span>{" "}
                        {
                          refund?.refundRequestedAgainst
                            ?.serviceProviderPhoneNumber
                        }
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Refund Details
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Refund Amount:</span>{" "}
                        {"Rs " +
                          (refund?.order?.servicePost?.servicePostPrice *
                            refund?.refundAmountPercentage) /
                            100 +
                          " Partial Amount"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Refund Reason:</span>{" "}
                        {refund?.refundDetails}
                      </p>
                      <h1 className="py-2 px-4 rounded-3xl text-white bg-green-600 inline-block mt-5">
                        {refund?.refundAmountStatus}
                      </h1>
                    </div>
                    {resolveLoading || rejectLoading ? (
                      <div className="mt-6 flex justify-between">
                        <div className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300 w-5/12">
                          <LoaderCircles />
                        </div>
                        <div className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 w-5/12">
                          <LoaderCircles />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 flex justify-between">
                        <button
                          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300 w-5/12"
                          aria-label="Reject refund"
                          onClick={() => rejectRefundHandler(refund?._id)}
                        >
                          Reject
                        </button>
                        <button
                          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 w-5/12"
                          aria-label="Approve refund"
                          onClick={() => resolveRefundHandler(refund?._id)}
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Refund;

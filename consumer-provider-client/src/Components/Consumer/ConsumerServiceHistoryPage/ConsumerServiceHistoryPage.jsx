import React, { useState, useRef, useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  consumerAddRatingAction,
  consumerRejectOrderAction,
  loadOrdersAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";
import { useLocation } from "react-router-dom";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import LoaderCircles from "../../Loader/LoaderCircles";
import { useNavigate } from "react-router-dom";

const ServiceHistoryPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [rating, setRating] = useState(1);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector(
    (state) => state.loadOrdersReducer
  );
  let navigateMessage =
    new URLSearchParams(location.search).get("message") || "";
  if (navigateMessage) {
    navigateMessage = decodeURIComponent(navigateMessage);
  }

  const navigateToastMessageRef = useRef(false);
  const { rejectLoading, rejectError, rejectMessage } = useSelector(
    (state) => state.consumerRejectOrderReducer
  );
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadOrdersAction());
  }, [dispatch]);
  const handleCancel = (serviceId) => {
    dispatch(consumerRejectOrderAction(serviceId));
  };

  const handleReview = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowReviewModal(true);
  };
  const { ratingLoading, ratingError, ratingMessage } = useSelector(
    (state) => state.consumerAddRatingReducer
  );
  const submitReview = () => {
    dispatch(clearErrors());
    dispatch(
      consumerAddRatingAction(selectedServiceId, { ratingStars: rating })
    );
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowReviewModal(false);
    }
  };

  useEffect(() => {
    if (showReviewModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showReviewModal]);
  const toastMessageShown = useRef(false);
  useEffect(() => {
    if (!loading && error && !toastMessageShown.current) {
      toastMessageShown.current = true;
    }
  }, [loading, error, toastMessageShown]);
  useEffect(() => {
    if (navigateMessage && !navigateToastMessageRef.current) {
      navigateToastMessageRef.current = true;
      handleShowSuccessToast(navigateMessage);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("message");
      window.history.replaceState({}, "", newUrl);
    }
  }, [navigateMessage, navigateToastMessageRef]);

  useEffect(() => {
    if (!rejectLoading && rejectError) {
      handleShowFailureToast(rejectError);
      dispatch(clearErrors());
    } else if (!rejectLoading && rejectMessage) {
      handleShowSuccessToast(rejectMessage);
      dispatch(clearErrors());
      dispatch(loadOrdersAction());
    }
  }, [rejectMessage, rejectError, rejectLoading, dispatch]);
  useEffect(() => {
    if (!ratingLoading && ratingError) {
      handleShowFailureToast(ratingError);
      dispatch(clearErrors());
    } else if (!ratingLoading && ratingMessage) {
      handleShowSuccessToast(ratingMessage);
      setShowReviewModal(false);
      dispatch(clearErrors());
      dispatch(loadOrdersAction());
    }
  }, [dispatch, ratingError, ratingLoading, ratingMessage]);

  const buildServiceObject = (orderObject) => {
    const serviceObject = {
      _id: orderObject.servicePost._id,
      serviceName: orderObject.servicePost.serviceName,
      servicePostMessage: orderObject.servicePost.servicePostMessage,
      servicePostPrice: orderObject.servicePost.servicePostPrice,
      servicePostImage: orderObject.servicePost.servicePostImage,
      servicePostRatings: orderObject.servicePost.servicePostRatings,
      createdAt: orderObject.servicePost.createdAt,
      updatedAt: orderObject.servicePost.updatedAt,
      __v: orderObject.servicePost.__v,
      serviceProvider: {
        _id: orderObject.serviceProvider._id,
        serviceProviderFullName:
          orderObject.serviceProvider.serviceProviderFullName,
        serviceProviderEmail: orderObject.serviceProvider.serviceProviderEmail,
        isEmailVerified: orderObject.serviceProvider.isEmailVerified,
        serviceProviderCNICImages:
          orderObject.serviceProvider.serviceProviderCNICImages,
        isAccountVerified: orderObject.serviceProvider.isAccountVerified,
        serviceProviderWorkingHours:
          orderObject.serviceProvider.serviceProviderWorkingHours,
        createdAt: orderObject.serviceProvider.createdAt,
        updatedAt: orderObject.serviceProvider.updatedAt,
        __v: orderObject.serviceProvider.__v,
        serviceProviderAddress:
          orderObject.serviceProvider.serviceProviderAddress,
        serviceProviderAvatar:
          orderObject.serviceProvider.serviceProviderAvatar,
        serviceProviderPhoneNumber:
          orderObject.serviceProvider.serviceProviderPhoneNumber,
      },
    };

    return serviceObject;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* {console.log(orders)} */}
      {/* Navbar */}
      <Navbar />
      <Toaster />
      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Service History</h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center md:justify-start mb-6">
          {["pending", "inProgress", "completed", "cancelled"].map((tab) => (
            <div
              key={tab}
              className={`py-3 px-3 text-sm cursor-pointer transition-colors duration-200 
                ${
                  activeTab === tab
                    ? "bg-gray-200 text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() +
                tab.slice(1).replace(/([A-Z])/g, " $1")}
            </div>
          ))}
        </div>

        {/* Services List Desktop */}
        <div className="hidden md:grid grid-cols-1 gap-6">
          {!loading &&
            orders &&
            orders
              ?.filter((order) => {
                if (activeTab === "pending")
                  return order?.orderStatus === "pending";
                if (activeTab === "inProgress")
                  return order?.orderStatus === "accepted";
                if (activeTab === "completed")
                  return order?.orderStatus === "completed";
                if (activeTab === "cancelled")
                  return order?.orderStatus === "cancelled";
                return false;
              })
              ?.map((order) => (
                <div
                  key={order?._id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div
                    className="flex items-center"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/consumer-service-page", {
                        state: { service: buildServiceObject(order) },
                      });
                    }}
                  >
                    <img
                      src={order?.servicePost?.servicePostImage}
                      alt={order?.servicePost?.serviceName}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {order?.servicePost?.serviceName}
                      </h2>
                      <p className="text-lg font-bold text-blue-600">
                        Rs. {order?.servicePost?.servicePostPrice}
                      </p>
                    </div>
                  </div>
                  {rejectLoading ? (
                    <div className="mt-4 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center w-40">
                      <LoaderCircles />
                    </div>
                  ) : (
                    <>
                      {activeTab === "inProgress" && (
                        <button
                          onClick={() => navigate("/consumer-chat-section")}
                          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Chat
                        </button>
                      )}
                      {activeTab !== "cancelled" &&
                        activeTab !== "inProgress" && (
                          <button
                            onClick={() => {
                              if (activeTab === "pending") {
                                handleCancel(order?._id);
                              } else if (activeTab === "completed") {
                                handleReview(order?._id);
                              }
                            }}
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                          >
                            {activeTab === "pending"
                              ? "Cancel"
                              : activeTab === "completed"
                              ? order?.servicePost?.servicePostRatings?.some(
                                  (rating) =>
                                    rating.consumerId === order?.serviceOrderBy
                                )
                                ? "Edit Rating"
                                : "Review"
                              : ""}
                          </button>
                        )}
                    </>
                  )}
                </div>
              ))}
        </div>

        {/* Services List Mobile */}
        <div className="md:hidden space-y-4">
          {orders
            ?.filter((order) => {
              if (activeTab === "pending")
                return order?.orderStatus === "pending";
              if (activeTab === "inProgress")
                return order?.orderStatus === "accepted";
              if (activeTab === "completed")
                return order?.orderStatus === "completed";
              if (activeTab === "cancelled")
                return order?.orderStatus === "cancelled";
              return false;
            })
            ?.map((order) => (
              <div
                key={order?._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/consumer-service-page", {
                    state: { service: buildServiceObject(order) },
                  });
                }}
              >
                <img
                  src={order?.servicePost?.servicePostImage}
                  alt={order?.servicePost?.serviceName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">
                  {order?.servicePost?.serviceName}
                </h2>
                <p className="text-lg font-bold text-blue-600">
                  Rs. {order?.servicePost?.servicePostPrice}
                </p>

                {activeTab === "inProgress" && (
                  <button
                    onClick={() => navigate("/consumer-chat-section")}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Chat
                  </button>
                )}
                {activeTab !== "cancelled" && activeTab !== "inProgress" && (
                  <button
                    onClick={() => {
                      if (activeTab === "pending") {
                        handleCancel(order?._id);
                      } else if (activeTab === "completed") {
                        handleReview(order?._id);
                      }
                    }}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    {activeTab === "pending"
                      ? "Cancel"
                      : activeTab === "completed"
                      ? order?.servicePost?.servicePostRatings?.some(
                          (rating) =>
                            rating.consumerId === order?.serviceOrderBy
                        )
                        ? "Edit Rating"
                        : "Review"
                      : ""}
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-4">Rate Your Service</h2>
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className={`w-8 h-8 cursor-pointer ${
                    rating > index ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.086 1.122-6.508L.244 6.91l6.522-.949L10 0l2.234 5.961 6.522.949-4.998 4.668 1.122 6.508L10 15z" />
                </svg>
              ))}
            </div>
            {ratingLoading ? (
              <div className="bg-blue-600 text-white w-40 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center">
                <LoaderCircles />
              </div>
            ) : (
              <button
                onClick={submitReview}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={rating < 1}
              >
                Submit Rating
              </button>
            )}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceHistoryPage;

import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadAllConsumersAction,
  loadAllServiceProvidersAction,
  verifyAccountAction,
} from "../Redux/Actions/Actions";
import RingLoader from "../Loader/RingLoader";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../ToastMessages/ToastMessage.js";
import LoaderCircles from "../Loader/LoaderCircles.js";
const Accounts = () => {
  const dispatch = useDispatch();
  const { serviceProviderLoading, serviceProviders } = useSelector(
    (state) => state.loadAllServiceProvidersReducer
  );
  const { consumerLoading, consumers } = useSelector(
    (state) => state.loadAllConsumersReducer
  );
  const { accountLoading, accountError, accountMessage } = useSelector(
    (state) => state.verifyAccountReducer
  );

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadAllServiceProvidersAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadAllConsumersAction());
  }, [dispatch]);
  useEffect(() => {
    if (!accountLoading && accountMessage) {
      handleShowSuccessToast(accountMessage);
      dispatch(loadAllServiceProvidersAction());
    } else if (!accountLoading && accountError) {
      handleShowFailureToast(accountError);
    }
  }, [dispatch, accountLoading, accountError, accountMessage]);
  const verifyAccountHandler = (id) => {
    dispatch(clearErrors());
    dispatch(verifyAccountAction(id));
  };

  return (
    <>
      <Toaster />
      <div className="accounts-container">
        <div className="header">
          <Header />
        </div>
        <div className="w-full flex justify-center">
          <div className="account-container w-full lg:w-11/12 xl:w-10/12">
            <h1 className="ml-5 lg:ml-0 text-lg lg:text-xl xl:text-4xl font-bold text-[#4e97fd]">
              ServiceProvider Accounts
            </h1>
            <div className="service-provider-account-container w-full flex flex-wrap">
              {serviceProviderLoading && (
                <div className="flex w-full justify-center mt-20">
                  <RingLoader />
                </div>
              )}
              {!serviceProviderLoading &&
              serviceProviders &&
              serviceProviders?.length > 0 ? (
                serviceProviders?.map((serviceProvider) => (
                  <div className="w-full my-6 py-8 bg-[#f1f4f5] rounded-lg relative">
                    <div className="px-10 lg:px-0 profile w-full flex flex-wrap">
                      <div className="profile-image w-full lg:basis-[20%] flex flex-col items-center">
                        <div className="image w-32 h-32 p-1 rounded-full border-[2px] border-white m-4">
                          <img
                            src={serviceProvider?.serviceProviderAvatar}
                            alt=""
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <div className="verified-button flex justify-center w-full">
                          {serviceProvider.isAccountVerified ? (
                            <button className="w-[40%] bg-green-400 text-white h-8 rounded-2xl text-xl font-light">
                              VERIFIED
                            </button>
                          ) : (
                            <button className="w-[60%] bg-slate-400 text-white h-8 rounded-2xl text-xl font-light">
                              Not verified
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="details w-full lg:basis-[80%] mt-4">
                        <div className="w-full">
                          <div className="w-full service-provider-details flex flex-wrap">
                            <div className="w-full lg:basis-[50%]">
                              <h1 className="font-semibold text-xl">
                                Service Provider Name
                              </h1>
                              <div className="bg-[#bdd5de] w-[80%] h-8 flex items-center px-4 rounded-lg">
                                <h1 className="font-semibold">
                                  {serviceProvider.serviceProviderFullName}
                                </h1>
                              </div>
                            </div>
                            <div className="w-full lg:basis-[50%]">
                              <h1 className="font-semibold text-xl">
                                Service Provider Email
                              </h1>
                              <div className="bg-[#bdd5de] w-[80%] h-8 flex items-center px-4 rounded-lg">
                                <h1 className="font-semibold">
                                  {serviceProvider.serviceProviderEmail}
                                </h1>
                              </div>
                            </div>
                            <div className="w-full lg:basis-[50%] mt-3">
                              <h1 className="font-semibold text-xl">
                                Service Provider Address
                              </h1>
                              <div className="bg-[#bdd5de] w-[80%] h-8 flex items-center px-4 rounded-lg">
                                <h1 className="font-semibold">
                                  {serviceProvider.serviceProviderAddress}
                                </h1>
                              </div>
                            </div>
                            <div className="w-full lg:basis-[50%] mt-3">
                              <h1 className="font-semibold text-xl">
                                Service Provider Phone Number
                              </h1>
                              <div className="bg-[#bdd5de] w-[80%] h-8 flex items-center px-4 rounded-lg">
                                <h1 className="font-semibold">
                                  {serviceProvider.serviceProviderPhoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className="serviceProviderWorkingHours mt-3">
                            <h1 className="font-semibold text-xl">
                              Service Provider Working Hours
                            </h1>
                            <div className="service-provider-working-hours-list flex flex-wrap mt-2">
                              {serviceProvider.serviceProviderWorkingHours?.map(
                                (workingHour) => (
                                  <div className="service-provider-working-hour-item bg-[#dadada] mx-2 mt-2 lg:mt-0 px-4 py-2 rounded-sm">
                                    <h1>
                                      {workingHour.dayOfWeek}:{" "}
                                      {workingHour.time}
                                    </h1>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="serviceProviderCnic-2-Photos mt-5">
                            <h1 className="font-semibold text-xl">
                              Service Provider CNIC 2 Photos
                            </h1>
                            <div className="service-provider-cnic-2-photos-list lg:flex mt-2">
                              {serviceProvider.serviceProviderCNICImages?.map(
                                (cnicImage) => (
                                  <div className="service-provider-cnic-2-photo-item bg-[#dadada] mx-2 px-4 py-2 w-full lg:w-5/12 rounded-sm h-[10rem] lg:h-[14rem]">
                                    <img
                                      src={cnicImage}
                                      alt=""
                                      className="w-full h-full"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            {serviceProvider?.isAccountVerified ? (
                              ""
                            ) : accountLoading ? (
                              <div className="w-full mt-10 flex justify-center">
                                <div className="w-[70%] h-10 lg:w-[40%] lg:h-14 bg-green-400 text-white rounded-2xl text-lg lg:text-xl font-light flex justify-center items-center">
                                  <LoaderCircles />
                                </div>
                              </div>
                            ) : (
                              <div className="verify-account w-full mt-10 flex justify-center">
                                <button
                                  className="w-[70%] h-10 lg:w-[40%] lg:h-14 hover:bg-green-600 bg-green-400 text-white rounded-2xl text-lg lg:text-xl font-light"
                                  onClick={() =>
                                    verifyAccountHandler(serviceProvider?._id)
                                  }
                                >
                                  VERIFY ACCOUNT
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {serviceProvider.isAccountVerified && (
                      <img
                        src={require("../../Assets/black-tick.png")}
                        alt=""
                        className="w-6 h-6 lg:w-8 lg:h-8 xl:w-12 xl:h-12 absolute top-6 right-10"
                      />
                    )}
                  </div>
                ))
              ) : serviceProviders?.length === 0 ? (
                <div>
                  <h1>No service provider existed into database...</h1>
                </div>
              ) : (
                ""
              )}
            </div>
            <h1 className="ml-5 lg:ml-0 text-lg lg:text-xl xl:text-4xl font-bold text-[C]">
              Consumer Accounts
            </h1>
            <div className="consumer-account-container w-full flex flex-wrap">
              {consumerLoading ? (
                <div className="flex w-full justify-center mt-20">
                  <RingLoader />
                </div>
              ) : consumers?.length > 0 ? (
                consumers.map((consumer) => (
                  <div className="account w-full lg:w-6/12 xl:w-4/12 p-5">
                    <div className="w-full  bg-[#dadada] flex flex-col items-center p-5 rounded-lg relative">
                      <div className="profile-image rounded-full p-1 border-white border-[1px]">
                        <img
                          src={
                            consumer.consumerAvatar ||
                            require("../../Assets/avatar.png")
                          }
                          alt=""
                          className="w-40 h-40 rounded-full"
                        />
                      </div>
                      <h1 className="text-2xl font-semibold mt-2">
                        {consumer.consumerFullName || "No Name"}
                      </h1>
                      <h1 className="text-lg">
                        {consumer.consumerEmail || "No Email"}
                      </h1>
                      <h1 className="text-lg">
                        {consumer.consumerPhoneNumber || "No phone"}
                      </h1>
                      {consumer.isEmailVerified ? (
                        <div className="verify-account w-full flex justify-center">
                          <div className=" bg-[#4e97fd]  w-[80%] text-white py-3 mt-6 rounded-lg flex justify-center items-center">
                            VERIFIED
                          </div>
                        </div>
                      ) : (
                        <div className="verify-account w-full flex justify-center">
                          <div className=" bg-red-500 w-[80%] text-white py-3 mt-6 rounded-lg flex justify-center items-center">
                            Not verified
                          </div>
                        </div>
                      )}
                      {consumer.isEmailVerified ? (
                        <img
                          src={require("../../Assets/black-tick.png")}
                          alt=""
                          className="w-6 h-6 lg:w-8 lg:h-8 xl:w-12 xl:h-12 absolute top-5 right-5"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))
              ) : consumers?.length === 0 ? (
                <div>
                  <h1>No consumer found in database ...</h1>
                </div>
              ) : (
                ""
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

export default Accounts;

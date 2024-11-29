import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadAllOrdersAction } from "../Redux/Actions/Actions";
import SkeletonOrderLoader from "../Loader/SkeletonOrderLoader";
const Order = () => {
  const dispatch = useDispatch();
  const { loadOrdersLoading, orders } = useSelector(
    (state) => state.loadAllOrdersReducer
  );

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadAllOrdersAction());
  }, [dispatch]);
  console.log(orders);

  return (
    <>
      <div className="order-container">
        <div className="header">
          <Header />
        </div>
        <div className="flex w-full justify-center">
          <div className="order-container w-full lg:w-10/12 flex flex-wrap justify-center">
            {loadOrdersLoading && (
              <div className=" w-11/12 lg:w-6/12 xl:w-4/12">
                <SkeletonOrderLoader />
              </div>
            )}
            {!loadOrdersLoading && orders?.length > 0 ? (
              orders.map((order) => (
                <div className="order card my-8 w-11/12 lg:w-6/12 xl:w-5/12 p-2">
                  <div className="consumer-information p-4 bg-[#dadada] shadow-xl rounded-xl ">
                    <div className="order-by flex items-center gap-3">
                      <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                        Order By
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="consumer-profile-information flex mt-8">
                      <div className="profile-pic-name flex items-center gap-8">
                        <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                          <img
                            src={
                              order.serviceOrderBy.consumerAvatar ||
                              require("../../Assets/avatar.png")
                            }
                            alt=""
                            className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                            {order.serviceOrderBy.consumerFullName.slice(0, 25)}{" "}
                            {order.serviceOrderBy.consumerFullName.length >
                              25 && "..."}
                          </h1>
                          <div className="">
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                Email:
                              </span>{" "}
                              {order.serviceOrderBy.consumerEmail.slice(0, 35)}{" "}
                              {order.serviceOrderBy.consumerEmail.length > 35 &&
                                "..."}
                            </h1>
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                Phone:
                              </span>{" "}
                              {order.serviceOrderBy.consumerPhoneNumber}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="address flex items-center gap-7">
                      <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                        <h1 className="text-white">Address</h1>
                      </div>
                      <h1 className="mt-3">
                        {order?.serviceOrderBy?.consumerAddress}
                      </h1>
                    </div>
                    <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                    <div className="order-details flex items-center gap-3">
                      <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                        Order Details
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="order-details-container relative">
                      <div className="flex gap-3 items-center name">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                          <h1 className="text-black text-xs">Service Name</h1>
                        </div>
                        <h1 className="w-40">
                          {order?.servicePost?.serviceName}
                        </h1>
                      </div>
                      <div className="flex gap-3 items-center message">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs inline-block">
                            Service message
                          </h1>
                        </div>
                        <h1>{order?.servicePost?.servicePostMessage}</h1>
                      </div>
                      <div className="flex gap-3 items-center schedule mt-4">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs">Delivery Date</h1>
                        </div>
                        <h1>{order?.orderDeliverySchedule}</h1>
                      </div>
                      <div className="flex gap-3 items-center name absolute right-0 top-0">
                        <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                          <h1 className="text-white text-xs">{"$ " + 100}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="btns flex gap-3 justify-center mt-8 mb-5">
                      <div className="bg-[#4e97fd] text-white py-2 px-8 rounded-lg shadow-lg w-full flex justify-center items-center">
                        {order?.orderStatus}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : orders?.length === 0 ? (
              <div>
                <h1>No orders found.</h1>
              </div>
            ) : (
              ""
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

export default Order;

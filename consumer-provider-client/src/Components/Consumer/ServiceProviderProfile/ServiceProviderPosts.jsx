import React, { useState, useEffect } from "react";
import SkeletonPostLoader from "../../Loader/ServiceProviderLoaders/SkeletonPostLoader";
import StarRating from "../ConsumerCommon/StarRating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadCurrentServiceProviderAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { useNavigate } from "react-router-dom";

const ServiceProviderPost = ({ serviceProviderId }) => {
  const [postShowing, setPostShowing] = useState(true);
  const [loadLoading, setLoadLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { loading, message, error } = useSelector(
    (state) => state.serviceProviderAddServicePostReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ratingCalculator = (ratings) => {
    if (!ratings || ratings.length === 0) return 0; // Handle empty ratings array
    let sum = 0;
    ratings.forEach((rating) => (sum += rating.rating));
    return Math.floor(sum / ratings.length);
  };

  const loadPosts = async (serviceProviderId) => {
    try {
      const response = await axios.get(
        `/api/v1/service-provider/load-all-service-provider-posts-consumer-side/${serviceProviderId}`
      );
      console.log("Fetched posts:", response.data); // Log the response
      setPosts(response.data.posts);
      setLoadLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoadLoading(false);
    }
  };

  useEffect(() => {
    console.log("Loading posts for serviceProviderId:", serviceProviderId);
    loadPosts(serviceProviderId);
  }, [serviceProviderId]);

  useEffect(() => {
    if (!loading && error) {
      handleShowFailureToast(error);
      dispatch(clearErrors());
    } else if (!loading && message) {
      handleShowSuccessToast(message);
      dispatch(clearErrors());
      setPostShowing(true);
    }
  }, [loading, error, message, dispatch]);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentServiceProviderAction());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div className="service-provider-post-container">
        <div className="post-sections-container mt-10">
          {postShowing ? (
            <div className="all-posts-container">
              <div className="service-posts w-full h-full flex flex-wrap px-16">
                {loadLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonPostLoader key={index} />
                  ))
                ) : posts && posts.length > 0 ? (
                  <div className="service-posts w-full flex flex-wrap gap-6 justify-center mt-10">
                    {posts.map((post, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-700 ease-out"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate("/consumer-service-page", {
                            state: { service: post },
                          });
                        }}
                      >
                        <img
                          src={post.servicePostImage}
                          alt={post.serviceName}
                          className="w-full h-48 object-cover mb-4 rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {post.serviceName}
                          </h3>
                          <StarRating
                            rating={ratingCalculator(post?.servicePostRatings) || 0}
                          />
                          <p className="text-gray-700 mt-2">
                            {"Rs " + post.servicePostPrice}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full">
                    <h1 className="text-center">No posts into database</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceProviderPost;

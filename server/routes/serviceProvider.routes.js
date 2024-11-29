const express = require("express");
const {
  signUp,
  verifyEmail,
  avatarAndPhoneNumber,
  addAddress,
  signIn,
  signOut,
  sendResetPasswordLink,
  resetPassword,
  loadCurrentServiceProvider,
  setWorkingHours,
  addCNICDetails,
  addServicePost,
  deleteServicePost,
  loadAllServiceProviderPosts,
  loadAllServiceProviderPostsConsumerSide,
  acceptOrder,
  rejectOrder,
  cancelOrder,
  loadOrders,
  loadAllNewNotifications,
  readNotification,
  loadPendingOrders,
  loadCompletedOrders,
  loadRejectedOrders,
  loadCancelledOrders,
  loadAcceptedOrders,
  completeOrder,
  createConversation,
  loadConversations,
  sendMessage,
  loadMessages,
  loadServiceProviderDisputes,
  deleteWorkingHours,
  deleteCustomService,
  loadCustomServices,
  markIntersetedCustomService,
  createCustomServiceConversation,
} = require("../controllers/serviceProvider.controllers");
const isServiceProviderAuthenticated = require("../middlewares/isServiceProviderAuthenticated.middlewares");
const singleImageUpload = require("../middlewares/singleImageUpload.middlewares");
const twoImagesUpload = require("../middlewares/twoImagesUploda.middlewares");

const Router = express.Router();

Router.route("/sign-up").post(signUp);
Router.route("/verify-email/:token").post(verifyEmail);
Router.route("/avatar-phone-upload").post(
  isServiceProviderAuthenticated,
  singleImageUpload("serviceProviderAvatar"),
  avatarAndPhoneNumber
);
Router.route("/add-address").post(isServiceProviderAuthenticated, addAddress);
Router.route("/sign-in").post(signIn);
Router.route("/sign-out").get(isServiceProviderAuthenticated, signOut);
Router.route("/send-reset-password-email").post(sendResetPasswordLink);
Router.route("/reset-password/:token").post(resetPassword);
Router.route("/load-current-service-provider").get(
  isServiceProviderAuthenticated,
  loadCurrentServiceProvider
);
Router.route("/set-working-hours").post(
  isServiceProviderAuthenticated,
  setWorkingHours
);
Router.route("/delete-working-hours").delete(
  isServiceProviderAuthenticated,
  deleteWorkingHours
);
Router.route("/add-cnic-details").post(
  isServiceProviderAuthenticated,
  twoImagesUpload("serviceProviderCNICImages"),
  addCNICDetails
);
Router.route("/add-service-post").post(
  isServiceProviderAuthenticated,
  singleImageUpload("servicePostImage"),
  addServicePost
);
Router.route("/delete-service-post/:id").delete(
  isServiceProviderAuthenticated,
  deleteServicePost
);
Router.route("/load-all-service-provider-posts").get(
  isServiceProviderAuthenticated,
  loadAllServiceProviderPosts
);
Router.route("/load-all-service-provider-posts-consumer-side/:serviceProviderId").get(
  loadAllServiceProviderPostsConsumerSide
);

Router.route("/delete-service-post/:id").delete(
  isServiceProviderAuthenticated,
  deleteServicePost
);
Router.route("/accept-order/:id").post(
  isServiceProviderAuthenticated,
  acceptOrder
);
Router.route("/reject-order/:id").delete(
  isServiceProviderAuthenticated,
  rejectOrder
);
Router.route("/cancel-order/:id").delete(
  isServiceProviderAuthenticated,
  cancelOrder
);
Router.route("/complete-order/:id").post(
  isServiceProviderAuthenticated,
  completeOrder
);
Router.route("/load-orders").get(isServiceProviderAuthenticated, loadOrders);
Router.route("/load-pending-orders").get(
  isServiceProviderAuthenticated,
  loadPendingOrders
);
Router.route("/load-completed-orders").get(
  isServiceProviderAuthenticated,
  loadCompletedOrders
);
Router.route("/load-rejected-orders").get(
  isServiceProviderAuthenticated,
  loadRejectedOrders
);
Router.route("/load-cancelled-orders").get(
  isServiceProviderAuthenticated,
  loadCancelledOrders
);
Router.route("/load-accepted-orders").get(
  isServiceProviderAuthenticated,
  loadAcceptedOrders
);
Router.route("/load-new-notifications").get(
  isServiceProviderAuthenticated,
  loadAllNewNotifications
);
Router.route("/read-notification/:id").get(
  isServiceProviderAuthenticated,
  readNotification
);
Router.route("/load-disputes").get(
  isServiceProviderAuthenticated,
  loadServiceProviderDisputes
);
Router.route("/create-conversation").post(
  isServiceProviderAuthenticated,
  createConversation
);
Router.route("/load-conversations").get(
  isServiceProviderAuthenticated,
  loadConversations
);
Router.route("/send-message").post(isServiceProviderAuthenticated, sendMessage);
Router.route("/load-messages/:conversationId").get(
  isServiceProviderAuthenticated,
  loadMessages
);
Router.route("/delete-custom-service/:id").delete(
  isServiceProviderAuthenticated,
  deleteCustomService
);
Router.route("/load-custom-services").get(
  isServiceProviderAuthenticated,
  loadCustomServices
);
Router.route("/mark-interseted-custom-service/:id").get(
  isServiceProviderAuthenticated,
  markIntersetedCustomService
);
Router.route("/create-custom-service-chat").post(
  isServiceProviderAuthenticated,
  createCustomServiceConversation
);
module.exports = Router;
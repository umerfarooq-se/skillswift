import { configureStore } from "@reduxjs/toolkit";
import {
  consumerAddCustomServiceReducer,
  consumerAddRatingReducer,
  consumerCreateConversationReducer,
  consumerDeleteCustomServiceReducer,
  consumerForgotPasswordLinkReducer,
  consumerLoadCustomServicesReducer,
  consumerLoginReducer,
  consumerOrderServiceReducer,
  consumerRejectOrderReducer,
  consumerResetPasswordReducer,
  consumerSignUpReducer,
  consumerUploadInfoReducer,
  fileDisputeReducer,
  loadAllDisputesReducer,
  loadConsumerConversationsReducer,
  loadConsumerMessagesReducer,
  loadCurrentConsumerReducer,
  loadOrdersReducer,
  loadPopularPostsReducer,
  loadRefundsReducer,
  refundAmountRequestReducer,
  sendConsumerMessageReducer,
} from "./Consumer/Reducers/ConsumerReducers";
import {
  acceptOrderReducer,
  cancelOrderReducer,
  completeOrderReducer,
  createConversationReducer,
  deleteServicePostReducer,
  loadAcceptedOrdersReducer,
  loadCancelledOrdersReducer,
  loadCompletedOrdersReducer,
  loadConversationsReducer,
  loadCurrentServiceProviderReducer,
  loadDisputesReducer,
  loadMessagesReducer,
  loadNewNotificationsReducer,
  loadPendingOrdersReducer,
  loadRejectedOrdersReducer,
  readNotificationReducer,
  rejectOrderReducer,
  sendMessageReducer,
  serviceProviderAddCNICReducer,
  serviceProviderAddServicePostReducer,
  serviceProviderAddTimeSlotReducer,
  serviceProviderCustomServiceChatReducer,
  serviceProviderDeleteCustomServiceReducer,
  serviceProviderForgotPasswordReducer,
  serviceProviderListedServicesReducer,
  serviceProviderLoadCustomServicesReducer,
  serviceProviderMarkInterestedCustomServiceReducer,
  serviceProviderResetPasswordReducer,
  serviceProviderSignInReducer,
  serviceProviderSignUpReducer,
  serviceProviderUploadInfoReducer,
} from "./ServiceProvider/Reducers/ServiceProviderReducers";

const store = configureStore({
  reducer: {
    // consumer reducers
    consumerLoginReducer: consumerLoginReducer,
    consumerForgotPasswordLinkReducer: consumerForgotPasswordLinkReducer,
    consumerResetPasswordReducer: consumerResetPasswordReducer,
    consumerSignUpReducer: consumerSignUpReducer,
    loadCurrentConsumerReducer: loadCurrentConsumerReducer,
    consumerUploadInfoReducer: consumerUploadInfoReducer,
    loadPopularPostsReducer: loadPopularPostsReducer,
    consumerOrderServiceReducer: consumerOrderServiceReducer,
    loadOrdersReducer: loadOrdersReducer,
    consumerRejectOrderReducer: consumerRejectOrderReducer,
    consumerAddRatingReducer: consumerAddRatingReducer,
    loadAllDisputesReducer: loadAllDisputesReducer,
    fileDisputeReducer: fileDisputeReducer,
    loadRefundsReducer: loadRefundsReducer,
    refundAmountRequestReducer: refundAmountRequestReducer,
    loadConsumerConversationsReducer: loadConsumerConversationsReducer,
    loadConsumerMessagesReducer: loadConsumerMessagesReducer,
    sendConsumerMessageReducer: sendConsumerMessageReducer,
    consumerCreateConversationReducer: consumerCreateConversationReducer,
    consumerLoadCustomServicesReducer: consumerLoadCustomServicesReducer,
    consumerAddCustomServiceReducer: consumerAddCustomServiceReducer,
    consumerDeleteCustomServiceReducer: consumerDeleteCustomServiceReducer,
    // service provider reducers
    serviceProviderSignInReducer: serviceProviderSignInReducer,
    serviceProviderForgotPasswordReducer: serviceProviderForgotPasswordReducer,
    serviceProviderResetPasswordReducer: serviceProviderResetPasswordReducer,
    serviceProviderSignUpReducer: serviceProviderSignUpReducer,
    serviceProviderUploadInfoReducer: serviceProviderUploadInfoReducer,
    serviceProviderListedServicesReducer: serviceProviderListedServicesReducer,
    serviceProviderAddTimeSlotReducer: serviceProviderAddTimeSlotReducer,
    serviceProviderAddCNICReducer: serviceProviderAddCNICReducer,
    serviceProviderAddServicePostReducer: serviceProviderAddServicePostReducer,
    loadCurrentServiceProviderReducer: loadCurrentServiceProviderReducer,
    loadPendingOrdersReducer: loadPendingOrdersReducer,
    loadCompletedOrdersReducer: loadCompletedOrdersReducer,
    loadAcceptedOrdersReducer: loadAcceptedOrdersReducer,
    loadRejectedOrdersReducer: loadRejectedOrdersReducer,
    loadCancelledOrdersReducer: loadCancelledOrdersReducer,
    acceptOrderReducer: acceptOrderReducer,
    rejectOrderReducer: rejectOrderReducer,
    cancelOrderReducer: cancelOrderReducer,
    completeOrderReducer: completeOrderReducer,
    loadNewNotificationsReducer: loadNewNotificationsReducer,
    readNotificationReducer: readNotificationReducer,
    deleteServicePostReducer: deleteServicePostReducer,
    loadConversationsReducer: loadConversationsReducer,
    loadMessagesReducer: loadMessagesReducer,
    sendMessageReducer: sendMessageReducer,
    createConversationReducer: createConversationReducer,
    loadDisputesReducer: loadDisputesReducer,
    serviceProviderDeleteCustomServiceReducer:
      serviceProviderDeleteCustomServiceReducer,
    serviceProviderLoadCustomServicesReducer:
      serviceProviderLoadCustomServicesReducer,
    serviceProviderMarkInterestedCustomServiceReducer:
      serviceProviderMarkInterestedCustomServiceReducer,
    serviceProviderCustomServiceChatReducer:
      serviceProviderCustomServiceChatReducer,
  },
});

export default store;
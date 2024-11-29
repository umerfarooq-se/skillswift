import axios from "axios";

const clearErrors = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
const signInAction = (signData) => async (dispatch) => {
  try {
    dispatch({ type: "SIGN_IN_REQUEST" });
    const response = await axios.post("/api/v1/admin/sign-in", signData);
    dispatch({ type: "SIGN_IN_SUCCESS", payload: response.data.message });
  } catch (error) {
    dispatch({
      type: "SIGN_IN_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const loadCurrentAdminAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_CURRENT_ADMIN_REQUEST" });
    const response = await axios.get("/api/v1/admin/load-current-admin");
    dispatch({
      type: "LOAD_CURRENT_ADMIN_SUCCESS",
      payload: response.data.admin,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CURRENT_ADMIN_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const resetPasswordAction = (resetData) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });
    const response = await axios.post(
      "/api/v1/admin/send-reset-password-email",
      resetData
    );
    dispatch({
      type: "RESET_PASSWORD_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const changePasswordAction = (changeData, token) => async (dispatch) => {
  try {
    dispatch({ type: "CHANGE_PASSWORD_REQUEST" });

    const response = await axios.post(
      `/api/v1/admin/reset-password/${token}`,
      changeData
    );
    dispatch({
      type: "CHANGE_PASSWORD_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "CHANGE_PASSWORD_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const loadDisputesAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_DISPUTES_REQUEST" });
    const response = await axios.get("/api/v1/admin/load-disputes");
    dispatch({
      type: "LOAD_DISPUTES_SUCCESS",
      payload: response.data.disputes,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_DISPUTES_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const approveDisputeAction = (disputeId, data) => async (dispatch) => {
  try {
    dispatch({ type: "APPROVE_DISPUTE_REQUEST" });
    const response = await axios.post(
      `/api/v1/admin/resolve-dispute/${disputeId}`,
      data
    );
    dispatch({
      type: "APPROVE_DISPUTE_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "APPROVE_DISPUTE_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const rejectDisputeAction = (disputeId, data) => async (dispatch) => {
  try {
    dispatch({ type: "REJECT_DISPUTE_REQUEST" });
    const response = await axios.post(
      `/api/v1/admin/reject-dispute/${disputeId}`,
      data
    );
    dispatch({
      type: "REJECT_DISPUTE_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "REJECT_DISPUTE_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const resolveRefundAction = (refundId) => async (dispatch) => {
  try {
    dispatch({ type: "RESOLVE_REFUND_REQUEST" });
    const response = await axios.get(
      `/api/v1/admin/approve-refund-request/${refundId}`
    );
    dispatch({
      type: "RESOLVE_REFUND_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "RESOLVE_REFUND_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const rejectRefundAction = (refundId) => async (dispatch) => {
  try {
    dispatch({ type: "REJECT_REFUND_REQUEST" });
    const response = await axios.get(
      `/api/v1/admin/reject-refund-request/${refundId}`
    );
    dispatch({
      type: "REJECT_REFUND_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "REJECT_REFUND_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const loadRefundsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_REFUNDS_REQUEST" });
    const response = await axios.get("/api/v1/admin/load-refunds");
    dispatch({
      type: "LOAD_REFUNDS_SUCCESS",
      payload: response.data.refunds,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_REFUNDS_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const loadAllOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_ORDERS_REQUEST" });
    const response = await axios.get("/api/v1/admin/load-all-orders");

    dispatch({
      type: "LOAD_ORDERS_SUCCESS",
      payload: response.data.orders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_ORDERS_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const loadAllConsumersAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_CONSUMERS_REQUEST" });
    const response = await axios.get("/api/v1/admin/load-all-consumers");
    dispatch({
      type: "LOAD_CONSUMERS_SUCCESS",
      payload: response.data.consumers,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CONSUMERS_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const loadAllServiceProvidersAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_SERVICE_PROVIDERS_REQUEST" });
    const response = await axios.get("/api/v1/admin/load-service-providers");
    dispatch({
      type: "LOAD_SERVICE_PROVIDERS_SUCCESS",
      payload: response.data.serviceProviders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_SERVICE_PROVIDERS_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const verifyAccountAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFY_ACCOUNT_REQUEST" });
    const response = await axios.get(
      `/api/v1/admin/verify-service-provider-account/${id}`
    );
    dispatch({
      type: "VERIFY_ACCOUNT_SUCCESS",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "VERIFY_ACCOUNT_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const adminSignOutAction = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_SIGNOUT_REQUEST" });
    await axios.get("/api/v1/admin/sign-out");
    dispatch({ type: "ADMIN_SIGNOUT_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "ADMIN_SIGNOUT_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
export {
  clearErrors,
  signInAction,
  loadCurrentAdminAction,
  resetPasswordAction,
  changePasswordAction,
  loadDisputesAction,
  approveDisputeAction,
  rejectDisputeAction,
  resolveRefundAction,
  rejectRefundAction,
  loadRefundsAction,
  loadAllOrdersAction,
  loadAllConsumersAction,
  loadAllServiceProvidersAction,
  verifyAccountAction,
  adminSignOutAction,
};

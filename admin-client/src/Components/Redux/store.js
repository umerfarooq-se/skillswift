import { configureStore } from "@reduxjs/toolkit";
import {
  adminSignOutReducer,
  approveDisputeReducer,
  changePasswordReducer,
  loadAllConsumersReducer,
  loadAllOrdersReducer,
  loadAllServiceProvidersReducer,
  loadCurrentAdminReducer,
  loadDisputesReducer,
  loadRefundsReducer,
  rejectDisputeReducer,
  rejectRefundReducer,
  resetPasswordReducer,
  resolveRefundReducer,
  signInReducer,
  verifyAccountReducer,
} from "./Reducers/Reducers";

const store = configureStore({
  reducer: {
    signInReducer: signInReducer,
    loadCurrentAdminReducer: loadCurrentAdminReducer,
    resetPasswordReducer: resetPasswordReducer,
    changePasswordReducer: changePasswordReducer,
    loadDisputesReducer: loadDisputesReducer,
    approveDisputeReducer: approveDisputeReducer,
    rejectDisputeReducer: rejectDisputeReducer,
    resolveRefundReducer: resolveRefundReducer,
    rejectRefundReducer: rejectRefundReducer,
    loadRefundsReducer: loadRefundsReducer,
    loadAllOrdersReducer: loadAllOrdersReducer,
    loadAllServiceProvidersReducer: loadAllServiceProvidersReducer,
    loadAllConsumersReducer: loadAllConsumersReducer,
    verifyAccountReducer: verifyAccountReducer,
    adminSignOutReducer: adminSignOutReducer,
  },
});

export default store;

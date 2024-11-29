import { createReducer } from "@reduxjs/toolkit";

const signInReducer = createReducer(
  { loading: false, error: null, message: null },
  (builder) => {
    builder
      .addCase("SIGN_IN_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("SIGN_IN_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SIGN_IN_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.error = null;
      });
  }
);
const loadCurrentAdminReducer = createReducer(
  { adminLoading: false, adminData: null, adminError: null },
  (builder) => {
    builder
      .addCase("LOAD_CURRENT_ADMIN_REQUEST", (state) => {
        state.adminLoading = true;
        state.adminData = null;
        state.adminError = null;
      })
      .addCase("LOAD_CURRENT_ADMIN_SUCCESS", (state, action) => {
        state.adminLoading = false;
        state.adminData = action.payload;
      })
      .addCase("LOAD_CURRENT_ADMIN_FAILURE", (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.adminError = null;
      });
  }
);
const resetPasswordReducer = createReducer(
  { loading: false, error: null, message: null },
  (builder) => {
    builder
      .addCase("RESET_PASSWORD_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase("RESET_PASSWORD_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("RESET_PASSWORD_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.error = null;
      });
  }
);
const changePasswordReducer = createReducer(
  { loading: false, message: null, error: null },
  (builder) => {
    builder
      .addCase("CHANGE_PASSWORD_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase("CHANGE_PASSWORD_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("CHANGE_PASSWORD_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.error = null;
      });
  }
);
const loadDisputesReducer = createReducer(
  { disputeLoader: false, disputeError: null, disputes: null },
  (builder) => {
    builder
      .addCase("LOAD_DISPUTES_REQUEST", (state) => {
        state.disputeLoader = true;
        state.disputeError = null;
        state.disputes = null;
      })
      .addCase("LOAD_DISPUTES_SUCCESS", (state, action) => {
        state.disputeLoader = false;
        state.disputes = action.payload;
      })
      .addCase("LOAD_DISPUTES_FAILURE", (state, action) => {
        state.disputeLoader = false;
        state.disputeError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.disputeError = null;
      });
  }
);
const approveDisputeReducer = createReducer(
  { approveLoading: false, approveError: null, approveMessage: null },
  (builder) => {
    builder
      .addCase("APPROVE_DISPUTE_REQUEST", (state) => {
        state.approveLoading = true;
        state.approveError = null;
        state.approveMessage = null;
      })
      .addCase("APPROVE_DISPUTE_SUCCESS", (state, action) => {
        state.approveLoading = false;
        state.approveMessage = action.payload;
      })
      .addCase("APPROVE_DISPUTE_FAILURE", (state, action) => {
        state.approveLoading = false;
        state.approveError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.approveError = null;
      });
  }
);
const rejectDisputeReducer = createReducer(
  { rejectLoading: false, rejectError: null, rejectMessage: null },
  (builder) => {
    builder
      .addCase("REJECT_DISPUTE_REQUEST", (state) => {
        state.rejectLoading = true;
        state.rejectError = null;
        state.rejectMessage = null;
      })
      .addCase("REJECT_DISPUTE_SUCCESS", (state, action) => {
        state.rejectLoading = false;
        state.rejectMessage = action.payload;
      })
      .addCase("REJECT_DISPUTE_FAILURE", (state, action) => {
        state.rejectLoading = false;
        state.rejectError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.rejectError = null;
      });
  }
);
const resolveRefundReducer = createReducer(
  { resolveLoading: false, resolveError: null, resolveMessage: null },
  (builder) => {
    builder
      .addCase("RESOLVE_REFUND_REQUEST", (state) => {
        state.resolveLoading = true;
        state.resolveError = null;
        state.resolveMessage = null;
      })
      .addCase("RESOLVE_REFUND_SUCCESS", (state, action) => {
        state.resolveLoading = false;
        state.resolveMessage = action.payload;
      })
      .addCase("RESOLVE_REFUND_FAILURE", (state, action) => {
        state.resolveLoading = false;
        state.resolveError = action.payload;
      })
      .addCase("CLEAR_RESOLVE_ERRORS", (state, action) => {
        state.resolveError = null;
      });
  }
);
const rejectRefundReducer = createReducer(
  { rejectLoading: false, rejectError: null, rejectMessage: null },
  (builder) => {
    builder
      .addCase("REJECT_REFUND_REQUEST", (state) => {
        state.rejectLoading = true;
        state.rejectError = null;
        state.rejectMessage = null;
      })
      .addCase("REJECT_REFUND_SUCCESS", (state, action) => {
        state.rejectLoading = false;
        state.rejectMessage = action.payload;
      })
      .addCase("REJECT_REFUND_FAILURE", (state, action) => {
        state.rejectLoading = false;
        state.rejectError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.rejectError = null;
      });
  }
);
const loadRefundsReducer = createReducer(
  { refundLoading: false, refundError: null, refunds: null },
  (builder) => {
    builder
      .addCase("LOAD_REFUNDS_REQUEST", (state) => {
        state.refundLoading = true;
        state.refundError = null;
        state.refunds = null;
      })
      .addCase("LOAD_REFUNDS_SUCCESS", (state, action) => {
        state.refundLoading = false;
        state.refunds = action.payload;
      })
      .addCase("LOAD_REFUNDS_FAILURE", (state, action) => {
        state.refundLoading = false;
        state.refundError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.refundError = null;
      });
  }
);
const loadAllOrdersReducer = createReducer(
  { loadOrdersLoading: false, loadOrdersError: null, orders: null },
  (builder) => {
    builder
      .addCase("LOAD_ORDERS_REQUEST", (state) => {
        state.loadOrdersLoading = true;
        state.loadOrdersError = null;
        state.orders = null;
      })
      .addCase("LOAD_ORDERS_SUCCESS", (state, action) => {
        state.loadOrdersLoading = false;
        state.orders = action.payload;
      })
      .addCase("LOAD_ORDERS_FAILURE", (state, action) => {
        state.loadOrdersLoading = false;
        state.loadOrdersError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.loadOrdersError = null;
      });
  }
);
const loadAllServiceProvidersReducer = createReducer(
  {
    serviceProviderLoading: false,
    serviceProviderError: null,
    serviceProviders: null,
  },
  (builder) => {
    builder
      .addCase("LOAD_SERVICE_PROVIDERS_REQUEST", (state) => {
        state.serviceProviderLoading = true;
        state.serviceProviderError = null;
        state.serviceProviders = null;
      })
      .addCase("LOAD_SERVICE_PROVIDERS_SUCCESS", (state, action) => {
        state.serviceProviderLoading = false;
        state.serviceProviders = action.payload;
      })
      .addCase("LOAD_SERVICE_PROVIDERS_FAILURE", (state, action) => {
        state.serviceProviderLoading = false;
        state.serviceProviderError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.serviceProviderError = null;
      });
  }
);
const loadAllConsumersReducer = createReducer(
  { consumerLoading: false, consumerError: null, consumers: null },
  (builder) => {
    builder
      .addCase("LOAD_CONSUMERS_REQUEST", (state) => {
        state.consumerLoading = true;
        state.consumerError = null;
        state.consumers = null;
      })
      .addCase("LOAD_CONSUMERS_SUCCESS", (state, action) => {
        state.consumerLoading = false;
        state.consumers = action.payload;
      })
      .addCase("LOAD_CONSUMERS_FAILURE", (state, action) => {
        state.consumerLoading = false;
        state.consumerError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.consumerError = null;
      });
  }
);
const verifyAccountReducer = createReducer(
  { accountLoading: false, accountError: null, accountMessage: null },
  (builder) => {
    builder
      .addCase("VERIFY_ACCOUNT_REQUEST", (state) => {
        state.accountLoading = true;
        state.accountError = null;
        state.accountMessage = null;
      })
      .addCase("VERIFY_ACCOUNT_SUCCESS", (state, action) => {
        state.accountLoading = false;
        state.accountMessage = action.payload;
      })
      .addCase("VERIFY_ACCOUNT_FAILURE", (state, action) => {
        state.accountLoading = false;
        state.accountError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.accountError = null;
      });
  }
);
const adminSignOutReducer = createReducer(
  { signOutLoading: false, signOutError: null, signOutMessage: null },
  (builder) => {
    builder
      .addCase("ADMIN_SIGNOUT_REQUEST", (state) => {
        state.signOutLoading = true;
        state.signOutError = null;
        state.signOutMessage = null;
      })
      .addCase("ADMIN_SIGNOUT_SUCCESS", (state) => {
        state.signOutLoading = false;
        state.signOutMessage = "Logged Out Successfully";
      })
      .addCase("ADMIN_SIGNOUT_FAILURE", (state, action) => {
        state.signOutLoading = false;
        state.signOutError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state, action) => {
        state.signOutError = null;
      });
  }
);
export {
  signInReducer,
  loadCurrentAdminReducer,
  resetPasswordReducer,
  changePasswordReducer,
  loadDisputesReducer,
  approveDisputeReducer,
  rejectDisputeReducer,
  resolveRefundReducer,
  rejectRefundReducer,
  loadRefundsReducer,
  loadAllOrdersReducer,
  loadAllServiceProvidersReducer,
  loadAllConsumersReducer,
  verifyAccountReducer,
  adminSignOutReducer,
};

export const selectOrders = (state) => state.ordersFeed.orders;
export const selectTotal = (state) => state.ordersFeed.total;
export const selectTotalToday = (state) => state.ordersFeed.totalToday;
export const selectStatus = (state) => state.ordersFeed.status;
export const selectConnectingError = (state) => state.ordersFeed.connectingError;
export const selectDataLoaded = (state) => state.ordersFeed.isInitialDataLoaded;
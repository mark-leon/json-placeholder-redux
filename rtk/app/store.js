const configureStore = require("@reduxjs/toolkit").configureStore;
const postReducer = require("../features/post/postSlice");
const { createLogger } = require("redux-logger");
const reletadPostReducer = require("../features/relatedPost/relatedPostSlice");

const logger = createLogger();

// configure store
const store = configureStore({
  reducer: {
    post: postReducer,
    reletadPost: reletadPostReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;

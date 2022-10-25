const store = require("./app/store");
const { fetchPosts } = require("./features/post/postSlice");
const {
  fetchRelatedPosts,
} = require("./features/relatedPost/relatedPostSlice");

// subscribe to state changes
let state = "";
let url = "";
store.subscribe(() => {
  state = store.getState();

  url = state.post.url;
  //store.dispatch(fetchRelatedPosts(url));

  console.log("new url", url);
});
//console.log("outside url", url);

// disptach actions
store.dispatch(fetchPosts());
//console.log("fuck up", store.getState());
store.dispatch(fetchRelatedPosts(url));

// state = store.getState();
// console.log("outsider", state);

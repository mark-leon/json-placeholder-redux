const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  posts: [],
  url: "",
  error: "",
};

// create async thunk
const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const posts = await response.json();

  return posts;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
      let title = action.payload.title;
      let array = title.split(" ");
      let url = "https://jsonplaceholder.typicode.com/posts?";
      let s = "";
      for (let i = 0; i < array.length; i++) {
        let j = "title_like=";
        s = s + j + array[i] + "&";
      }
      state.url = url + s.slice(0, s.length - 1);
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.posts = [];
    });
  },
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;

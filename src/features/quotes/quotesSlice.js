import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// API call

const url = `https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=aapl,fb,tsla,acb,acre,googl&token=${process.env.REACT_APP_API_TOKEN}`;
console.log(process.env)


export const getQuotes = createAsyncThunk("quotes/getQuotes", () => {
  return (fetch(url)
  .then(response => {
    return response.json()
  })
  .catch((error) => console.log(error)))
})


const quotesSlice = createSlice({
    name: "quotes",
    initialState: {
        data: [],
        quotesPerPage: 5,
        currentPage: 1,
        isLoading: true,
    },
    reducers: {
      navigateToPrev: (state) => {
        state.currentPage -= 1;
      },
      changeCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
      navigateToNext: (state) => {
        state.currentPage += 1;
      }
    },
    extraReducers: {
      [getQuotes.pending]: (state) => {
        state.isLoading = true;
      },
      [getQuotes.fulfilled]: (state, action) => {      
        state.isLoading = false;
        const quotes = Object.values(action.payload);
        state.data = quotes;
      },
      [getQuotes.rejected]: (state) => {
        state.isLoading = false;
      }
    }
})

export const {navigateToNext, navigateToPrev, changeCurrentPage} = quotesSlice.actions;

export default quotesSlice.reducer;
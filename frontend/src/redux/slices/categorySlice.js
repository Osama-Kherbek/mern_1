import {createSlice} from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:"category",
    initialState:{
      categories: []
    },  
    reducers:{
     setCategories(state,actions){
        state.categories=actions.payload 
     },
     addCategory(state,actions){
      state.categories.push(actions.payload)
     },
     deleteCategory(state,actions){
      state.categories=state.categories.filter(c => c._id !==actions.payload)
     }
    }
})
const categoryReducer=categorySlice.reducer;
const categoryActions=categorySlice.actions;

export{categoryActions,categoryReducer}
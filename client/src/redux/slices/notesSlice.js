import {createSlice} from "@reduxjs/toolkit";


const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    userNotes: [],
    sharedNotes: [],
  },
  reducers: {
    addNote: (state, action) => { 
      state.items.push(action.payload);
    },
    removeNote: (state, action) => { 
      state.items.pop();
    },
    clearNotes: (state) => {
      state.items.length = 0;
    },
    updateNote: (state, action)=>{
      state.userNotes.forEach(note=>{
        if(note._id === action.payload._id){
          note.title = action.payload.title;
          note.body = action.payload.body;
        }
      })
    }
  }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

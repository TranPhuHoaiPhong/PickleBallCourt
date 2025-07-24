import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "",
  email: "",
  phone: "",
  _id: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, phone, _id } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state._id = _id;
    },
    resetUser: (state, action) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state._id = "";
    }
  },
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer

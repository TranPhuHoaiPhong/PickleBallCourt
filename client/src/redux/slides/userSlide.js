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
    }
  },
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer

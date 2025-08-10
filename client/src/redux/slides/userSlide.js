import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  isAdmin: false,
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, phone, isAdmin, _id } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.isAdmin = isAdmin;
      state._id = _id;
    },
    resetUser: (state, action) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.isAdmin = false;
      state._id = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

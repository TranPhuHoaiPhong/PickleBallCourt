import {jwtDecode} from 'jwt-decode';
import * as UserService from "../services/users/authServices"
import { updateUser } from '../redux/slides/userSlide';

export const handleDecode = () => {
  let storageData = localStorage.getItem('access-token');
  let decoded = {};

  if (storageData && typeof storageData === 'string') {
    try {
      decoded = jwtDecode(storageData);
    } catch (e) {
      console.error("Lỗi giải mã JWT:", e);
    }
  }

  return { decoded, storageData };
}

export const handleGetDetailUser = async (id, token, dispatch) => {
    try {
        const res = await UserService.getDetailUser(id, token)
        const { name, email, phone, _id } = res.data
        dispatch(updateUser({name, email, phone, _id})) 
    } catch (error) {
        
    }
}


export const getValidAccessToken = async () => {
  let token = localStorage.getItem("access-token");

  if (token?.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1); 
  }

  if (token) {
    const decoded = jwtDecode(token);

    if (decoded?.exp < Date.now() / 1000) {
      const res = await UserService.getRefreshToken();
      const newToken = res?.access_token;

      if (newToken) {
        localStorage.setItem("access-token", newToken);
        return newToken;
      }
      return null;
    }
    return token;
  }

  return null;
};

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosService from "../helpers/axiosHelper";

export default function useUserActions() {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/api"

  function login(data) {
    return axios.post(`${baseUrl}/auth/login/`, data)
      .then(res => {
        setUserData(res.data);
        navigate("/");
      })
  }

  async function register(data) {
    const response = await axios.post(
      `${baseUrl}/auth/register/`,
      data
    )
    setUserData(response.data);
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("auth");
    navigate("/login/")
  }

  function edit(data, userId) {
    return axiosService
      .patch(
        `/user/${userId}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
        )
      .then(res => {
        setUserData({
          user: res.data,
          access: getAccessToken(),
          refresh: getRefreshToken(),
        });
      })
  }

  return {
    login,
    register,
    logout,
    edit,
  };
}

function getAuth() {
  const auth = localStorage.getItem("auth");
  return auth && JSON.parse(auth);
}

export function getUser() {
  return getAuth()?.user;
}

export function getAccessToken() {
  return getAuth()?.access;
}

export function getRefreshToken() {
  return getAuth()?.refresh;
}

export function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data?.access,
      refresh: data?.refresh,
      user: data?.user,
    })
  );
}

export function getUserAvatar(user = null) {
  user = user || getUser();

  const pattern = /https?:\/\//

  return user?.avatar
    && (
      user.avatar.match(pattern)
        ? user.avatar
        : `http://localhost:8000/${user.avatar}`);
}
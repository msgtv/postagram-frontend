import axios from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
  getRefreshToken,
  getUser,
  setUserData,
  getAccessToken
} from "../hooks/user.action";

const axiosService = axios.create(
  {
    baseURL: "http://localhost:8000/api/",
    headers: {
      "Content-Type": "application/json",
    }
  }
)

axiosService.interceptors.request.use(
  async config => {
    /*
    Получить access token из localStorage
    и добавить в headers запроса
     */
    const access = getAccessToken();

    config.headers.Authorization = `Bearer ${access}`;

    return config;
  })

axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

const refreshAuthLogic = async (failedRequest) => {
  const refresh = await getRefreshToken();

  return axios
    .post(
      "/auth/refresh/",
      { refresh },
    {
      baseURL: "http://localhost:8000/api",
    })
    .then(resp => {
      const user = getUser();
      const { access } = resp.data;

      failedRequest.response.config.headers["Authorization"] = "Bearer " + access;

      setUserData({
        access,
        refresh,
        user,
      })
    })
    .catch(err => {
      console.error(err);
      localStorage.removeItem("auth");
    })
}

createAuthRefreshInterceptor(
  axiosService,
  refreshAuthLogic,
)

export function fetcher(url) {
  return axiosService.get(url).then(res => res.data);
}

export default axiosService;
import axios from "axios";

//요청용 axios 인터셉터
axios.interceptors.request.use(
  (request) => {
    const token = window.localStorage.getItem("token");
    if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  },
  (error) => {
    console.log("axios 인터셉터 처리 중 에러");
  }
);

export default axios;

import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_API_ROOT;
// const storedToken = useSelector((state) => state?.authSlice?.userToken);

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
});

instance?.interceptors.request.use((request) => {
  console.log("request", request);
  if (true) {
    request.headers = {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbWFuQGdtYWlsLmNvbSIsImlhdCI6MTcyMDQzNDQzM30.kXdqr_n8E4XVKO4kjBKdGv-jDBvGErzQDUHNgv0d7zc",
      // storedToken,
    };
  }
  return request;
});

export default instance;

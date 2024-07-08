import instance from "./httpInterceptors";
const baseUrl = import.meta.env.VITE_APP_API_ROOT;

export const getRequest = (payload) => {
  return instance.get(
    payload.page
      ? `${baseUrl}${payload.url}?page=${payload.page}&limit=${
          payload.limit
        }&search=${payload.search || ""}`
      : `${baseUrl}${payload.url}?search=${
          payload.search || ""
        }``${baseUrl}${payload.url}`
  );
};

export const postRequest = (url, body) => {
  return instance.post(`${baseUrl}${url}`, body);
};

export const putRequest = (url, body) => {
  return instance.put(`${baseUrl}${url}`, body);
};

export const pathchRequest = (url, body) => {
  return instance.put(`${baseUrl}${url}`, body);
};

export const deleteRequest = (url) => {
  return instance.delete(`${baseUrl}${url}`);
};

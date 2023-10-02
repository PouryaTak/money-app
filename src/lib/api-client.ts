import { getCookie } from "@/functions/handle-cookies";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

const token = typeof window !== "undefined" && getCookie("token");

const initialConfig = {
  headers: {
    "Content-Type": "application/json",
    authorization: token || "",
  },
};

const errorHandler = (error: any) => {};

export const apiClient = {
  Get: (url: string, config: any = initialConfig) => {
    return fetch(baseUrl + url, config)
      .then((res) => res.json())
      .catch((err) => errorHandler(err));
  },
  Post: (url: string, data: any, config: any = initialConfig) => {
    config.method = "POST";
    config.body = JSON.stringify(data);
    return fetch(baseUrl + url, config)
      .then((res) => res.json())
      .catch((err) => errorHandler(err));
  },
  Put: (url: string, data: any, config: any = initialConfig) => {
    config.method = "PUT";
    config.body = JSON.stringify(data);
    return fetch(baseUrl + url, config)
      .then((res) => res.json())
      .catch((err) => errorHandler(err));
  },
  Delete: (url: string, config: any = initialConfig) => {
    config.method = "DELETE";
    return fetch(baseUrl + url, config)
      .then((res) => res.json())
      .catch((err) => errorHandler(err));
  },
};

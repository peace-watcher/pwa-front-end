import axios from "axios";

const client = axios.create({
  baseURL: "https://peacewatcher.shop/alert/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "https://peacewatcher.shop/alert/",
  },
});

export const postDeviceToken = async (token: string) => {
  try {
    const response = await client.post(`/add`, token);
    console.log(response);
    return location;
  } catch (error) {
    console.error(error);
  }
};

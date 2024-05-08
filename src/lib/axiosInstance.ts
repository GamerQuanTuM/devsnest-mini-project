import axios from "axios";

const DEV_URL = "http://localhost:3000"

const PROD_URL = "https://devsnest-mini-project.vercel.app"

export const axiosInstance = axios.create({
    baseURL: `${PROD_URL}/api`
});

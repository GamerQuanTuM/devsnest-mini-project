import axios from "axios";

const DEV_URL = "http://localhost:3000"

const PROD_URL = ""

export const axiosInstance = axios.create({
    baseURL: `${DEV_URL}/api`
});

import axios from "axios";

const axiosFetch = axios.create({
  baseURL: "/api/v1",
});

export default axiosFetch;

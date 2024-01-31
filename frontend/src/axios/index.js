import axios from "axios";

// const client = axios.create({
//   baseURL: "http://localhost:8800/api/",
// });
const client = axios.create({
  baseURL: "https://mern-social-app-kaal.onrender.com/api/",
});

export default client;

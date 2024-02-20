import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://localhost:7056/api";

const loginService = async (userName, email, password) => {
  try {
    let url = baseUrl + "/" + "login";
    let request = {
      userName: userName,
      email: email,
      password: password,
    };
    const response = await axios.post(url, request);
    const token ="Bearer " + response.data.authToken;
    Cookies.set("token", token, { expires: 7, secure: true });
    Cookies.set("userId", response.data.userId)
    Cookies.set("role", response.data.role)

  } catch (error) {
    console.log("Veriler getirilememistir");
  }
};
export default loginService;

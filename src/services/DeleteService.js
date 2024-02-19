import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = "https://localhost:7056/api";

const deleteService = async (endpoint,request) => {
    try {
      let url = baseUrl + "/" + endpoint;
      const response = await axios.delete(url,{
        headers: {
            Authorization: `${Cookies.get("token")}`,
          },
        data:request
      });
     return response.data
    } catch (error) {
      console.log("Veriler getirilememistir");
    }
  };
  export default deleteService;
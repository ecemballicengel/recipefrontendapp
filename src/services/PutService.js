import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = "https://localhost:7056/api";

const putService = async (endpoint,request) => {
    try {
      let url = baseUrl + "/" + endpoint;
      
      const response = await axios.put(url, request,{
        headers: {
            Authorization: `${Cookies.get("token")}`,
          },
      });
     return response.data
    } catch (error) {
      console.log("Veriler getirilememistir");
    }
  };
  export default putService;
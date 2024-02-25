import axios from 'axios';
import Cookies from "js-cookie";
const baseUrl = "https://localhost:7056/api";


const getData = async (endpoint) => {

    try {
        let url = baseUrl + "/" +endpoint;        
        const response = await axios.get(url,{
            headers: {
                Authorization: `${Cookies.get("token")}`,
              },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export default getData;
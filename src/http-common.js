import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});


// TODO add this here 
// let config = {
//           headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
//         } 
        
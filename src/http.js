import Axios from "axios";

function authHeader () {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
        console.log(user)
      return { Authorization: user.token }
    } else {
      return {}
    }
  }

  const http = Axios.create({
      baseURL: "http://localhost:3131"
  })
  export {
      authHeader,
      http
  }
import { apiConnector } from "./apiConnector";
import { endPoints } from "./apis";
import { setUser } from "../Slices/profileSlice";
import toast from "react-hot-toast";
import { setToken } from "../Slices/authSlice";

const { SIGNUP_API , LOGIN_API } = endPoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`;
        
        // Local Storage use is when we refress then all the initial value in Slices will take it from localStorage
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("user",JSON.stringify({ ...response.data.user, image: userImage }));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
    }
  }

  
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  }
}

import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Logout = async () => {
  signOut(auth);
};

export default Logout;

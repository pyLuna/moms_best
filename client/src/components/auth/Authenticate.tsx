import { Dispatch, SetStateAction } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Authenticate({ openLogin, openSignUp, setOpenLogin, setOpenSignUp} : {
    openLogin: boolean;
    openSignUp:boolean;
    setOpenLogin: Dispatch<SetStateAction<boolean>>;
    setOpenSignUp: Dispatch<SetStateAction<boolean>>;
}) {

  return (
    <>
    <Login open={openLogin} setOpen={setOpenLogin} onSignUp={setOpenSignUp}/>
    <SignUp open={openSignUp} setOpen={setOpenSignUp} onLogin={setOpenLogin}/>
    </>
  );
}

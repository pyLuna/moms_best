import { Dispatch, SetStateAction } from "react";
import SubmitButton from "../form/submit.button";
import { Button } from "../ui/button";
import { LabelCheckbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LabeledInput from "../ui/labeled.input";

type LoginProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ open, setOpen }: LoginProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Please enter your email and password to continue.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <LabeledInput
            label="Email"
            type="email"
            placeholder="john.doe@email.com"
          />
          <LabeledInput
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <div className="flex justify-between gap-2">
            <LabelCheckbox
              id="remember-me"
              label="Remember Me"
            />
            <Button
              variant="link"
              onClick={() => setOpen(false)}
            >
              Forgot Password?
            </Button>
          </div>
          <SubmitButton text="Login" />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

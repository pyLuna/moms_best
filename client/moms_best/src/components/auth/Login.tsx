import { useUser } from "@/contexts/UserContext";
import { ApiUrl } from "@/url/ApiUrl";
import { Fetcher } from "@/url/Fetcher";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
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
  const user = useUser();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const api = new Fetcher(ApiUrl.email);

    const formData = new FormData(event.target as HTMLFormElement);

    const result = await api.post({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.ok) {
      console.error("Login failed", await result.json());
      toast.error("Login failed. Please check your credentials.");
      throw new Error("Failed to login");
    } else {
      user.refetch();
      toast.success("Login successful!", {
        description: "Welcome back!",
      });
    }

    setOpen(false);
  };

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

        <form
          className="flex flex-col gap-4"
          onSubmit={submitHandler}
        >
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

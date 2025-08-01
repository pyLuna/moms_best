import { useUser } from "@/contexts/UserContext";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
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
  const loginFetcher = useFetcher(ApiUrl.email);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData.entries());
    console.log("Login data:", data);
    const result = await loginFetcher.post(data);
    const body = await result.json();
    console.log("Login response:", body);
    if (!result.ok) {
      toast.error("Login failed. Please check your credentials.");
      throw new Error(body.error || "Failed to login");
    } else {
      user.setMetadata?.(() => body.metadata);
      user.refetch();
      user.setKey(body.metadata.key, data.rememberMe === "on");
      toast.success("Login successful!", {
        description: "Welcome back!",
      });
    }
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
            name="email"
            type="email"
            placeholder="john.doe@email.com"
          />
          <LabeledInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <div className="flex justify-between gap-2">
            <LabelCheckbox
              id="remember-me"
              label="Remember Me"
              name="rememberMe"
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

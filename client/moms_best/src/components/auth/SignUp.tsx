import { useUser } from "@/contexts/UserContext";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import SubmitButton from "../form/submit.button";
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

const SignUp = ({ open, setOpen }: LoginProps) => {
  const user = useUser();
  const fetcher = useFetcher(ApiUrl.signup.email, { useKey: false });

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("SignUp data:", data);
    const result = await fetcher.post(data);

    if (!result.ok) {
      console.error("SignUp failed", await result.json());
      toast.error("Sign Up failed. Please check your credentials.");
      throw new Error("Failed to login");
    } else {
      toast.success("Sign Up successful!", {
        description: "Welcome back!",
      });

      const apiKey = result.headers.get("x-api-key");
      if (!apiKey) {
        console.error("API key not found in response headers");
        toast.error("Sign Up successful, but API key not found.");
        return;
      }
      sessionStorage.setItem("key", apiKey);
      user.refetch();
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Fill up the form to create a new account.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          <LabeledInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
          />
          <LabeledInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
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
          <SubmitButton text="Register" />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;

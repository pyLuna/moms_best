import { useUser } from "@/contexts/UserContext";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../form/submit.button";
import { LabelCheckbox } from "../ui/checkbox";
import { ComboboxPopover } from "../ui/combobox";
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

const roles = [
  { value: "seller", label: "Trade or sell something" },
  { value: "user", label: "Interact and chat with everyone" },
];

if (import.meta.env.MODE === "development") {
  roles.push({ value: "admin", label: "Admin" });
}

const SignUp = ({ open, setOpen }: LoginProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("user");
  const user = useUser();
  const fetcher = useFetcher(ApiUrl.signup.email);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("role", selectedRole);
    const data = Object.fromEntries(formData.entries());

    const result = await fetcher.post(data);
    const body = await result.json();
    if (!result.ok) {
      toast.error(`Sign Up failed. ${body.error || "Please try again."}`);
      throw new Error(body.error);
    } else {
      toast.success("Sign Up successful!", {
        description: "Welcome back!",
      });

      const metadata = body.metadata;
      if (!metadata) {
        console.error("API key not found in response headers");
        toast.error("Sign Up successful, but API key not found.");
        return;
      }
      user.setMetadata?.(() => metadata);
      user.setKey(metadata.key);

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
          className="flex flex-col gap-4 md:gap-6"
          onSubmit={submitHandler}
        >
          <ComboboxPopover
            items={roles}
            label="I want to"
            selectedValue={selectedRole}
            placeholder="Select Role"
            onChange={(value) => setSelectedRole(value)}
          />
          <LabeledInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
            required
          />
          <LabeledInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
            required
          />
          <LabeledInput
            label="Email"
            name="email"
            type="email"
            placeholder="john.doe@email.com"
            required
          />
          <LabeledInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <LabelCheckbox
            id="remember-me"
            name="rememberMe"
            label="Remember Me"
          />
          <SubmitButton text="Register" />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;

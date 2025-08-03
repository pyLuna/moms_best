import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const SubmitButton = ({
  children,
  ...props
}: {
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const form = useFormStatus();

  return (
    <Button
      disabled={form.pending}
      type="submit"
      {...props}
    >
      {form.pending ? (
        <span className="animate-spin">
          <Loader2Icon />
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;

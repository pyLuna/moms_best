import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const SubmitButton = ({
  text,
  ...props
}: {
  text: string;
  [key: string]: any;
}) => {
  const form = useFormStatus();

  return (
    <Button
      disabled={form.pending}
      type="submit"
      className="s"
      {...props}
    >
      {form.pending ? (
        <span className="animate-spin">
          <Loader2Icon />
        </span>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;

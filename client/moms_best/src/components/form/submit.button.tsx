import { Button } from "../ui/button";

const SubmitButton = ({
  text,
  ...props
}: {
  text: string;
  [key: string]: any;
}) => {
  return (
    <Button
      type="submit"
      className="s"
      {...props}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;

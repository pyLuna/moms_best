import { Input } from "./input";
import { Label } from "./label";

const LabeledInput = ({
  label,
  type = "text",
  ...props
}: {
  label: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Label className="flex flex-col gap-2 items-start">
      {label}
      <Input
        className="text-sm"
        type={type}
        {...props}
      />
    </Label>
  );
};

export default LabeledInput;

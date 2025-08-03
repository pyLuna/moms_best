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
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        className="text-sm"
        type={type}
        {...props}
      />
    </div>
  );
};

export default LabeledInput;

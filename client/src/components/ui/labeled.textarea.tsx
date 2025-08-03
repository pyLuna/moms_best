import { Label } from "./label";
import { Textarea } from "./textarea";

const LabeledTextarea = ({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <>
      <Label className="flex flex-col gap-2 items-start">
        {label}
        <Textarea
          className="text-sm"
          {...props}
        />
      </Label>
    </>
  );
};

export default LabeledTextarea;

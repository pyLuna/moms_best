import WebFont from "webfontloader";

const IconName = ({
  initial = true,
  className,
}: {
  initial?: boolean;
  className?: string;
}) => {
  WebFont.load({
    google: {
      families: ["Tangerine"],
    },
  });

  return (
    <h1
      className={`text-3xl md:text-4xl font-semibold mt-2 ${className}`}
      style={{ fontFamily: "Tangerine" }}
    >
      {initial ? "MB" : "Mom's Best"}
    </h1>
  );
};

export default IconName;

import { useEffect } from "react";
import WebFont from "webfontloader";

const IconName = ({ initial = true }: { initial?: boolean }) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Tangerine"],
      },
    });
  }, []);

  return (
    <h1
      className="text-5xl font-semibold mt-2"
      style={{ fontFamily: "Tangerine" }}
    >
      {initial ? "MB" : "Mom's Best"}
    </h1>
  );
};

export default IconName;

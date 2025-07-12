export type VariantType = "primary" | "text";

export const differentVariants = new Map<string, string>([
  ["primary", "font-medium bg-primary-300 text-white hover:bg-primary-200"],
  [
    "text",
    "bg-transparent font-medium text-primary-300 hover:bg-primary-800/70",
  ],
]);

export const getVariantClass = (variant: VariantType): string => {
  return differentVariants.get(variant)!;
};

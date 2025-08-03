export type VariantType = keyof typeof differentVariants;

export const differentVariants = {
  primary:
    "font-medium text-primary-foreground !bg-primary hover:!bg-primary/80 rounded-default cursor-pointer px-4 py-2",
  text: "bg-transparent font-medium rounded-default cursor-pointer px-4 py-2",
} as const;

export const getVariantClass = (variant: VariantType): string => {
  return differentVariants[variant] || differentVariants.primary;
};

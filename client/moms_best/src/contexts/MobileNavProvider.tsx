import { createContext, ReactNode, useContext, useState } from "react";

const MobileNavContext = createContext<{
  isOpen: boolean;
  toggle: (v?: boolean) => void;
}>({
  isOpen: false,
  toggle: () => {},
});

const MobileNavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (v?: boolean) => {
    setIsOpen((prev) => v ?? !prev);
  };

  return (
    <MobileNavContext.Provider value={{ isOpen, toggle }}>
      {children}
    </MobileNavContext.Provider>
  );
};

const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavProvider");
  }
  return context;
};

export default MobileNavProvider;
export { MobileNavContext, useMobileNav };

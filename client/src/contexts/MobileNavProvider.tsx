import { createContext, ReactNode, useContext, useRef, useState } from "react";

/**
 * MobileNavContext provides a context for managing the state of a mobile navigation menu.
 * It allows components to toggle the visibility of the navigation menu and provides a way to handle navigation logic.
 */
const MobileNavContext = createContext<{
  isOpen: boolean;
  toggle: (v?: boolean) => void;
  navigateRef?: React.RefObject<() => boolean> | undefined;
  setNavigateCallback?: (callback: () => boolean) => void;
}>({
  isOpen: false,
  toggle: () => {},
  navigateRef: undefined,
  setNavigateCallback: () => {},
});

const MobileNavProvider = ({ children }: { children: ReactNode }) => {
  // State to manage the open/close state of the mobile navigation
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Ref to store the navigation callback
  const navigateRef = useRef<() => boolean>(() => true);

  // Function to toggle the navigation state
  const toggle = (v?: boolean) => {
    setIsOpen((prev) => v ?? !prev);
  };

  // Function to set the navigation callback
  const setNavigateCallback = (callback: () => boolean) => {
    navigateRef.current = callback;
  };

  return (
    <MobileNavContext.Provider
      value={{ isOpen, toggle, navigateRef, setNavigateCallback }}
    >
      {children}
    </MobileNavContext.Provider>
  );
};

/**
 * @returns The current context value for mobile navigation.
 * @throws Will throw an error if used outside of a MobileNavProvider.
 */
const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavProvider");
  }
  return context;
};

export default MobileNavProvider;
export { MobileNavContext, useMobileNav };

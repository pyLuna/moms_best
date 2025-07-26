import { useMobileNav } from "@/contexts/MobileNavProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

const MobileSideNav = () => {
  const { isOpen, toggle } = useMobileNav();
  return (
    <Sheet
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Navigate through the app</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideNav;

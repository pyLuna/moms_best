import IconName from "./icon/IconName";
import Button from "./ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-2">
      <IconName
        initial={false}
        className="text-primary-200"
      />
      <nav className="flex gap-4 items-center">
        <a href="">Home</a>
        <a href="">Test</a>
        <a href="">Test</a>
        <Button variant="text">Sign In</Button>
        <Button>Create Account</Button>
      </nav>
    </div>
  );
};

export default Header;

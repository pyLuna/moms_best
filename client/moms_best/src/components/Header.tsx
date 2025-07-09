import IconName from "./icon/IconName";

const Header = () => {
    return (
        <div className="flex items-center justify-between px-4">
            <IconName initial={false} />
            <nav className="flex gap-4">
                <a href="">Home</a>
                <a href="">Test</a>
                <a href="">Test</a>
            </nav>
        </div>
    )
}

export default Header;
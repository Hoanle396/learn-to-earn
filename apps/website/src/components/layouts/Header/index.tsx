import ConnectWallet from "@/components/button/ConnectWallet";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5";
type MenuProps = {
  href: string;
  title: string;
};

const MenuItem = ({ href, title }: MenuProps) => {
  const pathname = usePathname();
  return (
    <li className="max-lg:border-b max-lg:py-3 px-3">
      <Link
        href={href}
        className={cn({
          "lg:hover:text-primary block font-medium text-[18px]": true,
          "text-[#007bff]": pathname === href,
          "text-gray-500": pathname !== href,
        })}
      >
        {title}
      </Link>
    </li>
  );
};

const Header = () => {
  const [toggle, onToggle] = useToggle();

  const handleToggle = () => {
    onToggle();
  };

  return (
    <header className="flex border-b py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="container mx-auto flex flex-wrap items-center gap-5 w-full">
        <Link href="/">
          <img src="/logo_full.svg" alt="logo" className="w-36" />
        </Link>
        <div
          className={cn({
            "max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50":
              true,
            "!block": toggle,
            "!none": !toggle,
          })}
        >
          <ul className="lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 relative">
            <button
              onClick={handleToggle}
              className="top-4 lg:hidden absolute right-4 z-[100]"
            >
              <IoClose className="w-4 h-4" />
            </button>
            <li className="mb-6 hidden max-lg:block">
              <Link href="/">
                <img src="/logo_full.svg" alt="logo" className="w-36" />
              </Link>
            </li>
            <MenuItem href="/" title="Home" />
            <MenuItem href="/learn" title="Learn" />
            <MenuItem href="/ranking" title="Ranking" />
            <MenuItem href="/for-education" title="For education" />
            <MenuItem href="/about" title="About" />
          </ul>
        </div>
        <div className="flex ml-auto">
          <div className="flex rounded outline outline-transparent">
            <ConnectWallet />
          </div>
        </div>
        <button onClick={handleToggle} className="lg:hidden ml-auto">
          <IoMenu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;

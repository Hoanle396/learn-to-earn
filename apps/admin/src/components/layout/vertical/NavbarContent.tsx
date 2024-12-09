import classnames from "classnames";

import ModeDropdown from "@components/layout/shared/ModeDropdown";
import UserDropdown from "@components/layout/shared/UserDropdown";
import NavSearch from "@components/layout/shared/search";
// Component Imports
import NavToggle from "./NavToggle";

// Util Imports
import { verticalLayoutClasses } from "@layouts/utils/layoutClasses";
import ConnectWallet from "@/components/button/ConnectWallet";

const NavbarContent = () => {
  return (
    <div
      className={classnames(
        verticalLayoutClasses.navbarContent,
        "flex items-center justify-between gap-4 is-full",
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <NavToggle />
        <NavSearch />
      </div>
      <div className="flex items-center">
        <ConnectWallet />
        <ModeDropdown />
        <UserDropdown />
      </div>
    </div>
  );
};

export default NavbarContent;

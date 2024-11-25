import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

import close from "./svg/close.svg";
import menu from "./svg/menu.svg";
import search from "./svg/search.svg";

const IconList = {
  search,
  menu,
  close,
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type Icon = ForwardRefExoticComponent<IconProps>;

const Icons = IconList as Record<keyof typeof IconList, Icon>;
export default Icons;

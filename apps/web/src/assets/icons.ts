import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

import search from './svg/search.svg';
import menu from './svg/menu.svg';
import close from './svg/close.svg';

const IconList = {
  search,
  menu,
  close
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type Icon = ForwardRefExoticComponent<IconProps>;

export const Icons = IconList as Record<keyof typeof IconList, Icon>;

// MUI Imports
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { ArchiveMainBroken, ChartPieBroken, FlashMainBroken, PetMainBroken } from 'icons-next'

// Third-party Imports
import PerfectScrollbar from "react-perfect-scrollbar";

// Type Imports
import type { VerticalMenuContextProps } from "@menu/components/vertical-menu/Menu";

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from "@menu/vertical-menu";

// Hook Imports
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/vertical/menuItemStyles";
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles";

type RenderExpandIconProps = {
  open?: boolean;
  transitionDuration?: VerticalMenuContextProps["transitionDuration"];
};

const RenderExpandIcon = ({
  open,
  transitionDuration,
}: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className="ri-arrow-right-s-line" />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({
  scrollMenu,
}: {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
}) => {
  // Hooks
  const theme = useTheme();
  const { isBreakpointReached, transitionDuration } = useVerticalNav();

  const ScrollWrapper = isBreakpointReached ? "div" : PerfectScrollbar;

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: "bs-full overflow-y-auto overflow-x-hidden",
          onScroll: (container) => scrollMenu(container, false),
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: (container) => scrollMenu(container, true),
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon
            open={open}
            transitionDuration={transitionDuration}
          />
        )}
        renderExpandedMenuItemIcon={{ icon: <i className="ri-circle-line" /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem icon={<i className="ri-home-smile-line" />} href="/">
          Dashboards
        </MenuItem>
        <MenuSection label="Course management">
          <MenuItem
            href="/courses"
            icon={<FlashMainBroken className="w-5 h-5" />}
          >
            Courses
          </MenuItem>
          <MenuItem href="/ranking" icon={<ArchiveMainBroken className="w-5 h-5" />}>
            Ranking
          </MenuItem>
          <MenuItem href="/users" icon={<PetMainBroken className="w-5 h-5" />}>
            Users
          </MenuItem>

        </MenuSection>
        <MenuSection label="Statistics">
          <MenuItem
            href="/statistics"
            icon={<ChartPieBroken className="w-5 h-5" />}
          >
            Chart
          </MenuItem>
        </MenuSection>
        <MenuSection label="Misc">
          <SubMenu label="Others" icon={<i className="ri-more-line" />}>
            <MenuItem suffix={<Chip label="New" size="small" color="info" />}>
              Item With Badge
            </MenuItem>
            <MenuItem
              href="https://themeselection.com"
              target="_blank"
              suffix={<i className="ri-external-link-line text-xl" />}
            >
              External Link
            </MenuItem>
            <SubMenu label="Menu Levels">
              <MenuItem>Menu Level 2</MenuItem>
              <SubMenu label="Menu Level 2">
                <MenuItem>Menu Level 3</MenuItem>
                <MenuItem>Menu Level 3</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>Disabled Menu</MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  );
};

export default VerticalMenu;

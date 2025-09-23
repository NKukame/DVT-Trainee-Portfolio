import { useThemedLayoutContext } from "@refinedev/mui";
import Menu from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const HamburgerIcon = (props) => (
  <IconButton color="inherit" aria-label="open drawer" edge="start" {...props}>
    <Menu />
  </IconButton>
);

export const HamburgerMenu = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <>
      <HamburgerIcon
        onClick={() => setSiderCollapsed(!siderCollapsed)}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          ...(!siderCollapsed && { display: "none" }),
        }}
      />
      <HamburgerIcon
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          ...(mobileSiderOpen && { display: "none" }),
        }}
      />
    </>
  );
};

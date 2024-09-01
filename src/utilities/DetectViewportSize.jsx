import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const isMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm")); // Mobile view
};
export const isTablet = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between("sm", "md"));
};

export const isDesktop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md")); // Desktop view
};

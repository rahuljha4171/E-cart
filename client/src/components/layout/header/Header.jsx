import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineLogin,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./header.css";
import { Badge } from "@mui/material";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const options = [
    { name: "Orders", func: orders },
    { name: "Profile", func: account },
    { name: "Logout", func: logoutUser },
  ];

  if (isAuthenticated) {
    if (user.role === "admin") {
      options.unshift({
        name: "Dashboard",
        func: dashboard,
      });
    }
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully!");
  }

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#F44336" }}
      className="mainNavbar"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "revert-layer",
              fontWeight: 900,
              fontSize: "2.2rem",
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Cart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                onClick={handleCloseNavMenu}
              >
                <Typography
                  sx={{
                    marginBottom: 1,
                  }}
                >
                  <AiOutlineSearch /> Search
                </Typography>
                <Typography
                  sx={{
                    marginBottom: 1,
                  }}
                >
                  <AiOutlineShoppingCart />
                  {cartItems.length ? `(${cartItems.length})` : "(0)"} Cart
                </Typography>
                <Typography
                  sx={{
                    marginBottom: 1,
                  }}
                >
                  Products
                </Typography>
                <Typography
                  sx={{
                    marginBottom: 1,
                  }}
                >
                  Contact
                </Typography>
                <Typography>About</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Cart
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              color: "#fff",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              href="/"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "flex" }}
            >
              Home
            </Button>
            <Button
              href="/products"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "flex" }}
            >
              Products
            </Button>
            <Button
              href="/contact"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "flex" }}
            >
              Contact
            </Button>
            <Button
              href="/about"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "flex" }}
            >
              About
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "end",
              marginRight: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              href="/search"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <AiOutlineSearch /> Search
            </Button>
            <Button
              href="/cart"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <IconButton
                size="meduim"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge
                  badgeContent={cartItems.length ? `${cartItems.length}` : "0"}
                  color="error"
                >
                  <AiOutlineShoppingCart />
                </Badge>
              </IconButton>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isAuthenticated ? (
              <Button
                href="/login"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <AiOutlineLogin /> Login
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {options.map((item) => (
                    <MenuItem key={item.name} onClick={item.func}>
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

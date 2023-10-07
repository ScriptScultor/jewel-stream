import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import UpdateIcon from "@mui/icons-material/Update";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ViewListIcon from "@mui/icons-material/ViewList";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/auth/LoginAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import NavAvatar from "../Shared/Header/NavAvatar/NavAvatar"; // Import the NavAvatar component
import DashboardLayout from "../../layout/DashboardLayout";

const drawerWidth = 240;

const menuItems = [
  { title: "Dashboard Home", route: "/dashboard", icon: <HomeIcon /> },
  {
    title: "Update Products",
    route: "/dashboard/product-update",
    icon: <UpdateIcon />,
  },
  {
    title: "Provide Feedback",
    route: "/dashboard/feedback",
    icon: <FeedbackIcon />,
  },
  {
    title: "Request Advertising",
    route: "/dashboard/advertising-request",
    icon: <SlideshowIcon />,
  },
  {
    title: "View All Products",
    route: "/dashboard/all-products",
    icon: <ViewListIcon />,
  },
  {
    title: "Add Category",
    route: "/dashboard/category-subcategory-request",
    icon: <CategoryIcon />,
  },
  {
    title: "My Profile Settings",
    route: "/dashboard/profile",
    icon: <AccountCircleIcon />,
  },
];

function Dashboard(props) {
  const { window } = props;
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.auth);

  // Toggle the mobile navigation drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  const drawer = (
    <div>
      <Toolbar className="p-0">
        <img
          className="logo"
          src="https://drive.google.com/uc?export=view&id=1I0wdxR7U_nTXZBglx9U7BMDYAZB2ii6Y"
          alt=""
        />
      </Toolbar>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            className="text-dark"
            component={Link}
            to={item.route}
            key={index}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <DashboardLayout>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* App bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            {/* Mobile navigation menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/* App title */}
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            {/* Home link */}
            <Typography className="mx-auto" variant="h6" noWrap component="div">
              <Link to="/">
                <HomeIcon /> Home
              </Link>
            </Typography>
            {/* NavAvatar component for user account */}
            <NavAvatar />
          </Toolbar>
        </AppBar>

        {/* Navigation drawer */}
        <Box
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            backgroundColor: "#f8f9fb",
          }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f8f9fb",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f8f9fb",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Switch>
            {/* Render routes based on menuItems */}
            {console.log(history.location.pathname)}
            {menuItems.map((item) => (
              <Route key={item.route} path={item.route} exact>
                <Typography variant="h3">{item.route}</Typography>
              </Route>
            ))}
          </Switch>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;

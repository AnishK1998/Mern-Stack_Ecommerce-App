import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  // console.log("printing image ",user.avatar.url)
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial Tooltip Example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
        icon={
          <img className="speedDialIcon" src={user.avatar.url} alt="profile" />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            tooltipTitle={item.name}
            onClick={item.func}
            icon={item.icon}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;

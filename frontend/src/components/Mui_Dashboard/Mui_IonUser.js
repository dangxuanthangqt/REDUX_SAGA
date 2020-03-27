import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    Link: {
        textDecoration: 'none'
    }
}))
function Mui_IconUser() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [User, setUser] = React.useState({});
    const classes = useStyles();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {

        if (localStorage.getItem("refreshToken")) {
            var Decode = jwtDecode(localStorage.getItem("refreshToken"));

            setUser(Decode.data)
        }


    }, []);
    return (
        <div style={{
            display: "flex",
            alignItems: "center"
        }}>
            <Typography variant="h6">
                {`Hi, ${User.email}`}
            </Typography>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}><Link  to="/login">Logout</Link></MenuItem>
            </Menu>
        </div>
    );
}

export default Mui_IconUser;
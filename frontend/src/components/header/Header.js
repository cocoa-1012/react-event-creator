import React, { useEffect } from 'react';
import { Menu, Avatar } from 'antd';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { findMe } from 'store/action/auth.action';
import { fetchAllEvents } from 'store/action/event.action';
import { getAllUser } from 'store/action/user.action';
import { logout } from 'store/action/auth.action';
import { useNavigate, useLocation } from 'react-router-dom';
import routeList from 'utils/routeList';
import useQuery from 'hook/useQuery';
const useStyles = createUseStyles({
  subMenu: {
    padding: 0,
  },
  main: {
    display: 'flex',
    justifyContent: 'end',
    boxShadow: '0px 0px 10px 1px #d3d3d3',
    padding: '10px 0',
    marginBottom: 10,
    position: ' fixed',
    width: ' 100%',
    zIndex: ' 1000',
    height: ' 65px',
    background: ' white',
  },
});

const Header = (props) => {
  const classes = useStyles();
  const {
    findMe,
    fetchAllEvents,
    getAllUser,
    logout,
    name,
    isAdmin,
    isAuthenticated,
    isPassReset,
  } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const messageQuery = useQuery('message');
  useEffect(() => {
    if (isAuthenticated) {
      findMe();
      fetchAllEvents();
    }
  }, [findMe, isAuthenticated, fetchAllEvents]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      getAllUser();
    }
  }, [getAllUser, isAdmin, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      if (!isPassReset && pathname !== routeList.profile.updatePassword) {
        navigate(
          `${routeList.profile.updatePassword}?message=Please update your password first`
        );
      }
    }
  }, [isAuthenticated, isPassReset, messageQuery, navigate, pathname]);

  const logoutHandler = () => {
    const result = logout();
    if (result) {
      navigate('/');
    }
  };
  return (
    <div className={classes.main}>
      <div>
        <Menu mode='horizontal' style={{ border: 0 }}>
          <Menu.SubMenu
            key='SubMenu'
            className={classes.subMenu}
            icon={
              <Avatar src={`https://eu.ui-avatars.com/api/?name=${name}`} />
            }
          >
            <Menu.Item key='setting:1'>
              <Link to={routeList.profile.view}>Profile</Link>
            </Menu.Item>
            <Menu.Item key='setting:2'>
              <Link to={routeList.profile.updatePassword}>Change Password</Link>
            </Menu.Item>
            <Menu.Item key='setting:3' onClick={logoutHandler}>
              Log Out
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { name, isPassReset } = state.auth.me;
  const { isAdmin } = state.auth.user;
  const { isAuthenticated } = state.auth;
  return { name, isAdmin, isAuthenticated, isPassReset };
};

const actions = { findMe, fetchAllEvents, getAllUser, logout };

export default connect(mapStateToProps, actions)(Header);

import React from 'react';
import Header from 'components/header/Header';
import { Row, Col } from 'antd';
import Sidebar from 'components/sidebar/Sidebar';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';

const useStyles = createUseStyles({
  contentArea: {},
  contentWrapper: {
    boxSizing: 'border-box',
    padding: '20px 30px',
    paddingTop: '90px',
    minHeight: '100vh',
    background: '#dbdbdb',
  },
  bgWhite: {
    background: '#fff',
    padding: 35,
    overflow: 'hidden',
    borderRadius: 10,
  },
});
const Layout = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  if (pathname === '/') {
    return children;
  }
  return (
    <div>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <div className={classes.contentArea}>
        <Row className='bg-grey-red'>
          <Col span={5} className='bg-grey-red'>
            <div className='bg-grey-red'>
              <Sidebar />
            </div>
          </Col>
          <Col span={19}>
            <div className={classes.contentWrapper}>
              <div className={classes.bgWhite}>{children}</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Layout;

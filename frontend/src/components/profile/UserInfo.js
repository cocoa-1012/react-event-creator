import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import style from './userInfo.module.css';
import { FaPencilAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateUserFullName } from 'store/action/auth.action';

const UserInfo = ({ userData, updateUserFullName }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [value, setValue] = useState('');

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      setIsEdit(false);
      updateUserFullName(value);
    }
  };

  useEffect(() => setValue(userData.name), [userData.name]);

  return (
    <div>
      <div>
        <Row>
          <Col xs={24} md={20} xl={18}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Option</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Name</td>
                  <td className={style.username}>
                    {isEdit ? (
                      <input
                        className='ant-input'
                        type='text'
                        placeholder='Enter your sname'
                        style={{ width: '90%' }}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        onKeyPress={keyDownHandler}
                      />
                    ) : (
                      <span>{userData.name}</span>
                    )}
                    <div
                      className={style.icon}
                      onClick={() => setIsEdit((prev) => !prev)}
                    >
                      {isEdit ? <AiFillCloseCircle /> : <FaPencilAlt />}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Username</td>
                  <td>{userData.username}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Emails</td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Role</td>
                  <td>{userData.user_type === 'A' ? 'Admin' : 'User'}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Last Login</td>
                  <td>
                    {moment(userData.last_login).format('DD MMMM YYYY h:mm A')}
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Created At</td>
                  <td>
                    {moment(userData.createdAt).format('DD MMMM YYYY h:mm A')}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { me } = state.auth;

  return { userData: me };
};
export default connect(mapStateToProps, { updateUserFullName })(UserInfo);

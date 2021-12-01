import { Button, Space, Table, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { connect } from 'react-redux';
import { deleteUser } from 'store/action/user.action';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Date Added',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => moment(value).format('D-MMM-YYYY  h:mm a'),
  },
  {
    title: 'Last Login',
    dataIndex: 'last_login',
    key: 'last_login',
    render: (value) => moment(value).format('D-MMM-YYYY  h:mm a'),
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'action',
    render: (id, { deleteUser }) => {
      return (
        <Space>
          <Popconfirm
            okText='Yes'
            cancelText='No'
            title='Are you sure to delete this user?'
            onConfirm={() => deleteUser(id)}
          >
            <Button>
              <FaTrashAlt />
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];
const UserTable = ({ users, deleteUser }) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setDataSource(
      users.map((user) => {
        user.deleteUser = deleteUser;
        return user;
      })
    );
  }, [users, deleteUser]);
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey='id' />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state.user;
  return { users };
};

export default connect(mapStateToProps, { deleteUser })(UserTable);

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, Space, Table } from 'antd';

import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { sliceString } from 'utils/stringHelper';
import moment from 'moment';
import { deleteEvent } from 'store/action/event.action';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Coordinates',
    dataIndex: 'coordinates',
    key: 'coordinates',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description) => sliceString(description),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },

  {
    title: 'Ticket Price',
    dataIndex: 'ticket_price',
    key: 'ticket_price',
    render: (price) => (price ? '$' + price : 'Free'),
  },
  {
    title: 'Source Url',
    dataIndex: 'source_url',
    key: 'source_url',
    render: (url) => <a href={url}>Source</a>,
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'action',
    render: (id, { deleteEvent }) => {
      return (
        <Space>
          <Button>
            <Link to={`/event/edit/${id}`}>
              <FaPen />
            </Link>
          </Button>
          <div className='yea'>
            <Popconfirm
              title='Are you want to delete this event？'
              onConfirm={() => deleteEvent(id)}
              okText='Yes'
              cancelText='No'
            >
              <Button>
                <FaTrashAlt />
              </Button>
            </Popconfirm>
          </div>
        </Space>
      );
    },
  },
];
const EventTable = ({ events, deleteEvent }) => {
  const dataSource = events?.map((event) => {
    const location = `${event.address || ' '} ${event.city || ' '} ${
      event.country || ' '
    }`;
    const date_from = event.date_from
      ? moment(event.date_from).format('MMM DD, Y')
      : '';
    const date_to = event.date_to
      ? moment(event.date_to).format('MMM DD, Y')
      : '';
    const date = `${date_from} - ${date_to} `;

    const time_from = event.time_from
      ? moment(event.time_from).format('h:mm a')
      : '';
    const time_to = event.time_to ? moment(event.time_to).format('h:mm a') : '';
    const time = time_from && time_to ? `${time_from} - ${time_to}` : '';

    const data = { ...event, location, date, time };
    data.deleteEvent = deleteEvent;

    return data;
  });

  return (
    <div className='table-wrapper'>
      <Table dataSource={dataSource} columns={columns} rowKey='id' />
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps, { deleteEvent })(EventTable);

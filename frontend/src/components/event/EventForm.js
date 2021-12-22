import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Select,
  Typography,
  DatePicker,
  TimePicker,
  Switch,
  Space,
  message,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { FaMapMarkerAlt, FaMapMarked, FaCity } from 'react-icons/fa';
import { AiOutlineDollar, AiOutlineLink } from 'react-icons/ai';
import { validationLatitudeLongitude } from 'validation-latitude-longitude';
import moment from 'moment';
import { eventAdd, eventUpdate } from 'store/action/event.action';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventImageUpload from './EventImageUpload';
import routeList from 'utils/routeList';

const useStyles = createUseStyles({
  form: {},
  button: {
    marginTop: 20,
  },
  formWrapper: {
    marginTop: 20,
  },
});

const timeZoneList = [
  'UTC+14:00',
  'UTC+13:00',
  'UTC+12:45',
  'UTC+12:00',
  'UTC+11:00',
  'UTC+10:30',
  'UTC+10:00',
  'UTC+09:30',
  'UTC+09:00',
  'UTC+08:45',
  'UTC+07:00',
  'UTC+06:30',
  'UTC+06:00',
  'UTC+05:45',
  'UTC+05:30',
  'UTC+04:30',
  'UTC+04:00',
  'UTC+03.30',
  'UTC+03:00',
  'UTC+02:00',
  'UTC+01:00',
  'UTC+00:00',
  'UTC-01:00',
  'UTC-02:00',
  'UTC-03:00',
  'UTC-03.30',
  'UTC-04:00',
  'UTC-05:00',
  'UTC-06:00',
  'UTC-07:00',
  'UTC-08:00',
  'UTC-09:00',
  'UTC-09.30',
  'UTC-10:00',
  'UTC-11:00',
  'UTC-12:00',
];

const EventForm = ({ eventAdd, event, isEdit, eventUpdate, id, errors }) => {
  const classes = useStyles();
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState('');
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [timezone, setTimezone] = useState('');
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit) {
      const fieldValues = {
        name: event?.name || '',
        ticket_price: event?.ticket_price || '',
        address: event?.address || '',
        city: event?.city || '',
        coordinates: event?.coordinates || '',
        country: event?.country || '',
        date_from: event.date_from ? moment(event.date_from) : '',
        date_to: event.date_to ? moment(event.date_to) : '',
        time_from: event.time_from ? moment(event.time_from) : '',
        time_to: event.time_to ? moment(event.time_to) : '',
        timezone: event?.timezone || '',
        source_url: event?.source_url || '',
        description: event?.description || '',
      };
      form.setFieldsValue(fieldValues);
      setCountry(event.country || '');
      setTimezone(event.timezone || '');
    }
  }, [form, event, isEdit]);

  useEffect(() => {
    const errorObject =
      Object.keys(errors).length > 0
        ? Object.entries(errors).map(([name, value]) => {
            return {
              name,
              errors: [value],
            };
          })
        : [];
    form.setFields(errorObject);
  }, [errors, form]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      const list = res.data;
      const countries = list.map((country) => country.name.common);
      setCountryList(countries.sort());
    });
  }, []);

  const onFinish = (values) => {
    if (isEdit) {
      eventUpdate({ ...values, country, timezone }, event.id, (result) => {
        if (result) {
          navigate('/event/view');
        }
      });
    } else {
      eventAdd({ ...values, country, timezone }, (result, id) => {
        if (result) {
          form.resetFields();
          message.success('Event created. Redirecting......');
          setTimeout(() => {
            if (isImageUpload) {
              navigate(`/event/${id}/image`);
            } else {
              navigate(routeList.event.view);
            }
          }, 1000);
        }
      });
    }
  };

  return (
    <div>
      <div className={classes.formWrapper}>
        <Form
          name='normal_login'
          className={classes.form}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={10}>
            <Col span={16}>
              <Form.Item
                hasFeedback
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Name is required!',
                  },
                ]}
                key='name'
              >
                <Input
                  prefix={<UserOutlined />}
                  type='text'
                  placeholder='Enter Event name'
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item hasFeedback name='ticket_price' key='ticket_price'>
                <Input
                  prefix={<AiOutlineDollar />}
                  type='text'
                  placeholder='Enter Event price'
                />
              </Form.Item>
            </Col>
          </Row>

          <Typography.Text>Event location</Typography.Text>
          <Row gutter={20} style={{ marginTop: 10 }}>
            <Col span={12}>
              <Form.Item hasFeedback name='address' key='address'>
                <Input
                  prefix={<FaMapMarkerAlt />}
                  type='text'
                  placeholder='Enter Event address'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name='coordinates'
                rules={[
                  () => ({
                    validator(_, value) {
                      if (value) {
                        const [lat, lng] = value.trim().split(',');
                        const result = validationLatitudeLongitude.latLong(
                          lat,
                          lng
                        );
                        if (result) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Invalid Coordinates');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                key='coordinates'
              >
                <Input
                  prefix={<FaMapMarked />}
                  type='text'
                  placeholder='Enter Event coordinates'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hasFeedback name='city' key='city'>
                <Input
                  prefix={<FaCity />}
                  type='text'
                  placeholder='Enter event city'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Select
                key='country'
                showSearch
                style={{ width: '100%' }}
                placeholder='Select a country'
                optionFilterProp='children'
                value={country}
                name='country'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => setCountry(value)}
              >
                {countryList.map((country) => (
                  <Select.Option value={country} key={country}>
                    {country}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Typography.Text>Event Date and Time</Typography.Text>
          <Row gutter={20} style={{ marginTop: 10 }}>
            <Col span={12}>
              <Form.Item
                dependencies={['date_to', 'time_from', 'time_to']}
                name='date_from'
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject('Date from is required');
                      }
                      const before = moment(value).isBefore(
                        moment.now(),
                        'day'
                      );
                      const same = moment(value).isSame(moment.now(), 'day');

                      if (before || same) {
                        return Promise.reject('Date must be in future date');
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
                key='date_from'
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder='Event date from'
                  format='DD-MM-YYYY'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                dependencies={['date_from', 'time_to', 'time_from']}
                key='date_to'
                name='date_to'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.resolve();
                      }

                      const date_from = getFieldValue().date_from;
                      const before = moment(value).isBefore(date_from, 'day');

                      if (before) {
                        return Promise.reject(
                          'Date must be greater than date from'
                        );
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder='Event date to'
                  format='DD-MM-YYYY'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                dependencies={['time_to', 'date_from', 'date_to']}
                name='time_from'
                key='time_from'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const { date_to, date_from } = getFieldValue();

                      const isSame = moment(date_from).isSame(date_to, 'day');

                      if (!isSame && date_to) {
                        return Promise.resolve();
                      }

                      if (!value) {
                        return Promise.reject('Time from is required');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <TimePicker
                  style={{ width: '100%' }}
                  placeholder='Event time from'
                  format='HH:mm'
                  minuteStep={15}
                  showNow={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                dependencies={['time_from', 'date_from', 'date_to']}
                name='time_to'
                key='time_to'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const { date_to, date_from, time_from } = getFieldValue();
                      const isDateSame = moment(date_from).isSame(
                        date_to,
                        'day'
                      );

                      if (!isDateSame && date_to) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject('Time to is required');
                      }
                      const isTimeAfter = moment(value).isAfter(
                        time_from,
                        'minutes'
                      );
                      if (!isTimeAfter) {
                        return Promise.reject(
                          'Time must be greater than time from'
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <TimePicker
                  style={{ width: '100%' }}
                  placeholder='Event time to'
                  format='HH:mm'
                  minuteStep={15}
                  showNow={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='timezone'
                rules={[
                  {
                    required: true,
                    message: 'Timezone is required!',
                  },
                ]}
                key='timezone'
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder='Select event timezone'
                  optionFilterProp='children'
                  name='timezone'
                  value={timezone}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => setTimezone(value)}
                >
                  {timeZoneList.map((value) => (
                    <Select.Option value={value} key={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                key='source_url'
                name='source_url'
                rules={[
                  {
                    required: true,
                    message: 'Source url is required!',
                  },
                  {
                    type: 'url',
                    message: 'It must be valid url',
                  },
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder='Source Url'
                  prefix={<AiOutlineLink />}
                  type='url'
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            hasFeedback
            name='description'
            rules={[
              {
                required: true,
                message: 'Description is required',
              },
            ]}
            key='description'
          >
            <Input.TextArea
              prefix={<UserOutlined />}
              type='url'
              placeholder='Description'
              autoSize={{ minRows: 8, maxRows: 10 }}
            />
          </Form.Item>
          {isEdit && (
            <>
              <h4>Uploaded Images</h4>
              <EventImageUpload id={id} />{' '}
            </>
          )}
          {!isEdit && (
            <Space>
              <Switch
                checkedChildren='Yes'
                unCheckedChildren='No'
                checked={isImageUpload}
                onChange={() => setIsImageUpload((prevState) => !prevState)}
              />
              <Typography.Text>Upload image for this event</Typography.Text>
            </Space>
          )}

          <Form.Item>
            <Button type='primary' htmlType='submit' className={classes.button}>
              {isEdit ? 'Update' : 'Add'} Event
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { errors, errorType, event } = state.event;

  return {
    errors: errorType === 'add' || errorType === 'edit' ? errors : {},
    errorType,
    event,
  };
};

const actions = { eventAdd, eventUpdate };
export default connect(mapStateToProps, actions)(EventForm);

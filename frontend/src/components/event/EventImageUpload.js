import React, { useEffect } from 'react';

import { Row, Col, Image } from 'antd';
import { Button, Spin } from 'antd';
import {
  fetchEventImages,
  eventImageUpload,
  eventImageDelete,
} from 'store/action/event.action';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routeList from 'utils/routeList';

const EventImageUpload = ({
  fetchEventImages,
  images,
  eventImageUpload,
  eventImageDelete,
  id,
}) => {
  useEffect(() => fetchEventImages(id), [fetchEventImages, id]);

  const onRemove = (id) => {
    eventImageDelete({ id });
  };

  const imageOnChangHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (reader.readyState === 2) {
        const url = reader.result;
        const formData = new FormData();
        formData.append('image', file, file.filename);
        const _loadedImageUrl = ev.target.result;
        const image = document.createElement('img');
        image.src = _loadedImageUrl;
        image.onload = () => {
          const { width, height } = image;
          formData.append('width', width);
          formData.append('height', height);
          eventImageUpload({ id, url, formData });
        };
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Row wrap gutter={25}>
        {images.map((image) => (
          <Col key={Math.random()}>
            <Spin spinning={image.isUploading}>
              <Image
                width={200}
                height={200}
                src={image.url}
                alt='Upload'
                className='event-upload-image'
              />
              <Button
                type='primary'
                style={{
                  background: 'red',
                  display: 'block',
                  width: '100%',
                  marginBottom: 10,
                  border: 'transparent',
                }}
                onClick={() => onRemove(image.id)}
              >
                Remove
              </Button>
            </Spin>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <input type='file' onChange={imageOnChangHandler} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type='primary' style={{ marginTop: 10 }}>
            <Link to={routeList.event.add}>Done Image upload</Link>
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  const { images } = state.event;
  return { images };
};
const actions = { fetchEventImages, eventImageUpload, eventImageDelete };
export default connect(mapStateToProps, actions)(EventImageUpload);

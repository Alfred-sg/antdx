import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';

class EditableModal extends Component {
  state = {
    visible: false,
    dataSource: null
  };

  show = dataSource => {
    const { form } = this.props;
    this.setState({
      visible: true
    }, () => {
      form.setFieldsValue();
    });
  }

  hide = () => {
    this.setState({
      visible: false
    });
  }

  render(){
    return (
      <Modal>
      </Modal>
    );
  }
}

export default Form.create(EditableModal);
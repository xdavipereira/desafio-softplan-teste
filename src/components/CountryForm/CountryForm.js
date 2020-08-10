import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { countriesVar, selectedCountryVar } from '../../App';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { SELECTED_COUNTRY_QUERY } from '../Detail/Detail';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


 export default function CountryForm({handleCloseModal, showModal}) {
     const {loading, error, data} = useQuery(
         SELECTED_COUNTRY_QUERY
         );
         const [form] = Form.useForm();
         
  useEffect(() => {
    console.log(data)
    form.setFieldsValue({
        ...data.selectedCountry
    })

})
  





  function onOk() {
    form.submit();
  }

  function  onFinish (values) {
    const y = countriesVar();
    const x = selectedCountryVar();

    const updatedCountry = Object.assign({}, x, {
      name: values.name,
      capital: values.capital
    })


    const updatedCountries = y.map((country) => {
      if(country._id === x._id ){
        country = updatedCountry;
      }
      return country;
    })
    
    countriesVar([...updatedCountries])
    selectedCountryVar(updatedCountry)

    handleCloseModal();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Modal title="Edit Country" destroyOnClose={true} visible={showModal} onOk={onOk} onCancel={handleCloseModal}>
    <Form
     form={form} layout="vertical" preserve={false} name="userForm"
      initialValues={{
          ...data.selectedCountry
      }}

      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Capital"
        name="capital"
      >
        <Input  />
      </Form.Item>
    </Form>
  </Modal>

    )
}


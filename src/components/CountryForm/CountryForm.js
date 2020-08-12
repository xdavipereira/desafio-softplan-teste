import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { countriesVar, selectedCountryVar } from "../../cache";
import { Form, Input, Modal } from "antd";
import { SELECTED_COUNTRY_QUERY } from "../Detail/Detail";

export default function CountryForm({ handleCloseModal, showModal }) {
  const { loading, error, data } = useQuery(SELECTED_COUNTRY_QUERY);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...data.selectedCountry
    });
  });

  function onOk() {
    form.submit();
  }

  function onFinish(values) {
    const countries = countriesVar();
    const selectedCountry = selectedCountryVar();

    const updatedCountry = Object.assign({}, selectedCountry, {
      name: values.name,
      capital: values.capital
    });

    const updatedCountries = countries.map(country => {
      if (country._id === selectedCountry._id) {
        country = updatedCountry;
      }
      return country;
    });

    countriesVar([...updatedCountries]);
    selectedCountryVar(updatedCountry);

    handleCloseModal();
  }

  const onFinishFailed = errorInfo => {
  };

  return (
    <Modal
      title="Edit Country"
      destroyOnClose={true}
      visible={showModal}
      onOk={onOk}
      onCancel={handleCloseModal}
    >
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        name="userForm"
        initialValues={{
          ...data.selectedCountry
        }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Capital" name="capital">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

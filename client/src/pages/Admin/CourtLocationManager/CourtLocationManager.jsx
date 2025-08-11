import React, { useEffect, useState } from "react";
import { Button, Input, Card, Modal, Form, message, Table } from "antd";
import axios from "axios";
import * as ValidateToken from "../../../utils/authUtils";
import * as CourtServices from "../../../services/admin/courtServices";

const CourtLocationManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const fetchData = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      const res = await CourtServices.getLocation(accessToken);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLocation = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      const values = await form.validateFields();

      if (imageFiles.length === 0) {
        return message.error("Vui lòng chọn ít nhất 1 ảnh!");
      }

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      imageFiles.forEach((file) => {
        formData.append("courtImages", file);
      });

      const res = await CourtServices.createLocation(accessToken, formData);

      setLocations([...locations, res.data]);
      form.resetFields();
      setImageFiles([]);
      setIsModalOpen(false);
      message.success("Thêm địa điểm mới thành công!");
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi khi thêm địa điểm!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý địa điểm sân Pickleball</h2>
      {/* Thanh tìm kiếm */}
      <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
        <Input
          placeholder="Tìm kiếm theo tên sân..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Thêm địa điểm mới
        </Button>
      </div>
      {/* Danh sách sân */}
      {/* <Table dataSource={dataSource} columns={columns} />; */}
      {/* Modal thêm địa điểm */}
      <Modal
        title="Thêm địa điểm mới"
        open={isModalOpen}
        onOk={handleAddLocation}
        onCancel={() => setIsModalOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sân"
            name="name"
            rules={[{ required: true, message: "Nhập tên sân" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Giờ mở cửa" name="openTime">
            <Input placeholder="VD: 06:00" />
          </Form.Item>
          <Form.Item label="Giờ đóng cửa" name="closeTime">
            <Input placeholder="VD: 22:00" />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <input
              type="file"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
            />
          </Form.Item>
          <Form.Item label="Google Map link" name="googleMapLink">
            <Input placeholder="URL Google Map embed" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourtLocationManager;

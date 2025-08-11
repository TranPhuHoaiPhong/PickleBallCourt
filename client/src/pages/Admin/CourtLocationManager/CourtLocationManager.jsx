import React, { useEffect, useState, useMemo } from "react";
import { Button, Input, Modal, Form, message, Table, Image, Space } from "antd";
import * as ValidateToken from "../../../utils/authUtils";
import * as CourtServices from "../../../services/admin/courtServices";

const CourtLocationManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [editingLocationId, setEditingLocationId] = useState(null);

  // Cột hiển thị bảng
  const columns = [
    {
      title: "Tên sân",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hình ảnh",
      dataIndex: "courtImages",
      key: "courtImages",
      render: (images) =>
        images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt="Court"
            width={80}
            height={60}
            style={{ objectFit: "cover" }}
          />
        ) : (
          "Không có ảnh"
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => openEditModal(record)}
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  // Fetch danh sách location
  const fetchData = async () => {
    try {
      setLoading(true);
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await CourtServices.getLocation(accessToken);
      setLocations(Array.isArray(res) ? res.filter(Boolean) : []);
    } catch (error) {
      message.error("Lỗi khi tải danh sách địa điểm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mở modal edit + set data form
  const openEditModal = (record) => {
    setEditingLocationId(record._id);
    form.setFieldsValue({
      name: record.name,
      address: record.address,
      email: record.email,
      phone: record.phone,
      openTime: record.openTime,
      closeTime: record.closeTime,
      googleMapLink: record.googleMapLink,
    });
    setImageFiles([]);
    setIsEditModalOpen(true);
  };

  // Sửa location
  const handleUpdateLocation = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const values = await form.validateFields();

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      imageFiles.forEach((file) => {
        formData.append("courtImages", file);
      });
      const res = await CourtServices.updateLocation(
        accessToken,
        editingLocationId,
        formData
      );

      // Cập nhật lại danh sách trên UI
      setLocations((prev) =>
        prev.map((loc) => (loc._id === editingLocationId ? res.data : loc))
      );

      message.success("Cập nhật địa điểm thành công!");
      setIsEditModalOpen(false);
      setEditingLocationId(null);
      form.resetFields();
      setImageFiles([]);
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi khi sửa địa điểm!");
    }
  };

  // Thêm mới location
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

      setLocations((prev) => [...prev, res.data]);
      form.resetFields();
      setImageFiles([]);
      setIsAddModalOpen(false);
      message.success("Thêm địa điểm mới thành công!");
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi khi thêm địa điểm!");
    }
  };

  // Lọc tìm kiếm
  const filteredLocations = useMemo(() => {
    return locations.filter(
      (loc) =>
        loc?.name && loc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [locations, searchTerm]);

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
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setImageFiles([]);
            setIsAddModalOpen(true);
          }}
        >
          + Thêm địa điểm mới
        </Button>
      </div>

      {/* Danh sách sân */}
      <Table
        dataSource={filteredLocations}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal thêm địa điểm */}
      <Modal
        title="Thêm địa điểm mới"
        open={isAddModalOpen}
        onOk={handleAddLocation}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
        width={600}
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
              accept="image/*"
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
            />
          </Form.Item>
          <Form.Item label="Google Map link" name="googleMapLink">
            <Input placeholder="URL Google Map embed" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal sửa địa điểm */}
      <Modal
        title="Sửa địa điểm"
        open={isEditModalOpen}
        onOk={handleUpdateLocation}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
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
              accept="image/*"
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

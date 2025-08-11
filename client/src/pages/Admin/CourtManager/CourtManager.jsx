import React, { useState, useEffect } from "react";
import { Button, Input, Card, Modal, Form, message, Select } from "antd";
import * as CourtServices from "../../../services/admin/courtServices";
import * as ValidateToken from "../../../utils/authUtils";

const CourtManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courts, setCourts] = useState([]);
  const [locations, setLocations] = useState([]); // lưu danh sách địa điểm
  const [loading, setLoading] = useState(false);

  const [editingCourt, setEditingCourt] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Lấy danh sách địa điểm sân
  const fetchLocationCourt = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await CourtServices.getLocation(accessToken);
      setLocations(res || []); // lưu vào state
    } catch (error) {
      console.log(error);
      message.error("Không thể tải danh sách địa điểm!");
    }
  };

  useEffect(() => {
    fetchLocationCourt();
  }, []);

  // Lấy danh sách sân từ API
  const fetchCourts = async () => {
    try {
      setLoading(true);
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await CourtServices.getCourts(accessToken);
      setCourts(res || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sân:", error);
      message.error("Không thể tải danh sách sân!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleUpdateCourt = async () => {
    try {
      const values = await editForm.validateFields();
      const accessToken = await ValidateToken.getValidAccessToken();
      await CourtServices.updateCourt(accessToken, editingCourt._id, values);

      message.success("Cập nhật sân thành công!");
      setIsEditModalOpen(false);
      setEditingCourt(null);
      fetchCourts();
    } catch (error) {
      console.error(error);
      message.error("Không thể cập nhật sân!");
    }
  };

  // Xử lý thêm sân mới
  const handleAddCourt = async () => {
    try {
      const values = await addForm.validateFields();
      const accessToken = await ValidateToken.getValidAccessToken();
      await CourtServices.createCourt(accessToken, values);

      message.success("Thêm sân mới thành công!");
      addForm.resetFields();
      setIsModalOpen(false);
      fetchCourts(); // load lại danh sách sân
    } catch (error) {
      console.error(error);
      message.error("Không thể thêm sân mới!");
    }
  };

  const filteredCourts = courts.filter((court) =>
    court.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý sân Pickleball</h2>

      {/* Tìm kiếm + Thêm sân */}
      <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
        <Input
          placeholder="Tìm kiếm theo tên sân..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Thêm sân mới
        </Button>
      </div>

      {/* Danh sách sân */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          filteredCourts.map((court, index) => (
            <Card
              key={index}
              style={{ borderRadius: "8px", cursor: "pointer" }}
              onClick={() => {
                setEditingCourt(court);
                editForm.setFieldsValue({
                  name: court.name,
                  priceHour: court.priceHour,
                  location: court.location?._id || court.location,
                });
                setIsEditModalOpen(true);
              }}
            >
              <h3>{court.name}</h3>
              <p>💰 {court.priceHour?.toLocaleString()} VND/giờ</p>
              <p>📍 {court.location?.name || court.location}</p>
            </Card>
          ))
        )}
      </div>

      {/* Modal thêm sân */}
      <Modal
        title="Thêm sân mới"
        open={isModalOpen}
        onOk={handleAddCourt}
        onCancel={() => setIsModalOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="Tên sân"
            name="name"
            rules={[{ required: true, message: "Nhập tên sân" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá thuê/giờ (VND)"
            name="priceHour"
            rules={[{ required: true, message: "Nhập giá thuê" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: "Chọn địa điểm" }]}
          >
            <Select placeholder="Chọn địa điểm">
              {locations.map((loc) => (
                <Select.Option key={loc._id} value={loc._id}>
                  {loc.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa sân"
        open={isEditModalOpen}
        onOk={handleUpdateCourt}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="Tên sân"
            name="name"
            rules={[{ required: true, message: "Nhập tên sân" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá thuê/giờ (VND)"
            name="priceHour"
            rules={[{ required: true, message: "Nhập giá thuê" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: "Chọn địa điểm" }]}
          >
            <Select placeholder="Chọn địa điểm">
              {locations.map((loc) => (
                <Select.Option key={loc._id} value={loc._id}>
                  {loc.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourtManager;

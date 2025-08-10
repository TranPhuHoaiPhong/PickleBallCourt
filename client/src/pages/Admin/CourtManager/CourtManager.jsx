import React, { useState } from "react";
import { Button, Input, Card, Modal, Form, message } from "antd";

const CourtManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Danh sách sân mặc định
  const [courts, setCourts] = useState([
    { name: "Sân số 1", priceHour: 120000, location: "Sân Văn Thiện" },
    { name: "Sân số 2", priceHour: 150000, location: "Sân Hoàng Gia" },
    { name: "Sân số 3", priceHour: 100000, location: "Sân Trung Tâm" },
    { name: "Sân số 4", priceHour: 130000, location: "Sân Bình Minh" },
    { name: "Sân số 5", priceHour: 160000, location: "Sân Thành Công" },
  ]);

  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [form] = Form.useForm();

  const handleAddCourt = () => {
    form
      .validateFields()
      .then((values) => {
        setCourts([...courts, values]);
        form.resetFields();
        setIsModalOpen(false);
        message.success("Thêm sân mới thành công!");
      })
      .catch(() => {
        message.error("Vui lòng nhập đầy đủ thông tin!");
      });
  };

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
        {filteredCourts.map((court, index) => (
          <Card key={index} style={{ borderRadius: "8px" }}>
            <h3>{court.name}</h3>
            <p>💰 {court.priceHour.toLocaleString()} VND/giờ</p>
            <p>📍 {court.location}</p>
          </Card>
        ))}
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
        <Form form={form} layout="vertical">
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
            rules={[{ required: true, message: "Nhập địa điểm" }]}
          >
            <Input placeholder="Tên địa điểm hoặc ID" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourtManager;

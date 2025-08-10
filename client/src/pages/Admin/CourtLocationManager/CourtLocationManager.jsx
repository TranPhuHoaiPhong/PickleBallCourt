import React, { useState } from "react";
import { Button, Input, Card, Modal, Form, message } from "antd";

const CourtLocationManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState([
    {
      name: "Sân Văn Thiện",
      address: "456 Ninh Kiều Cần Thơ",
      email: "vanthien@gmail.com",
      phone: "0966259577",
      openTime: "17:00",
      closeTime: "22:00",
      img: "https://via.placeholder.com/300x200?text=San+Van+Thien",
      googleMapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.636965743097!2d105.7654703758332!3d10.046785972226251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0880f08006ffb%3A0x9a745510330faf4e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBL4bu5IHRodeG6rXQgLSBDw7RuZyBuZ2jhu4cgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1751532641794!5m2!1svi!2s",
    },
    {
      name: "Sân Hoàng Gia",
      address: "12 Nguyễn Trãi, Hà Nội",
      email: "hoanggia@gmail.com",
      phone: "0912345678",
      openTime: "06:00",
      closeTime: "21:00",
      img: "https://via.placeholder.com/300x200?text=San+Hoang+Gia",
      googleMapLink: "https://maps.google.com",
    },
    {
      name: "Sân Trung Tâm",
      address: "23 Lê Lợi, TP.HCM",
      email: "trungtam@gmail.com",
      phone: "0987654321",
      openTime: "07:00",
      closeTime: "20:00",
      img: "https://via.placeholder.com/300x200?text=San+Trung+Tam",
      googleMapLink: "https://maps.google.com",
    },
    {
      name: "Sân Bình Minh",
      address: "45 Trần Phú, Đà Nẵng",
      email: "binhminh@gmail.com",
      phone: "0909123456",
      openTime: "05:30",
      closeTime: "19:00",
      img: "https://via.placeholder.com/300x200?text=San+Binh+Minh",
      googleMapLink: "https://maps.google.com",
    },
    {
      name: "Sân Thành Công",
      address: "78 Lý Thường Kiệt, Huế",
      email: "thanhcong@gmail.com",
      phone: "0934567890",
      openTime: "08:00",
      closeTime: "22:00",
      img: "https://via.placeholder.com/300x200?text=San+Thanh+Cong",
      googleMapLink: "https://maps.google.com",
    },
  ]);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [form] = Form.useForm();

  const handleAddLocation = () => {
    form
      .validateFields()
      .then((values) => {
        setLocations([...locations, values]);
        form.resetFields();
        setIsModalOpen(false);
        message.success("Thêm địa điểm mới thành công!");
      })
      .catch(() => {
        message.error("Vui lòng nhập đầy đủ thông tin!");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý địa điểm sân Pickleball</h2>

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredLocations.map((loc, index) => (
          <Card
            key={index}
            cover={<img alt={loc.name} src={loc.img} />}
            style={{ borderRadius: "8px" }}
          >
            <h3>{loc.name}</h3>
            <p>📍 {loc.address}</p>
            <p>📧 {loc.email}</p>
            <p>📞 {loc.phone}</p>
            <p>
              ⏰ {loc.openTime} - {loc.closeTime}
            </p>
            <iframe
              src={loc.googleMapLink}
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title={loc.name}
            ></iframe>
          </Card>
        ))}
      </div>

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
          <Form.Item label="Link ảnh" name="img">
            <Input placeholder="URL ảnh" />
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

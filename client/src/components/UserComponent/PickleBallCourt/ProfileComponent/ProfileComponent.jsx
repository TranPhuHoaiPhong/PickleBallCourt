import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserService } from "../../../../services/users/Profile/Profile";
import { updateUser } from "../../../../redux/slides/userSlide"; 

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    id: user._id
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const data = await updateUserService({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })

      dispatch(updateUser({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
        isAdmin: data.data.isAdmin,
        _id: data.data._id
      }));
      setIsEditing(false);
    } catch (error) {
      console.log("Update failed:", error.message);
    }
  };

  return (
    <div style={{ fontSize: "18px", padding: "20px" }}>

      {isEditing ? (
        <>
        <div style={{ 
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}>
          <p>
            Tên:{" "}
            <input
              style={{
                width: "250px",
                height: "25px",
                fontSize: "16px",
                borderRadius: "5px",
                marginLeft: "25px"
              }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </p>
          <p>
            Email:{" "}
            <input
              style={{
                width: "250px",
                height: "25px",
                fontSize: "16px",
                borderRadius: "5px",
                marginLeft: "10px"

              }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </p>
          <p>
            SĐT:{" "}
            <input
              style={{
                width: "250px",
                height: "25px",
                fontSize: "16px",
                borderRadius: "5px",
                marginLeft: "20px"

              }}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </p>
          <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <button style={{
              background: "black",
              color: "white",
              borderRadius: "5px",
              height: "30px",
              width: "90px",
              fontSize: "16px",
            }} onClick={handleUpdate}>Cập nhật</button>
            <button style={{
              background: "black",
              color: "white",
              borderRadius: "5px",
              height: "30px",
              width: "90px",
              fontSize: "16px",
              marginLeft: "10px"
            }} onClick={handleCancelClick}>Hủy</button>
          </div>
          
          </div>
        </>
      ) : (
        <>
        <div style={{ 
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}>
          <p>Tên: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>SĐT: {user.phone}</p>
          <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <button style={{
              background: "black",
              color: "white",
              borderRadius: "5px",
              height: "30px",
              width: "90px",
              fontSize: "16px",
            }} onClick={handleEditClick}>Sửa</button>
          </div>
          
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileComponent;

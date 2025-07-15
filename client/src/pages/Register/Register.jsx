import React, { useState } from 'react'
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent'
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt'
import InputField from "../../components/UserComponent/PickleCourt/Component/InputComponent/InputComponent"
import { Button, Image } from 'antd'
import captcha from '../../assets/captcha/07487.jpg'
import { Link } from 'react-router-dom'
import { Modal } from 'antd';


const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");

     const [isModalOpen, setIsModalOpen] = useState(false);
    const [verifyCode, setVerifyCode] = useState("");
    const [verifyError, setVerifyError] = useState(false);


  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    captcha: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      fullName: fullName.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phone: !/^\d{9,11}$/.test(phone),
      captcha: captchaValue !== "07487", // hardcoded mã captcha
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((val) => val);
    if (hasError) return;

    // alert("🎉 Đăng ký thành công!");
    setIsModalOpen(true);
  };

  return (
    <>
      <HeaderComponent />
      <div style={{ marginTop: '120px', marginBottom: '40px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 8px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '500px', border: '1px solid #ccc', padding: '20px', borderRadius: '16px'}}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng ký tài khoản</h1>

            <InputField
              label="Họ và tên"
              type="text"
              value={fullName}
              setValue={setFullName}
              handleOnchange={(val) => setFullName(val)}
            />
            {errors.fullName && <div style={{ color: 'red', fontSize: '12px' }}>Họ và tên không được để trống</div>}

            <InputField
              label="Gmail"
              type="text"
              value={email}
              setValue={setEmail}
              handleOnchange={(val) => setEmail(val)}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>Email không hợp lệ</div>}

            <InputField
              label="Số điện thoại"
              type="number"
              value={phone}
              setValue={setPhone}
              handleOnchange={(val) => setPhone(val)}
            />
            {errors.phone && <div style={{ color: 'red', fontSize: '12px' }}>Số điện thoại không hợp lệ</div>}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
              <div>
                <Image src={captcha} alt="Captcha" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
              </div>
              <div style={{ marginTop: '-17px' }}>
                <InputField
                  label="Mã captcha"
                  type="number"
                  value={captchaValue}
                  setValue={setCaptchaValue}
                  handleOnchange={(val) => setCaptchaValue(val)}
                />
                {errors.captcha && <div style={{ color: 'red', fontSize: '12px' }}>Mã captcha không đúng</div>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button
                style={{
                  width: "25%",
                  padding: "19px",
                  marginLeft: '17px',
                  minWidth: '120px'
                }}
                color="default"
                variant="solid"
                onClick={handleSubmit}
              >
                Đăng Ký
              </Button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '14px',
              marginTop: '10px'
            }}>
              <span>
                Tui đã có tài khoản /
                <Link to="/login" style={{ textDecoration: 'none', marginLeft: 4 }}>Đăng nhập</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        centered
        title="Xác minh tài khoản Gmail"
        onOk={() => {
            if (verifyCode === "123456") {
            alert("✅ Xác minh thành công!");
            setIsModalOpen(false);
            } else {
            setVerifyError(true);
            }
        }}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        >
        <p>Nhập mã xác minh đã gửi đến <strong>{email}</strong></p>
        <InputField
            label="Mã xác minh"
            type="number"
            value={verifyCode}
            setValue={setVerifyCode}
            handleOnchange={(val) => {
            setVerifyCode(val);
            setVerifyError(false);
            }}
        />
        {verifyError && (
            <div style={{ color: 'red', fontSize: '12px' }}>
            Mã xác minh không chính xác
            </div>
        )}
        </Modal>
    </>
  )
};

export default Register;

import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent'
import InputField from "../../../../components/UserComponent/PickleBallCourt/Component/InputComponent/InputComponent"
import { Button } from 'antd'
import {handleVerify} from "../../../User/PickleBallCourt/HandlePage/VerifyGmail"
import {sendGmail} from "../../../User/PickleBallCourt/HandlePage/SendGmail"
import { Link } from 'react-router-dom'
import { Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import * as UserService from "../../../../services/users/authServices"
import { useMutationHook } from '../../../../hooks/useMutationHook'
import { showSuccess } from "../../../../components/UserComponent/CommonComponent/Message/Message"


const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState(false);

  useEffect(() => {
    if(emailError && email){
      setEmailError(false)
    }
  }, [email])

  const mutation = useMutationHook(
    data => UserService.SignUp(data)
  )



  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    captcha: false,
    password: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      fullName: fullName.trim() === "",
      password: password.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phone: !/^\d{9,11}$/.test(phone),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((val) => val);
    if (hasError) return;
    sendGmail(email)
    setIsModalOpen(true);
  };

  const data = {name: fullName, email, phone, password}

  const onConfirm = async () => {
    const verify = await handleVerify({
      verifyCode,
      setIsModalOpen,
      setVerifyError,
      navigate,
      data
    })
    if (verify === true) {
      try {
        const response = await mutation.mutateAsync(data)
        if (response.status === "ERR") {
          setEmailError(true); 
        } else {
          setEmailError(false); 
        }
        if (response.status === "OK") {
          showSuccess("Đăng ký thành công")
          navigate("/court")
        } 

      } catch (error) {
        
      }
      
    }
  }

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
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng ký</h1>

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
            {emailError && (
              <div className="emailCheck" style={{ color: 'red', fontSize: '12px' }}>
                Email đã tồn tại
              </div>
            )}

            <InputField
              label="Mật khẩu"
              type="password"
              isPassword={true}
              value={password}
              setValue={setPassword}
              handleOnchange={(val) => setPassword(val)}
            />
            {errors.password && <div style={{ color: 'red', fontSize: '12px' }}>Password không hợp lệ</div>}


            <InputField
              label="Số điện thoại"
              type="number"
              value={phone}
              setValue={setPhone}
              handleOnchange={(val) => setPhone(val)}
            />
            {errors.phone && <div style={{ color: 'red', fontSize: '12px' }}>Số điện thoại không hợp lệ</div>}

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
        onOk={onConfirm}
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

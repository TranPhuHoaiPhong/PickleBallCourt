import React, { useState, useEffect } from 'react'
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent'
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt'
import InputField from "../../components/UserComponent/PickleCourt/Component/InputComponent/InputComponent"
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useMutationHook } from '../../hooks/useMutationHook'
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/users/authServices"
import { showError, showSuccess } from "../../components/UserComponent/Message/Message"
import { jwtDecode } from "jwt-decode";
import { useDispatch  } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  useEffect(() => {
    if (errors.email && email) {
      setErrors((prev) => ({ ...prev, email: false }));
    }
    if (errors.password && password) {
      setErrors((prev) => ({ ...prev, password: false }));
    }
  }, [email, password]);

  const data = {email, password}

  const mutation = useMutationHook(
    data => UserService.LoginUser(data)
  )



  const handleSubmit = async () => {
    const newErrors = {
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.trim() === ""
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    const response = await mutation.mutateAsync(data)
    if(response?.status === "OK") {
      showSuccess("Đăng nhập thành công")
      navigate("/court")
      localStorage.setItem("access-token", JSON.stringify(response?.ACCESSTOKEN))
      if(response?.ACCESSTOKEN) {
        const decoded = jwtDecode(response?.ACCESSTOKEN)
        if(decoded?._id) {
          handleGetDetailUser(decoded?._id, response?.ACCESSTOKEN)
        }
      }
    }
    if(response?.status === "ERR") {
      showError("Mật khẩu hoặc gmail không chính xác")
    }

  };

  const handleGetDetailUser = async (id, token) => {
      const res = await UserService.getDetailUser(id, token)
      const { name, email, phone, _id } = res.data
      dispatch(updateUser({name, email, phone, _id}))
  }


  return (
    <>
      <HeaderComponent />
      <div style={{ marginTop: '120px', marginBottom: '40px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 8px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '500px', border: '1px solid #ccc', padding: '20px', borderRadius: '16px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng nhập</h1>

            <InputField
              label="Gmail"
              type="text"
              value={email}
              setValue={setEmail}
              handleOnchange={(val) => setEmail(val)}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>Email không hợp lệ</div>}

            <InputField
              label="Mật khẩu"
              type="password"
              isPassword={true}
              value={password}
              setValue={setPassword}
              handleOnchange={(val) => setPassword(val)}
            />
            {errors.password && <div style={{ color: 'red', fontSize: '12px' }}>Mật khẩu không hợp lệ</div>}

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
                            Đăng Nhập
                          </Button>
                        </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '14px',
              marginTop: '10px'
            }}>
              <span>
                Tui chưa có tài khoản / <Link to="/register" style={{ marginLeft: 4 }}>Đăng ký</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

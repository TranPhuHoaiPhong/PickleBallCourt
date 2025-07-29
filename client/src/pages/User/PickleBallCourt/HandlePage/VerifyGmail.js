import axios from "axios";

export const handleVerify = async ({verifyCode, setIsModalOpen, setVerifyError, navigate, data}) => {
  const { email } = data
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/sign-up/verifyCode`, {email, verifyCode})

  if (response.data.status === "SUCCESS") {
      setIsModalOpen(false);
      return true
  } else {
    setVerifyError(true);
  }
}


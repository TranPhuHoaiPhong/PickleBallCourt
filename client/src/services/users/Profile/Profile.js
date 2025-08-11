// services/userService.js
export const updateUserService = async (formData) => {
  let token = localStorage.getItem("access-token");

  // Xử lý bỏ dấu " ở đầu/cuối nếu có
  if (token) {
    token = token.replace(/^"|"$/g, "");
  }

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update failed");
  }

  return data;
};

import { useState } from "react";

function Login() {
  const [inputs, setInputs] = useState({});
  const [isCheck, setCheck] = useState(false);

  // Hàm xử lý sự kiện thay đổi của input
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Hàm xử lý sự kiện checkbox
  const handleChecked = () => {
    setCheck(!isCheck);
  };

  // Hàm xử lý sự kiện khi nhấn nút Đăng nhập
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn không cho form submit mặc định
    console.log("Dữ liệu:", inputs);
    console.log("Admin:", isCheck);
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label>
        Nhập tên đăng nhập của bạn:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Nhập mật khẩu của bạn:
        <input
          type="text"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleChecked}
        />
        Bạn có phải là Admin không?
      </label>
      <br />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default Login;

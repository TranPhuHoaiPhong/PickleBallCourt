Model User 

- Chứa thông tin user
- Không được trùng gmail
- Mật khẩu cần mã hóa
- Verify token khi đăng nhập

Model Sân

- Chứa thông tin sân
- Không được trùng tên sân
- Có thể có nhiều sân trong một địa điểm ( ví dụ 5 sân trong một khu vực)
- Có thể có nhiều địa điểm ( ví dụ 5 khu vực trong một thành phố Cần Thơ)
- Thời gian của sân ( 15h - 22h)
- Khi nào khách trả sân vẫn tiếp tục tính tiền cho khách
- Nếu không active thì không thể chọn sân
- Phải có link url
- phải có hình 4 tấm
- thời gian trống

Model Order
- Chứa thông tin người đặt sân
- Số lượng sân trong khoảng thời gian ( ví dụ 3 sân trong 1 giờ)
- date: giờ đặt sân của sân (18h sân 1, 19h sân 2, 20h sân 3)
- Tổng số lượng sân
- Tổng tiền
- Trạng thái tính tiền ( chưa thanh toán, đã thanh toán, đang chờ thanh toán)
- Trạng thái ( đang chờ xác nhận, đã xác nhận, đã hủy)
- Mô tả: 

Model Thông báo
- khi nhấn đặt sân sẽ gửi về cho admin để kiểm tra
- Thông báo những chương trình khuyến mãi
- Thông báo về đặt sân


Model Banner
- Chứa thông tin banner
- Thông tin chương trình khuyến mãi
- Link ảnh từ server


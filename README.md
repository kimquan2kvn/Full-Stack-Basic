# Demo quản lý sinh viên CRUD
- Trang đăng nhập
![image](https://user-images.githubusercontent.com/54978467/196159529-383701d9-bce0-46eb-81c0-ffcdba5ea256.png)

- Trang đăng kí
![image](https://user-images.githubusercontent.com/54978467/196159578-5a7b33d3-ef38-48b0-b7b4-550f5f0cdc26.png)

- Home page
![image](https://user-images.githubusercontent.com/54978467/187653800-0399a66b-cdda-42eb-bfa7-c2023a8d1208.png)

- Modal thêm thông tin sv
![image](https://user-images.githubusercontent.com/54978467/196160031-a909888c-2f38-43cb-86a1-388daa45d32a.png)

- Modal update thông tin sv
![image](https://user-images.githubusercontent.com/54978467/196160106-aeb6dc8b-1092-4aed-8afe-808e17e02dca.png)


# Công cụ sử dụng: ReactJS và NodeJs(framework Sailjs)
- HTML, JS, CSS
- React Bootstrap
- ContextAPI
- ReactHook
- JsonWebToken

# Mô tả chức năng chính:
- Trang chủ: Chỉ hiển thị các sinh viên do người dùng đang đăng nhập tạo ra
- User:
   + User có thể đăng ký tài khoản, đăng nhập (JWT auth)
   + User có thể tạo thêm sinh viên, sửa thông tin sinh viên hoặc xóa, upload ảnh cho sinh viên, tìm kiếm sinh viên

# Khởi chạy project
```
# Clone the repository
git clone https://github.com/kimquan2kvn/Full-Stack-Basic.git

# Go inside the directory
cd crud-basic-student

# Install dependencies
cd app
npm install

# Install dependencies
cd client
npm install

# Start development server
cd app
nodemon app.js

# Build for production
cd client
npm start
```

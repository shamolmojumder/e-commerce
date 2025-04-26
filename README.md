## 📋 Project Structure

```
Directory structure:
└── shamolmojumder-e-commerce/
├── README.md                               # Project documentation
├── git
├── package.json
├── server.js
├── client/
│ ├── package-lock.json
│ ├── package.json
│ ├── .gitignore
│ ├── public/
│ │ ├── index.html
│ │ ├── manifest.json
│ │ ├── robots.txt
│ │ └── images/
│ └── src/
│ ├── App.css
│ ├── App.js
│ ├── App.test.js
│ ├── index.css
│ ├── index.js
│ ├── reportWebVitals.js
│ ├── setupTests.js
│ ├── .env
│ ├── components/
│ │ ├── Prices.jsx
│ │ ├── Spinner.js
│ │ ├── Form/
│ │ │ ├── CategoryForm.jsx
│ │ │ └── SearchInput.jsx
│ │ ├── Layout/
│ │ │ ├── AdminMenu.js
│ │ │ ├── Footer.js
│ │ │ ├── Header.js
│ │ │ ├── Layout.js
│ │ │ └── UserMenu.jsx
│ │ └── Routes/
│ │ ├── AdminRoute.js
│ │ └── Private.js
│ ├── context/
│ │ ├── auth.js
│ │ ├── cart.js
│ │ └── search.js
│ ├── hooks/
│ │ └── useCategory.jsx
│ ├── pages/
│ │ ├── About.js
│ │ ├── CartPage.jsx
│ │ ├── Categories.jsx
│ │ ├── CategoryProduct.jsx
│ │ ├── Contact.js
│ │ ├── HomePage.js
│ │ ├── Pagenotfound.js
│ │ ├── Policy.js
│ │ ├── ProductDetails.jsx
│ │ ├── Search.jsx
│ │ ├── Admin/
│ │ │ ├── AdminDashboard.js
│ │ │ ├── AdminOrders.jsx
│ │ │ ├── CreateCategory.jsx
│ │ │ ├── CreateProduct.jsx
│ │ │ ├── Products.jsx
│ │ │ ├── UpdateProduct.jsx
│ │ │ └── Users.jsx
│ │ ├── Auth/
│ │ │ ├── ForgotPasssword.js
│ │ │ ├── Login.js
│ │ │ └── Register.js
│ │ └── user/
│ │ ├── Dashboard.js
│ │ ├── Orders.jsx
│ │ └── Profile.jsx
│ └── styles/
│ └── AuthStyles.css
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── categoryController.js
│ └── productController.js
├── helpers/
│ └── authHelper.js
├── middlewares/
│ └── authmiddleware.js
├── models/
│ ├── categoryModel.js
│ ├── orderModel.js
│ ├── productModel.js
│ └── userModel.js
└── routes/
├── authRoute.js
├── categoryRoutes.js
└── productRoutes.js
```

Learn from youtube
Used MVC

MERN project
Admin manage orders status Ecommerce Mern App Mern Stack Project 14:41

<!-- https://merchant.pathao.com/api/v1/orders/all?merchant_order_id=TMS31514803&transfer_status=1&archive=0&page=1&limit=20
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiN2NjM2Y5Zjg5ZTA2YmQwN2UwNGZlMTlmYjY1ZjBhNDFjYWZjNWM3Y2E2MWMwNTRjODllMmY1Yzg1NTVjMzJhMWJjNzUzYzBiYmY0YzViYTYiLCJpYXQiOjE3NDQxNzAwNzguOTc2OTY4LCJuYmYiOjE3NDQxNzAwNzguOTc2OTcxLCJleHAiOjE3NTE5NDYwNzguOTY2ODc0LCJzdWIiOiIyODI3NzgiLCJzY29wZXMiOltdfQ.R5NkU2Vz_z2cPOHl_fcF6eTuiW6r0CQNK2CyJHvL3KeXirxkRN-lW9fQfjj8-qkLpuGjcSS5cSrtlS04OfMqwi3rhpFhfEMM0JHqa8Of_5PtyyReQMIiqpy57E6ANR57Vzj21wOL9ygvVG6SZvByjJgeQx8nzDqyMiENtwbiBVZ-zbGBvwswCKG0PWwOWU6zCmO6w2UsU3Z8DJWpmi2xCMwFsVgeiM5aUZV-Vu-J3woL7oG2Dl5qiKut-MRcXH9YzUimkANfCTdrvmUM0A-L3y4aU3FVwt26iE-_TVceuRZJALBYzENyynkhY4V5LTGxzuQm8iSaNdQWws4E1N40THhXVzoCTamDRXBt9NDcOYW7l-hnZf4F4jStTpTkqsyPcNTwO90-Po8C1IjocwrQ_zH-jbOIsBNbnuJprXfWYs4mbEAPEc7detplHdpZcVq21pOTYUJmCUT6xgSxdBLmON7j7ayCd_MmDV8k_tncOD9Vu-UKJ68QbXbVjwA-nOrCsrFXF1AmJmtUyuXJkInX8ebErYOUuNITsH-6xOiwcSL-yG_ugmwJn0v3e-Kog7hlUGz3TYTd_fkL2NZVa6Rm6hGrNRRHCifhUXf4HuHGSIQQrB2QNe1UehgvSj1yyM74DL97bLeyMwYSqVa29yyhdRCBEuSzgiYIYPwtgXN-Nck -->

[![Screenshot-169.png](https://i.postimg.cc/YqrtS1xS/Screenshot-169.png)](https://postimg.cc/w3GCfRZK)
[All-products-Best-offers-Google-Chrome-2025-04-15-16-46-14.gif](https://postimg.cc/hXS1VpsK)
[![All-products-Best-offers-Google-Chrome-2025-04-15-16-46-14.gif](https://i.postimg.cc/6pZbJPG4/All-products-Best-offers-Google-Chrome-2025-04-15-16-46-14.gif)](https://postimg.cc/hXS1VpsK)
[![localhost-3000.png](https://i.postimg.cc/fLRvLqkK/localhost-3000.png)](https://postimg.cc/nsNmSk4j)

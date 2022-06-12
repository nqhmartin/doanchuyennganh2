import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Category from "./components/category/Category";
import Blank from "./pages/Blank";
import Login from "./pages/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./app/features/userSlide";
import { useEffect, useState } from "react";
import Product from "./components/product/Product";
import CreateProduct from "./components/createProduct/CreateProduct";
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import Pending from "./components/order/pending/Pending";
import Preparing from "./components/order/preparing/Preparing";
import Shipping from "./components/order/shipping/Shipping";
import Received from "./components/order/received/Received";
import Detail from "./components/order/detail/Detail";
import NewFeed from "./components/newFeed/NewFeed";
import CreateFeed from "./components/newFeed/createFeed/CreateFeed";
import User from "./components/user/User";
import Review from "./components/review/Review";
import UpdateFeed from "./components/newFeed/updateFeed/UpdateFeed";

function App() {
  const dispatch = useDispatch();
  const [dataUser, setdataUser] = useState(false);

  useEffect(() => {
    const getData = () => {
      if (localStorage.getItem("user") !== null) {
        const data = JSON.parse(localStorage.getItem("user"));
        const action = addUser(data);
        dispatch(action);
      }
    };
    getData();
  }, []);

  const user = useSelector((state) => state.users);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user.user == null ? <Login /> : <AppLayout />}
        />
        <Route path="/" element={user.user == null ? <Login /> : <AppLayout />}>
          <Route index element={user.user == null ? <Login /> : <Category />} />
          <Route
            path="/product"
            element={user.user == null ? <Login /> : <Product />}
          />
          <Route
            path="/product/create"
            element={user.user == null ? <Login /> : <CreateProduct />}
          />
          <Route
            path="/product/update/:id"
            element={user.user == null ? <Login /> : <UpdateProduct />}
          />
          <Route path="/order/pending" element={<Pending />} />
          <Route path="/order/preparing" element={<Preparing />} />
          <Route path="/order/shipping" element={<Shipping />} />
          <Route path="/order/received" element={<Received />} />
          <Route path="/order/detail/:id" element={<Detail />} />
          <Route path="/feed" element={<NewFeed />} />
          <Route path="/feed/create" element={<CreateFeed />} />
          <Route path="/feed/update" element={<UpdateFeed />} />

          <Route path="/review" element={<Review />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

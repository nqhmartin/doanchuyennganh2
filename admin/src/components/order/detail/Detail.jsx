import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./detail.css";
import Axios from "axios";
import { API } from "../../../constants/env";
function Detail() {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [dataDetail, setdataDetail] = useState([]);
  const [products, setproducts] = useState([]);
  console.log(dataDetail.products);
  useEffect(() => {
    const getData = () => {
      Axios.get(API + "order/find/" + path)
        .then((result) => {
          setdataDetail(result.data);
          setproducts(result.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [path]);

  return (
    <div className="detail">
      <p className="detailHeader">Chi tiết đơn hàng</p>
      <div className="mb-3">
        <div className="box">
          <p>Họ và tên: </p>
          <p className="boxBottom">{dataDetail.fullName}</p>
        </div>

        <div className="box">
          <p>username: </p>
          <p className="boxBottom">{dataDetail.username}</p>
        </div>

        <div className="box">
          <p>Địa chỉ: </p>
          <p className="boxBottom">{dataDetail.address}</p>
        </div>

        <div className="box">
          <p>Số điện thoại: </p>
          <p className="boxBottom">{dataDetail.phone}</p>
        </div>

        <div className="box">
          <p>Hình thức thanh toán: </p>
          <p className="boxBottom">{dataDetail.payment}</p>
        </div>

        <div className="box">
          <p>Trạng thái: </p>
          <p className="boxBottom">{dataDetail.status}</p>
        </div>

        <div className="box">
          <p>Tổng tiền: </p>
          <p className="boxBottom">{dataDetail.totalPrice}VNĐ</p>
        </div>

        <p>Sản phẩm</p>
        <div>
          {products.map((item, index) => {
            return (
              <div key={index} className="item">
                <img src={API + "images/" + item.imgpro} className="imgPro" />
                <div className="itemRight">
                  <p>{item.productname}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-primary">
            Chấp thuận
          </button>
          <button type="button" className="btn btn-danger">
            Xóa
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Detail;

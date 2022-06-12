import React, { useEffect, useState } from "react";
import "./received.css";
import Axios from "axios";
import { API } from "../../../constants/env";
export default function Received() {
  const [dataOrder, setdataOrder] = useState([]);

  useEffect(() => {
    const getData = () => {
      Axios.get(API + "order/all")
        .then((result) => {
          setdataOrder(result.data.filter((item) => item.status === "Đã nhận"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  console.log(dataOrder);

  return (
    <div className="pending">
      <div style={{ fontSize: 18, fontWeight: "bold" }} className="mt-4">
        ĐƠN HÀNG: ĐÃ NHẬN
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Người đặt</th>
            <th scope="col">Ngày đặt</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hình thức thanh toán</th>
            <th scope="col">Giá tiền</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dataOrder.map((item, index) => {
            const formatDis = item.totalPrice
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

            const handleAccept = () => {
              Axios.put(API + "order/" + item._id, {
                status: "Đang chuẩn bị",
              }).then((result) => {
                window.location.reload();
              });
            };

            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.username}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>{item.status}</td>
                <td>{item.payment}</td>
                <td>{formatDis}đ</td>
                <td>
                  <div className="actionbtn">
                    <button
                      onClick={() => {
                        window.location.replace("/order/detail/" + item._id);
                      }}
                      type="button"
                      className="btn btn-secondary"
                    >
                      Chi tiết
                    </button>
                    {/* <button
                      onClick={handleAccept}
                      type="button"
                      className="btn btn-primary"
                    >
                      Chấp thuận
                    </button>
                    <button type="button" className="btn btn-danger">
                      Xóa
                    </button> */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

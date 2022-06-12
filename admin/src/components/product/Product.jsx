import React, { useEffect, useState } from "react";
import "./product.css";
import Axios from "axios";
import { API } from "../../constants/env";
import { Link } from "react-router-dom";
export default function Product() {
  const [dataPro, setdataPro] = useState([]);
  const getPro = () => {
    Axios.get(API + "product")
      .then((result) => {
        setdataPro(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPro();
  }, []);

  return (
    <div className="product">
      <div>
        <button
          onClick={() => {
            window.location.replace("/product/create");
          }}
          type="button"
          className="btn btn-success"
        >
          Thêm sản phẩm
        </button>
      </div>

      <div className="formPro">
        <p className="formProText">Danh sách sản phẩm</p>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Giá tiền</th>
              <th scope="col">Ngày thêm</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataPro.map((item, index) => {
              const formatDis = item.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

              const handleDelete = () => {
                Axios.delete(API + "product/" + item._id)
                  .then((result) => {
                    window.location.replace("/product");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.productname}</td>
                  <td>
                    <img
                      src={API + "images/" + item.imgpro}
                      className="imgPro"
                    />
                  </td>
                  <td>{formatDis}đ</td>
                  <td>{new Date(item.createdAt).toDateString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        // <Link to={"/product/update"}></Link>;

                        window.location.replace("/product/update/" + item._id);
                      }}
                      type="button"
                      className="btn btn-warning"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={handleDelete}
                      type="button"
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./review.css";
import Axios from "axios";
import { API } from "../../constants/env";
import { Link } from "react-router-dom";
export default function Review() {
  const [dataReview, setdataReview] = useState([]);
  const getPro = () => {
    Axios.get(API + "review/all")
      .then((result) => {
        setdataReview(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPro();
  }, []);

  console.log(dataReview);
  return (
    <div className="product">
      <div className="formPro">
        <p className="formProText">Danh sách đánh giá</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Số sao</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">ID sản phẩm</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataReview.map((item, index) => {
              const handleDelete = () => {
                Axios.delete(API + "review/" + item._id)
                  .then((result) => {
                    window.location.replace("/review");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.admin}</td>
                  <td>{item.content}</td>
                  <td>{item.star}</td>
                  <td>
                    <img
                      src={API + "images/" + item.imgReview}
                      className="imgPro"
                    />
                  </td>
                  <td>{item.productId}</td>
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

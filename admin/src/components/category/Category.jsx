import React, { useEffect, useState } from "react";
import "./category.css";
import { API } from "../../constants/env";
import Axios from "axios";
import Table from "react-bootstrap/Table";

export default function Category() {
  const [inputCategory, setinputCategory] = useState("");
  const [dataCate, setdataCate] = useState([]);
  const handleAdd = () => {
    Axios.post(API + "category", {
      categoryName: inputCategory,
    })
      .then((result) => {
        console.log(result);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get(API + "category")
      .then((result) => {
        setdataCate(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="category">
      <div>
        <div>Thêm loại sản phẩm</div>
        <input
          className="inputCategory"
          value={inputCategory}
          onChange={(e) => setinputCategory(e.target.value)}
        />
        <button onClick={handleAdd} type="button" className="btn btn-success">
          Thêm
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên loại sản phẩm</th>
            <th scope="col">Ngày thêm</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dataCate.map((item, index) => {
            const handleDelete = () => {
              Axios.delete(API + "category/" + item._id)
                .then(() => {
                  window.location.replace("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.categoryName}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>
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
  );
}

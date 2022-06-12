import React, { useEffect, useState } from "react";
import "./newFeed.css";
import Axios from "axios";
import { API } from "../../constants/env";
import { Link } from "react-router-dom";
export default function NewFeed() {
  const [dataFeed, setdataFeed] = useState([]);
  const getPro = () => {
    Axios.get(API + "feed")
      .then((result) => {
        setdataFeed(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPro();
  }, []);
  console.log(dataFeed);

  return (
    <div className="product">
      <div>
        <button
          onClick={() => {
            window.location.replace("/feed/create");
          }}
          type="button"
          className="btn btn-success"
        >
          Thêm bài viết
        </button>
      </div>

      <div className="formPro">
        <p className="formProText">Danh sách bài viết</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Admin</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Lượt like</th>
              <th scope="col">Ngày thêm</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataFeed.map((item, index) => {
              const handleDelete = () => {
                Axios.delete(API + "feed/" + item._id)
                  .then((result) => {
                    window.location.replace("/feed");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.admin}</td>
                  <td>
                    <img
                      src={API + "images/" + item.image}
                      className="imgPro"
                    />
                  </td>
                  <td>{item.content}</td>
                  <td>{item.like}</td>

                  <td>{new Date(item.createdAt).toDateString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        // <Link to={"/product/update"}></Link>;

                        window.location.replace("/feed/update/" + item.id);
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

import React, { useEffect, useState } from "react";
import "./user.css";
import Axios from "axios";
import { API } from "../../constants/env";
import { Link } from "react-router-dom";
export default function User() {
  const [dataUser, setdataUser] = useState([]);
  const getPro = () => {
    Axios.get(API + "auth/all")
      .then((result) => {
        setdataUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPro();
  }, []);
  console.log(dataUser);

  return (
    <div className="product">
      <div className="formPro">
        <p className="formProText">Danh sách tài khoản</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Avatar</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((item, index) => {
              const handleDelete = () => {
                Axios.delete(API + "auth/user/" + item._id)
                  .then((result) => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };

              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>

                  <td>
                    <img
                      src={API + "images/" + item.avatar}
                      className="imgPro"
                    />
                  </td>

                  <td>{new Date(item.createdAt).toDateString()}</td>
                  <td>
                    <button
                      // onClick={()}
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

import React, { useEffect, useState } from "react";
import "./createProduct.css";
import Axios from "axios";
import { API } from "../../constants/env";
export default function CreateProduct() {
  const [productname, setproductName] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState();
  const [discount, setdiscount] = useState(0);
  const [file, setFile] = useState(null);
  const [dataCate, setdataCate] = useState([]);
  console.log(categoryName);
  console.log(file);
  const handleCreate = (e) => {
    e.preventDefault();
    const newPost = {
      productname,
      categoryName,
      desc,
      price,
      discount,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.imgpro = filename;
      Axios.post(API + "api/uploads", data)
        .then((result) => {
          Axios.post(API + "product", newPost)
            .then((result1) => {
              window.location.replace("/product");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const getCate = () => {
      Axios.get(API + "category")
        .then((result) => {
          setdataCate(result.data);
          setcategoryName(result.data[0].categoryName);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCate();
  }, []);

  return (
    <div className="createProduct">
      <p className="createProductText">Tạo mới sản phẩm</p>
      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            className="form-control"
            value={productname}
            onChange={(e) => setproductName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <select
            className="form-control"
            onChange={(e) => setcategoryName(e.target.value)}
          >
            {dataCate.map((item, index) => {
              return (
                <option value={item.categoryName} key={index}>
                  {item.categoryName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
            type="text"
            className="form-control"
            rows={3}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Giá gốc (VNĐ)</label>
          <input
            value={price}
            onChange={(e) => setprice(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giảm giá (%)</label>
          <input
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hình ảnh</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />)
        </div>
        <div className="mb-3">
          {file && (
            <img className="proImg" src={URL.createObjectURL(file)} alt="" />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./updateProduct.css";
import Axios from "axios";
import { API } from "../../constants/env";
import { useLocation } from "react-router-dom";
export default function UpdateProduct() {
  const [productname, setproductName] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState();
  const [discount, setdiscount] = useState(0);
  const [imgpro, setimgpro] = useState("");
  const [file, setFile] = useState(null);
  const [dataCate, setdataCate] = useState([]);
  const [dataPro, setdataPro] = useState([]);
  const [statusIMG, setstatusIMG] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const handleCreate = (e) => {
    e.preventDefault();
    if (file) {
      const newPost = {
        productname,
        categoryName,
        desc,
        price,
        discount,
      };
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.imgpro = filename;
      Axios.post(API + "api/uploads", data).then((result) => {
        Axios.put(API + "product/" + path, {
          productname,
          categoryName,
          desc,
          price,
          discount,
          imgpro: filename,
        })
          .then(() => {
            window.location.replace("/product");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      Axios.put(API + "product/" + path, {
        productname,
        categoryName,
        desc,
        price,
        discount,
        imgpro,
      })
        .then(() => {
          window.location.replace("/product");
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
          // setcategoryName(result.data[0].categoryName);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getPro = () => {
      Axios.get(API + "product/" + path)
        .then((result) => {
          setdataPro(result.data);
          setproductName(result.data.productname);
          setcategoryName(result.data.categoryName);
          setdesc(result.data.desc);
          setprice(result.data.price);
          setdiscount(result.data.discount);
          setimgpro(result.data.imgpro);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCate();
    getPro();
  }, []);

  return (
    <div className="createProduct">
      <p className="createProductText">Chỉnh sửa sản phẩm</p>
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
          <input
            className="form-control"
            value={categoryName}
            onChange={(e) => setcategoryName(e.target.value)}
          />
          {/* <select
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
          </select> */}
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
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setstatusIMG(true);
            }}
          />
          )
        </div>

        <div className="mb-3">
          {statusIMG ? (
            <img className="proImg" src={URL.createObjectURL(file)} alt="" />
          ) : (
            <img className="proImg" src={API + "images/" + imgpro} alt="" />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

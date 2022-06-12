import React, { useEffect, useState } from "react";
import "./updateFeed.css";
import Axios from "axios";
import { API } from "../../../constants/env";
import { useDispatch, useSelector } from "react-redux";
export default function UpdateFeed() {
  const [content, setcontent] = useState("");
  const [file, setFile] = useState(null);
  const user = useSelector((state) => state.users.user);
  console.log(user);
  console.log(file);
  const handleCreate = (e) => {
    e.preventDefault();
    const newPost = {
      content,
      avatar: user.avatar,
      admin: user.username,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.image = filename;
      Axios.post(API + "api/uploads", data)
        .then((result) => {
          Axios.post(API + "feed", newPost)
            .then((result1) => {
              window.location.replace("/feed");
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

  return (
    <div className="createProduct">
      <p className="createProductText">Tạo mới bài viết</p>
      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            type="text"
            className="form-control"
            rows={3}
          ></textarea>
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
          Thêm bài viết
        </button>
      </form>
    </div>
  );
}

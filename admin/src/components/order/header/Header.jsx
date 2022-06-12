import React from "react";

export default function Header() {
  return (
    <div className="mb-3">
      <p>Trạng thái</p>

      <div className="pendingTop">
        <button
          onClick={() => {
            window.location.replace("/order/pending");
          }}
          style={{ width: 150 }}
          type="button"
          className="btn btn-secondary"
        >
          Chờ xác nhận
        </button>
        <button
          onClick={() => {
            window.location.replace("/order/preparing");
          }}
          style={{ width: 150 }}
          type="button"
          className="btn btn-warning"
        >
          Chuẩn bị hàng
        </button>
        <button
          onClick={() => {
            window.location.replace("/order/shipping");
          }}
          style={{ width: 150 }}
          type="button"
          className="btn btn-primary"
        >
          Đang giao
        </button>
        <button
          onClick={() => {
            window.location.replace("/order/received");
          }}
          style={{ width: 150 }}
          type="button"
          className="btn btn-success"
        >
          Đã nhận
        </button>
      </div>
    </div>
  );
}

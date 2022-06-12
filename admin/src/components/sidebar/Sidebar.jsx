import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const sidebarNavItems = [
  {
    display: "Loại sản phẩm",
    icon: <i className="bx bx-layer"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Sản phẩm",
    icon: <i className="bx bx-cube"></i>,
    to: "/product",
    section: "product",
  },
  {
    display: "Tài khoản",
    icon: <i className="bx bx-user"></i>,
    to: "/user",
    section: "user",
  },
  {
    display: "New Feed",
    icon: <i className="bx bx-clipboard "></i>,
    to: "/feed",
    section: "feed",
  },
  {
    display: "Đánh giá",
    icon: <i className="bx bx-star"></i>,
    to: "/review",
    section: "review",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">NQH Shop</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link style={{ textDecoration: "none" }} to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
        <div
          style={{ marginLeft: 60, marginTop: -40 }}
          class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        >
          <li>
            <h6 style={{ fontSize: 18 }} class="dropdown-header">
              {" "}
              Đơn hàng
            </h6>
          </li>
          <li>
            <a class="dropdown-item" href="/order/pending">
              Chưa xác minh
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="/order/preparing">
              Đã xác minh
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="/order/shipping">
              Đang giao
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="/order/received">
              Đã nhận
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

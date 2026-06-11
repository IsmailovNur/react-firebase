import { Layout } from "antd";
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

import "./AppHeader.css";
import { useEffect, useState } from "react";
import type { PageSelectItem } from "../../types/cms.ts";
import { cmsApi } from "../../api/firebaseApi.ts";

const {Header} = Layout;

const AppHeader = () => {

  const [menuItems, setMenuItems] = useState<PageSelectItem[]>([]);

  const fetchMenu = async () => {
    try {
      const data = await cmsApi.getAllPages();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          title: data[key].title
        }));
        setMenuItems(list);
      }
    } catch (e) {
      console.error('Failed to fetch menu items', e);
    }
  };

  useEffect(() => {
    void fetchMenu();
  }, []);


  return (
    <Header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Firebase CMS
        </Link>
        <nav className="header-nav">
          {menuItems.map(item => (
            <NavLink
              key={item.id}
              to={`/pages/${item.id}`}
              className="nav-item">
              {item.title}
            </NavLink>
          ))}

          <NavLink
            to={AppRoutes.admin}
            className="admin-link">
            Admin
          </NavLink>
        </nav>
      </div>
    </Header>
  );
};

export default AppHeader;
import { Layout } from "antd";
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

import "./AppHeader.css";

const {Header} = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Firebase CMS
        </Link>
        <nav className="header-nav">
          <NavLink className="nav-item" to={AppRoutes.main}>Home</NavLink>
          <NavLink className="nav-item" to={AppRoutes.admin}>Admin</NavLink>
        </nav>
      </div>
    </Header>
  );
};

export default AppHeader;
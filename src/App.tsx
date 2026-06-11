import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routing/routes.ts";

import AppHeader from "./widgets/AppHeader/AppHeader.tsx";
import LayoutPage from "./pages/LayoutPage/LayoutPage.tsx";
import AdminPage from "./pages/AdminPage/AdminPage.tsx";
import AppFooter from "./widgets/AppFooter/AppFooter.tsx";

import './App.css';

const App = () => {

  return (
    <>
      <Layout className="App-wrapper">
        <AppHeader />
        <Content className="layout-content">
          <Routes>
            <Route path={AppRoutes.main} element={<LayoutPage />} />
            <Route path={AppRoutes.staticPage} element={<LayoutPage />} />
            <Route path={AppRoutes.admin} element={<AdminPage />} />
          </Routes>
        </Content>
        <AppFooter />
      </Layout>
    </>
  )
}

export default App;

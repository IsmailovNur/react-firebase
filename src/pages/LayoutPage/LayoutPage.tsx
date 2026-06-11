import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { App, Card, Typography } from 'antd';
import type { PageData } from "../../types/cms.ts";
import { cmsApi } from "../../api/firebaseApi.ts";
import Loader from "../../shared/Loader/Loader.tsx";

import "./LayoutPage.css";

const {Title} = Typography;

const LayoutPage = () => {
  const {pageName} = useParams<{ pageName: string }>();

  const navigate = useNavigate();
  const {message} = App.useApp();

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!pageName) return;

    const loadContent = async () => {
      setIsLoading(true);
      try {
        const data = await cmsApi.getPageByName(pageName);
        if (data) {
          setPageData(data);
        } else {
          message.error('Page not found!');
          navigate('/pages/about');
        }
      } catch (e) {
        console.error(e);
        message.error('Error loading page content');
      } finally {
        setIsLoading(false);
      }
    };

    void loadContent();
  }, [pageName, navigate]);


  if (isLoading) return <Loader isLoading={isLoading} />;

  return (
    <Card className="page-content">
      <Title level={2}>
        {pageData?.title}
      </Title>
      <div>{pageData?.content}</div>
    </Card>
  );
};

export default LayoutPage;
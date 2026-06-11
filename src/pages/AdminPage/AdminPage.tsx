import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Button, Card, Form, Input, Select, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Loader from '../../shared/Loader/Loader.tsx';

import type { PageData, PageSelectItem } from "../../types/cms.ts";
import { cmsApi } from "../../api/firebaseApi.ts";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import './AdminPage.css';

const {Title} = Typography;

const AdminPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {message} = App.useApp();

  const [pages, setPages] = useState<PageSelectItem[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>('');

  const loadPagesList = async () => {
    try {
      const data = await cmsApi.getAllPages();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          title: data[key].title
        }));
        setPages(list);

        if (list.length > 0 && !selectedPage) {
          setSelectedPage(list[0].id);
        }
      }
    } catch (e) {
      console.error(e);
      message.error('Failed to update pages list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async (values: { title: string }) => {
    if (!selectedPage) return;

    setIsSubmitting(true);
    const updatedData: PageData = {
      title: values.title.trim(),
      content: editorContent
    };

    try {
      await cmsApi.savePage(selectedPage, updatedData);
      message.success('Page updated successfully!');

      navigate(`/pages/${selectedPage}`);
    } catch (e) {
      console.error(e);
      message.error('Save operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (value: string) => {
    setSelectedPage(value);
  };

  useEffect(() => {
    void loadPagesList();
  }, []);

  useEffect(() => {
    if (!selectedPage) return;

    const loadSinglePageData = async () => {
      setIsLoading(true);
      try {
        const data = await cmsApi.getPageByName(selectedPage);
        if (data) {
          form.setFieldsValue({
            title: data.title,
          });
          setEditorContent(data.content);
        }
      } catch (e) {
        console.error(e);
        message.error('Error fetching page details');
      } finally {
        setIsLoading(false);
      }
    };

    void loadSinglePageData();
  }, [selectedPage, form, message]);

  if (isLoading) return <Loader isLoading={isLoading} />;

  return (
    <div className="admin-page-container">
      <Card className="admin-page-card">
        <div className="admin-header-actions" style={{marginBottom: 24}}>
          <Title level={3}>Edit Pages Content</Title>
        </div>

        <div className="select-section" style={{marginBottom: 24}}>
          <span style={{marginRight: 12}}>Select page to edit:</span>
          <Select
            value={selectedPage}
            onChange={handlePageChange}
            options={
              pages.map(p => (
                {key: p.id, value: p.id, label: p.title}
              ))
            }
          >
          </Select>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="title"
            label={
              <span>Page Title</span>}
            rules={[{required: true, message: 'Enter valid title!'}]}
          >
            <Input placeholder="Enter page title" />
          </Form.Item>

          <Form.Item label={
            <span>Content</span>} required>
            <div className="quill-editor-wrapper">
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
              />
            </div>
          </Form.Item>

          <Form.Item style={{marginBottom: 0, marginTop: 24}}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isSubmitting}
              block
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminPage;
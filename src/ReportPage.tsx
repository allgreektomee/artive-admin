import React from 'react';
import { Typography } from 'antd';

const ReportPage: React.FC = () => {
  return (
    <div style={{padding: '40px 0'}}>
      <Typography.Title level={2} style={{fontFamily: 'serif'}}>ARTIVE REPORT</Typography.Title>
      <Typography.Paragraph>
        취재 형식의 콘텐츠가 이곳에 표시됩니다.
      </Typography.Paragraph>
    </div>
  );
};

export default ReportPage;
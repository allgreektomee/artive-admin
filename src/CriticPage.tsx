import React from 'react';
import { Typography } from 'antd';

const CriticPage: React.FC = () => {
  return (
    <div style={{padding: '40px 0'}}>
      <Typography.Title level={2} style={{fontFamily: 'serif'}}>CRITIC & VIEW</Typography.Title>
      <Typography.Paragraph>
        비평 및 관점 콘텐츠가 이곳에 표시됩니다.
      </Typography.Paragraph>
    </div>
  );
};

export default CriticPage;
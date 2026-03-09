import React from 'react';
import { Typography } from 'antd';

const About: React.FC = () => {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <Typography.Title level={2}>About Just Art</Typography.Title>
      <Typography.Paragraph style={{ fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
        우리는 보통 사람들의 예술적 순간을 기록합니다.<br />
        복잡한 소셜 기능은 덜어내고, 오직 작품과 그 과정에만 집중하세요.
      </Typography.Paragraph>
    </div>
  );
};

export default About;
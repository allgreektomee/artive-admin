import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => (
  <Typography>
    <Title>About Just Art</Title>
    <Paragraph>이곳은 사람들의 예술적 기록을 아카이빙하는 공간입니다.</Paragraph>
  </Typography>
);

export default About;
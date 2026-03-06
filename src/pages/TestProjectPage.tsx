// pages/TestProjectPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNativeBridge } from '../hooks/useNativeBridge';

const TestProjectPage = () => {
  const [status, setStatus] = useState('대기 중...');
  const navigate = useNavigate();

  // 네이티브 응답이 왔을 때 실행할 로직
  const { sendToNative } = useNativeBridge((response) => {
    if (response.action === 'REQ_FACE_ID') {
      if (response.status === 'SUCCESS') {
        setStatus('인증 성공! 이동합니다...');
        setTimeout(() => navigate('/transfer-success'), 1000);
      } else {
        setStatus('인증 실패나 취소됨');
      }
    }
  });

  const handleAuthStart = () => {
    setStatus('네이티브 인증 호출 중...');
    sendToNative('REQ_FACE_ID', { amount: '10,000' });
  };

  return (
    <div style={containerStyle}>
      <h2>Web-Driven 리뉴얼 테스트</h2>
      <div style={statusBoxStyle}>{status}</div>
      <button onClick={handleAuthStart} style={buttonStyle}>
        FaceID 인증 요청
      </button>
      
      {/* 개발자용 가짜 테스트 버튼 (앱 없이 브라우저에서 테스트할 때 사용) */}
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('fromNative', { 
            detail: { action: 'REQ_FACE_ID', status: 'SUCCESS' } 
        }))}
        style={debugButtonStyle}
      >
        (브라우저 전용) 성공 강제 발생
      </button>
    </div>
  );
};

// 스타일 (생략 가능)
const containerStyle = { padding: '50px', textAlign: 'center' as const };
const statusBoxStyle = { margin: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' };
const buttonStyle = { padding: '12px 24px', backgroundColor: '#007AFF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const debugButtonStyle = { marginTop: '50px', display: 'block', fontSize: '12px', color: '#ccc', background: 'none', border: 'none' };

export default TestProjectPage;
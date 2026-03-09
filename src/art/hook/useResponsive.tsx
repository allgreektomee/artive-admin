import { useState, useEffect } from "react";

/**
 * 아티브님의 매거진이 기기별로 다른 레이아웃을 보여주도록
 * 화면 너비를 감시하는 커스텀 훅입니다.
 */
export const useResponsive = () => {
  // 기준점: 768px (일반적인 태블릿/모바일 구분선)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 브라우저 창 크기가 변할 때마다 체크
    window.addEventListener("resize", handleResize);

    // 메모리 누수 방지를 위한 클린업
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

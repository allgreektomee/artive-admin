import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.artivefor.me/api/v1',
    // 기본 Content-Type을 아예 빼거나 설정하지 마세요. 
    // axios가 데이터 타입(객체 vs FormData)을 보고 알아서 판단합니다.
    withCredentials: true,
});

client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); 
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // ⭐ 핵심: 데이터가 FormData(파일)라면 Content-Type을 브라우저에게 맡깁니다.
        // 브라우저가 boundary 값을 포함한 정확한 multipart/form-data 헤더를 생성해야 합니다.
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type']; 
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
    const { status } = error.response;

    // 401(인증만료) 또는 403(권한문제) 발생 시
    if (status === 401 || status === 403) {
      console.warn("인증이 만료되어 로그아웃합니다.");
      
      // 1. 저장된 토큰 삭제
      localStorage.removeItem('token');
      
      // 2. 로그인 페이지로 이동 (window.location 사용 시 강제 리프레시 효과)
      window.location.href = '/login'; 
      
      // 3. 사용자에게 알림
      // message.error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
    
    return Promise.reject(error);
  }
);

export default client;
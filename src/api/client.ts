import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.artivefor.me/api/v1',
    withCredentials: true,
});

// 1. 요청 인터셉터: 토큰 삽입 및 헤더 설정
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // 키 이름 통일
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type']; 
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 2. 응답 인터셉터: 서버 에러(403 등) 처리 🚀 🚀 🚀
client.interceptors.response.use(
    (response) => response, // 정상 응답은 그대로 통과
    (error) => {
        if (error.response) {
            const { status } = error.response;

            // 401(인증만료) 또는 403(권한문제) 발생 시
            if (status === 401 || status === 403) {
                console.warn("인증 만료 또는 권한 없음. 로그아웃 처리합니다.");
                
                // 로컬스토리지 청소 (키 이름 일치시킴)
                localStorage.removeItem('accessToken');
                
                // 로그인 페이지로 튕기기 (무한 루프 방지를 위해 현재 페이지가 /login이 아닐 때만 실행)
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default client;

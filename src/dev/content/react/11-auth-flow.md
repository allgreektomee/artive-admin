# 11장. 로그인과 인증 흐름

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

관리자 앱은 **로그인된 사용자만** 일부 라우트를 쓰게 하는 경우가 대부분이다. 흐름은 크게 **자격 증명 제출 → 토큰 수령·저장 → 이후 요청에 실어 보냄 → 만료·로그아웃 처리**다.

## 로그인 폼

- **제어 컴포넌트**로 id/password를 state에 두고(5장), `onSubmit`에서 `preventDefault`.
- **로딩 중** 버튼 비활성화, **에러 메시지** 표시.
- 성공 시 **리다이렉트**(`useNavigate`)로 이전에 가려던 페이지 또는 대시보드.

## 로그인 API 호출

api 모듈에 `postLogin({ username, password })` 를 두고, 응답에서 **access token**(및 refresh 전략)을 받는다. 백엔드 계약에 맞춰 필드 이름을 맞춘다.

## 토큰 저장 어디에

| 저장소 | 장점 | 단점 |
|--------|------|------|
| **메모리만** | XSS로 스크립트가 돌면 가장 덜 영구적으로 털림 | **새로고침하면 로그아웃** |
| **sessionStorage** | 탭 단위, F5 후에도 유지 | XSS에 노출되면 읽힘 |
| **localStorage** | 오래 유지 | XSS·장기 탈취 위험, 민감 서비스는 정책 검토 |

팀 보안 정책에 맞게 고른다. **refresh token**은 HttpOnly 쿠키에 두고 access만 메모리에 두는 구성도 흔하다.

## 새로고침 후 로그인 복원

앱이 켜질 때:

1. 저장소(또는 쿠키 기반 세션 확인 API)에서 토큰·사용자 정보를 읽고
2. 유효하면 **Context**나 전역 스토어에 넣고
3. 무효면 로그인 페이지로 보낸다.

`useEffect`로 **한 번만** 실행하는 초기화 함수를 두는 패턴이 많다.

## 로그아웃

- 토큰 제거, Context/스토어 초기화, 로그인 페이지로 이동.
- 서버에 **logout API**가 있으면 호출해 refresh 무효화.

## 보호된 라우트

**래퍼 컴포넌트** 예시 개념:

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (user == null) return <Navigate to="/login" replace />;
  return children;
}
```

`App`의 라우트에서 관리자 구역을 이렇게 감싼다. “**어디까지 열려 있는지**”는 제품 정책과 일치시킨다.

## 권한별 메뉴

- 사용자 객체에 `role` 또는 `permissions` 배열을 두고, **메뉴 항목을 필터**한다.
- UI만 숨기는 것과 별개로 **API도 권한 검사**한다는 점을 잊지 않는다.

## 이 프로젝트 참고

`LoginPage`, `useUser`, `AdminLayout` 등에서 실제 흐름을 추적해 보면 좋다.

## 요약

- 로그인은 **폼 → API → 토큰 저장 → 라우팅** 순으로 정리한다.
- **저장소 선택**은 보안·UX 트레이드오프다.
- **ProtectedRoute**로 라우트를 보호하고, **초기 로드 시 세션 복원**을 넣는다.
- **권한은 UI + API** 양쪽에서 다룬다.

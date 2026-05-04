# 10장. 서버 연동과 API 모듈

화면 컴포넌트 안에 `fetch`/`axios` URL과 헤더를 길게 쓰면 **가독성·테스트·재사용**이 나빠진다. **API 모듈**은 “HTTP 요청을 어디서 어떻게 보낼지”를 **한 레이어**로 모으는 것이다. 이 프로젝트는 `src/etc/api` 패턴을 따른다.

## `fetch`와 `axios`

| | fetch | axios |
|---|--------|--------|
| 기본 제공 | 브라우저·Node 18+ | 패키지 설치 |
| JSON | `res.json()` 수동 | 응답 **변환기**로 편함 |
| 요청/응답 인터셉터 | 없음(직접 래핑) | **인터셉터**로 토큰·에러 일괄 처리에 유리 |
| 타임아웃/취소 | `AbortController` | 내장 옵션·인터셉터와 조합 |

실무에서는 **공통 설정(baseURL, 헤더, 에러 포맷)** 을 두기 쉬운 **axios 인스턴스**를 쓰는 경우가 많다. 반면 의존성을 줄이려면 **fetch + 래퍼 함수**도 충분하다.

## API 함수 분리

```jsx
// artworkApi.js
import { apiClient } from "./client.js";

export function getArtworks(params) {
  return apiClient.get("/artworks", { params });
}

export function postArtwork(body) {
  return apiClient.post("/artworks", body);
}

export function deleteArtwork(id) {
  return apiClient.delete(`/artworks/${id}`);
}
```

컴포넌트는 **`getArtworks()`만 호출**하고, 경로·메서드·쿼리 조립은 api 파일에만 둔다.

## loading / error / data

요청 중인 UI를 만들 때 흔한 패턴:

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

async function load() {
  setLoading(true);
  setError(null);
  try {
    const res = await getArtworks();
    setData(res.data);
  } catch (e) {
    setError(e);
  } finally {
    setLoading(false);
  }
}
```

더 정교하게는 **React Query / SWR** 같은 라이브러리로 캐시·재시도를 맡기기도 한다(이 연재 범위 밖이지만 방향만 알아 둔다).

## 실패 처리

- **HTTP 상태** — 401이면 로그인으로 보내기, 403이면 권한 메시지, 5xx는 재시도 또는 토스트.
- **네트워크 끊김** — 타임아웃·오프라인 메시지.
- **일관된 에러 객체** — 인터셉터에서 `{ message, code, status }` 형태로 맞추면 화면 코드가 단순해진다.

## `FormData` 업로드

```jsx
const fd = new FormData();
fd.append("file", file);
fd.append("title", title);
await apiClient.post("/upload", fd, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

## 토큰을 헤더에 붙이기

`apiClient` 생성 시 **요청 인터셉터**에서 `Authorization: Bearer <token>` 을 넣는다. 토큰은 메모리·`sessionStorage` 등 팀 정책에 맞는 저장소에서 읽는다(11장).

## 요약

- API 호출은 **전용 모듈**로 모아 URL·헤더·에러 처리를 한곳에 둔다.
- **axios 인스턴스 + 인터셉터** 또는 **fetch 래퍼**로 공통화한다.
- 화면에서는 **loading / error / data** 상태를 명확히 나누는 패턴이 보편적이다.
- 업로드는 **FormData**, 인증은 **헤더**로 처리한다.

# 10장. 서버 연동과 API 모듈

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

화면 컴포넌트 안에 `fetch`/`axios` URL과 헤더를 길게 쓰면 **가독성·테스트·재사용**이 나빠진다. **API 모듈**은 “HTTP 요청을 어디서 어떻게 보낼지”를 **한 레이어**로 모으는 것이다. 이 프로젝트는 `src/etc/api` 패턴을 따른다.

## `fetch`와 `axios`

| | fetch | axios |
|---|--------|--------|
| 기본 제공 | 브라우저·Node 18+ | 패키지 설치 |
| JSON | `res.json()` 수동 | 응답 **변환기**로 편함 |
| 요청/응답 인터셉터 | 없음(직접 래핑) | **인터셉터**로 토큰·에러 일괄 처리에 유리 |
| 타임아웃/취소 | `AbortController` | 내장 옵션·인터셉터와 조합 |

실무에서는 **공통 설정(baseURL, 헤더, 에러 포맷)** 을 두기 쉬운 **axios 인스턴스**를 쓰는 경우가 많다. 반면 의존성을 줄이려면 **fetch + 래퍼 함수**도 충분하다.

## 브라우저에서 JSON 응답이 처리되는 순서 (`fetch`)

1. **`fetch(url[, options])`** — 네트워크 요청. `signal`로 취소(`AbortController`), `headers`·`method`·`body` 등을 넘길 수 있다.
2. **응답 객체** — `res.ok`는 대략 200~299(성공 계열). 실패 시에도 `fetch`는 **거부(reject)되지 않을 수 있으므로** `res.ok` 또는 `res.status`를 보고 직접 에러로 처리하는 패턴이 흔하다.
3. **`await res.json()`** — 본문을 읽어 JSON을 **JavaScript 객체/배열**로 파싱한다. 스트림은 한 번만 읽을 수 있다.
4. **React 쪽** — 파싱된 값을 `useState` 등에 넣거나, 아래 **React Query / SWR**에 맡겨 캐시·재조회를 통일한다.

**axios**는 성공/실패가 **예외**로 갈리는 경우가 많고, 응답 본문은 보통 **`response.data`**에 이미 객체로 들어 있다(`transformResponse` 기본 동작). 흐름만 보면 역시 **HTTP → 파싱된 데이터 → 상태**다.

실제 네트워크로 위 순서를 확인하려면 아래 Live를 연다(공개 데모 API, 오프라인이면 오류가 날 수 있다).

```react-live
react.api.jsonFetch
```

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

## React Query(TanStack Query)와 SWR

`useEffect` + `useState`만으로도 목록 조회는 가능하지만, **여러 화면이 같은 데이터를 쓰거나**, **포커스 복귀 시 갱신**, **백그라운드 재검증**, **무한 스크롤·페이지네이션**까지 가면 상태 코드가 금방 복잡해진다. 그때 **서버 상태(server state)** 를 전담하는 라이브러리를 쓰는 팀이 많다.

### TanStack Query (예전 이름: React Query)

- **역할**: 쿼리 키(문자열·배열)마다 **캐시**, **중복 요청 제거**, **stale 시간**, **refetch** 정책, **무한 쿼리**, **뮤테이션 후 목록 무효화(invalidate)** 등을 한곳에서 다룸.
- **설치**: `npm install @tanstack/react-query`
- **개념**: `QueryClient` + `QueryClientProvider`로 앱을 감싼 뒤, 컴포넌트에서 `useQuery` / `useMutation`을 쓴다.

```jsx
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const client = new QueryClient();

function Post({ postId }) {
  const q = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
  });
  if (q.isPending) return <p>로딩</p>;
  if (q.isError) return <p>오류</p>;
  return <h1>{q.data.title}</h1>;
}

export function App() {
  return (
    <QueryClientProvider client={client}>
      <Post postId={1} />
    </QueryClientProvider>
  );
}
```

### SWR (stale-while-revalidate)

- **역할**: 이름 그대로 **먼저 캐시(stale)를 보여 주고**, 뒤에서 **재검증(revalidate)**. Vercel 진영에서 널리 쓰인다.
- **설치**: `npm install swr`
- **개념**: `useSWR(키, fetcher)` — 키가 같으면 캐시 공유, 포커스·재연결 시 자동 갱신 옵션 등이 단순하다.

```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => {
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
});

function Post({ postId }) {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    fetcher,
  );
  if (isLoading) return <p>로딩</p>;
  if (error) return <p>오류</p>;
  return <h1>{data.title}</h1>;
}
```

### 고를 때 감

| | TanStack Query | SWR |
|--|----------------|-----|
| 캐시·키 설계 | 쿼리 키·무효화·뮤테이션이 매우 풍부 | 단순한 데이터 가져오기·재검증에 강점 |
| 생태계 | DevTools, v5 문서, 대규모 앱 사례 많음 | 설정이 가벼운 프로젝트에 잘 맞음 |

이 연재 Live는 **의존성을 추가하지 않고** `fetch`만으로 흐름을 보여 준다. 실제 서비스 코드에서는 위 라이브러리 중 하나로 **같은 URL·같은 JSON**을 다루는 경우가 많다.

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
- **`fetch`**: `res.ok` 확인 후 **`res.json()`**으로 객체화. **axios**: 보통 **`response.data`**.
- 화면에서는 **loading / error / data** 상태를 명확히 나누는 패턴이 보편적이다.
- **TanStack Query**, **SWR**은 그 상태·캐시·재조회를 줄여 주는 **서버 상태** 전용 도구다.
- 업로드는 **FormData**, 인증은 **헤더**로 처리한다.

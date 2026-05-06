# 12장. Redux Toolkit

> **reactTestProject** 전체는 **[14장](/dev?tab=react&rd=14-sample-app-walkthrough)** 에서 본다. 이 장의 RTK 코드는 **패턴 설명용**이며, 실제 레포에 Redux가 없어도 동일한 구조로 `npm install @reduxjs/toolkit react-redux` 후 적용할 수 있다. 인증·연동 예시는 필요 시 보관 원고·`src/etc` 흐름과 대조한다.

**전역 상태**가 필요한 순간: **여러 화면**이 같은 도메인 데이터를 쓰고, props drilling·Context만으로는 **갱신 추적·미들웨어·시간 여행 디버깅** 등이 버거울 때. **Redux**는 단일 **store** 안에서 **action → reducer**로 상태를 순수하게 갱신하는 패턴이다. **Redux Toolkit(RTK)** 는 보일러플레이트를 줄여 **`createSlice`**, **`configureStore`** 중심으로 쓰게 해 준다.

## 언제 RTK를 쓰고 언제 안 쓰나

- **안 써도 되는 경우** — 한 페이지 안의 폼·모달만의 state, 서버 캐시를 React Query·SWR에 맡기는 경우.
- **쓰기 좋은 경우** — **로그인 세션**(토큰·사용자 요약), 장바구니급 전역 도메인, 여러 화면이 같은 **작품 목록·선택 ID**를 바꾸고 구독해야 할 때.

작은 앱은 Context+`useReducer`로도 충분하다가, **액션 이름·리듀서·미들웨어**를 규칙으로 묶고 싶을 때 RTK로 옮기는 팀도 있다. 반대로 **모든 API 응답**을 Redux에 넣을 필요는 없다. “서버에서 온 캐시”와 “UI가 잠깐 들고 있는 상태”의 **경계**를 두는 것이 중요하다.

## 기본 개념

- **store** — 전역 state 한 객체 트리(`reducer`들이 키별로 합쳐짐).
- **action** — “무슨 일이 일어났다”는 설명 객체(보통 `type` + `payload`). RTK의 `createSlice`가 만든 **액션 크리에이터**는 호출 시 자동으로 표준 action을 만든다.
- **reducer** — `(state, action) => 다음 state`. **불변 갱신**처럼 보이게 쓰지만, RTK는 **Immer**를 켜 두어 slice 안에서는 `state.xxx = ...`처럼 적어도 된다.
- **dispatch** — 스토어에 action을 보낸다. UI·thunk·미들웨어가 공통으로 이 한 관문을 통과한다.

한 사이클을 말로 풀면 **`dispatch(action)` → store가 reducer 실행 → 다음 state 확정 → `useSelector`로 그 state를 읽는 컴포넌트가 갱신** 순서다.

## 스토어는 보통 앱당 하나 — 싱글톤 패턴과 같은가?

**실무 React 앱에서는 `configureStore`로 만든 인스턴스를 한 번 만들고, 루트에서 `Provider store={store}`에 넣는 패턴이 거의 표준이다.** 그래서 다음과 같이 이해하면 좋다.

- **싱글톤(OOP)과 닮은 점** — 앱이 돌아가는 동안 **“상태의 근원(Source of truth)”이 하나**라는 뜻이다. 여기저기서 `new Store()`를 만들지 않고, **같은 `store` 참조**만 쓴다. 갱신도 **전부 `dispatch`**로만 통일한다.
- **고전 싱글톤 클래스와 다른 점** — `getInstance()` 같은 **숨은 전역 접근자**에 의존하지 않는다. React 쪽에서는 **`Provider`가 store를 주입**하고, 컴포넌트는 `useDispatch`·`useSelector`로만 접근하는 편이 읽기 좋다.
- **테스트** — “앱 전체에 딱 하나”는 **실행 환경 선택**이다. 단위 테스트에서는 **`setup`마다 `configureStore`를 새로** 만들어 깨끗한 state로 돌리면 되므로, **코드가 반드시 패턴으로 싱글톤 클래스를 구현해야 하는 것**은 아니다.

정리하면, **“전역에서 단일 store 인스턴스”** 라는 **아이디어는 싱글톤과 비슷하게 쓰지만**, Redux는 **예측 가능한 데이터 흐름(dispatch → reducer)** 이라는 목적이 더 중요하다.

## `configureStore`

```jsx
import { configureStore } from "@reduxjs/toolkit";
import artworkReducer from "./artworkSlice.js";

export const store = configureStore({
  reducer: {
    artwork: artworkReducer,
    // auth: authReducer, ...
  },
});
```

- `configureStore`는 기본으로 **redux-thunk**, **Immer 기반 slice**, **개발 시 Redux DevTools 연동** 등을 묶어 준다.
- `export const store`는 **모듈 스코프 한 번** 초기화되어, 앱이 살아 있는 동안 같은 객체를 가리키는 전형적인 형태다(위에서 말한 “앱당 하나”).

앱 루트:

```jsx
import { Provider } from "react-redux";
import { store } from "./store.js";

export function App() {
  return (
    <Provider store={store}>
      {/* 라우트 */}
    </Provider>
  );
}
```

## `createSlice` — 액션 이름·리듀서·초기값을 한 덩어리로

```jsx
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

`name`은 생성되는 action `type` 문자열의 접두어로 쓰인다(예: `"auth/logout"`).

## `useSelector` / `useDispatch`

```jsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./authSlice.js";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return user ? <button type="button" onClick={() => dispatch(logout())}>로그아웃</button> : null;
}
```

- **selector**는 **필요한 조각만** 골라 오는 것이 좋다. `useSelector((state) => state.artwork)`처럼 통째로 가져오면, 그 슬라이스 안의 **작은 변경**에도 구독 컴포넌트가 함께 리렌더될 수 있다.
- 여러 필드를 한 객체로 묶어 반환하면 **참조가 매번 바뀌어** 불필요한 리렌더가 날 수 있다. 그때는 필드를 나누거나, **reselect**의 `createSelector`로 메모이즈하는 방식을 쓴다(고급 선택).

## 비동기 응용: `createAsyncThunk` + `extraReducers`

**thunk**가 반환한 **pending / fulfilled / rejected** 액션을 slice에서 받아 **로딩·에러·데이터**를 한곳에 적는 패턴이다. 아래는 **작품 목록 페이지**를 생각한 응용 예이다(`getArtworks`는 API 래퍼로 가정).

```jsx
// artworkSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtworks } from "../api/artworkApi.js"; // 프로젝트에 맞게

export const fetchArtworksPage = createAsyncThunk(
  "artwork/fetchPage",
  async (page, { rejectWithValue }) => {
    try {
      const res = await getArtworks({ page, size: 10 });
      return res.data; // { content, totalElements, ... } 형태라고 가정
    } catch (e) {
      const message = e?.response?.data?.message ?? e.message ?? "요청 실패";
      return rejectWithValue(message);
    }
  },
);

const artworkSlice = createSlice({
  name: "artwork",
  initialState: {
    list: [],
    page: 0,
    totalElements: 0,
    loading: false,
    error: null,
    selectedId: null,
  },
  reducers: {
    selectArtwork(state, action) {
      state.selectedId = action.payload;
    },
    clearArtworkError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworksPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtworksPage.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.content ?? [];
        state.totalElements = action.payload.totalElements ?? 0;
        state.page = action.meta.arg;
      })
      .addCase(fetchArtworksPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "오류";
      });
  },
});

export const { selectArtwork, clearArtworkError } = artworkSlice.actions;
export default artworkSlice.reducer;
```

**목록 화면**에서 쓰는 모습(의사 코드에 가깝게):

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtworksPage, selectArtwork } from "./artworkSlice.js";

export function ArtworkListPage() {
  const dispatch = useDispatch();
  const { list, loading, error, page, totalElements, selectedId } = useSelector((s) => s.artwork);

  useEffect(() => {
    dispatch(fetchArtworksPage(0));
  }, [dispatch]);

  if (loading && list.length === 0) return <p>목록 불러오는 중…</p>;
  if (error) return <p>오류: {error}</p>;

  return (
    <div>
      <p>선택된 작품 ID: {selectedId ?? "없음"}</p>
      <ul>
        {list.map((row) => (
          <li key={row.id}>
            <button type="button" onClick={() => dispatch(selectArtwork(row.id))}>
              {row.title ?? row.koTitle}
            </button>
          </li>
        ))}
      </ul>
      {/* 페이지네이션에서 dispatch(fetchArtworksPage(nextPage)) */}
    </div>
  );
}
```

이렇게 하면 **목록·선택 ID**를 라우트 밖의 컴포넌트나 사이드 패널과 **같은 slice**로 공유하기 쉽다. 상세 페이지는 `selectedId` 또는 `useParams`의 `id`와 slice의 `list`·별도 `detail` 상태를 조합해 쓰면 된다.

## 도메인별 slice 나누기

```text
src/store/
  store.js           ← configureStore만
  artworkSlice.js
  authSlice.js
  uiSlice.js         ← 토스트, 사이드바 열림 등 순수 UI 전역(선택)
```

- **한 slice에 모든 것을 넣지 않는다.** `artwork`, `auth`, `ui`처럼 **바뀌는 이유가 다른 데이터**는 나누는 편이 테스트·리뷰에 유리하다.
- slice끼리 **동기화가 필요**하면 (A 액션 후 B state도 갱신) **extraReducers에서 다른 slice의 액션 타입을 listen**하거나, **한 thunk 안에서 여러 dispatch**를 호출하는 방식을 검토한다. 남용하면 의존 관계가 꼬이므로, 우선 **도메인 경계**부터 지키는 것이 좋다.

## RTK Query(선택)

같은 패키지 계열에서 **쿼리 키·캐시·재요청**까지 통합한다. 이 연재에서는 **thunk + slice**만 익혀도 대부분의 레거시·중간 규모 코드를 읽을 수 있다. 새 프로젝트는 팀에 따라 RTK Query 중심으로 가기도 한다.

## 요약

- RTK는 **전역 도메인 상태**와 **일관된 갱신 규칙**이 필요할 때 유리하다.
- 앱 런타임에서는 보통 **store 인스턴스가 하나**라는 점에서 **싱글톤과 비슷한 역할**을 하지만, 핵심은 **단일 진실 공급원 + dispatch 단일 관문**이다.
- **`configureStore` + `createSlice` + `useSelector`/`useDispatch`** 가 코어다.
- 비동기는 **`createAsyncThunk`** 로 액션 파이프라인에 넣고, slice의 **`extraReducers`**에서 `pending`·`fulfilled`·`rejected`를 처리한다.
- 모든 데이터를 Redux에 넣을 필요는 없다 — **React Query·폼 로컬 state** 등과 역할을 나눈다.

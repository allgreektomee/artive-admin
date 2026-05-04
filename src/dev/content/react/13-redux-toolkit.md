# 13장. Redux Toolkit

> **reactTestProject**: 본문 **맨 아래**에 이 장과 연결된 파일 **전체 원문**(색 구문 강조)이 붙습니다(실무 RTK는 `src/etc`와 대조). React 탭 홈 「소스 보기」에서도 같은 파일을 고를 수 있습니다.

**전역 상태**가 필요한 순간: **여러 화면**이 같은 도메인 데이터를 쓰고, props drilling·Context만으로는 **갱신 추적·미들웨어·시간 여행 디버깅** 등이 버거울 때. **Redux**는 단일 **store** 안에서 **action → reducer**로 상태를 순수하게 갱신하는 패턴이다. **Redux Toolkit(RTK)** 는 보일러플레이트를 줄여 **`createSlice`**, **`configureStore`** 중심으로 쓰게 해 준다.

## 언제 RTK를 쓰고 언제 안 쓰나

- **안 써도 되는 경우** — 한 페이지 안의 폼·모달만의 state, 서버 캐시를 React Query에 맡기는 경우.
- **쓰기 좋은 경우** — **로그인 사용자**, **장바구니급 전역 도메인**, 여러 기능이 같은 **아트워크 목록 캐시**를 공유하고 동기화해야 할 때.

작은 앱은 Context+`useReducer`로도 충분하다가, 규칙·도구가 필요해지면 RTK로 옮기는 팀도 있다.

## 기본 개념

- **store** — 전역 state 한 객체 트리(슬라이스들이 합쳐짐).
- **action** — “무슨 일이 일어났다”는 설명 객체(보통 `type` + `payload`).
- **reducer** — `(state, action) => newState` — **불변 갱신**처럼 보이지만 RTK는 **Immer**로 내부에서 mutable 처럼 적을 수 있다.
- **dispatch** — 스토어에 action을 보낸다.

## `configureStore`

```jsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import artworkReducer from "./artworkSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artwork: artworkReducer,
  },
});
```

앱 루트에서 `Provider store={store}` 로 감싼다(`react-redux`).

## `createSlice`

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

**selector**는 가능한 한 **필요한 조각만** 구독해 불필요한 리렌더를 줄인다.

## 비동기: `createAsyncThunk`

API 호출 후 결과로 slice의 `extraReducers`에 `fulfilled` 등을 처리한다. 로딩·에러 필드를 state에 두고 UI에 반영한다.

```jsx
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArtworks = createAsyncThunk("artwork/fetchAll", async () => {
  const res = await getArtworks();
  return res.data;
});
```

## RTK Query(선택)

같은 패키지 계열에서 **캐시·재요청**까지 통합한 솔루션. 이 연재에서는 **thunk + slice** 패턴까지만 익혀 두면 실무 코드를 읽기에 충분하다.

## 요약

- RTK는 **전역 도메인 상태**를 구조적으로 관리할 때 유리하다.
- **`configureStore` + `createSlice` + `useSelector`/`useDispatch`** 가 코어다.
- 비동기는 **`createAsyncThunk`** 로 action화하고, slice에서 결과를 반영한다.
- 모든 화면 데이터를 Redux에 넣을 필요는 없다 — **경계**를 두는 것이 중요하다.

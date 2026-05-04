# 12장. 폼과 등록·수정 화면

관리자 **등록·수정**은 같은 폼을 **모드만 바꿔** 재사용하는 경우가 많다. URL·라우트(9장), API(10장), 인증(11장)과 맞물려 **가장 실무 비중이 큰 화면** 중 하나다.

## 제어 컴포넌트로 통일

input, textarea, select를 **각각 state** 또는 **하나의 객체 state**(`form.title`, `form.artist`)에 묶는다. 비동기로 서버에서 받은 초기값은 **`useEffect`로 state에 반영**하거나, react-query 등으로 **data가 준비된 뒤에만** 폼을 렌더한다.

## 필드 종류별 포인트

- **text / email / number** — `value` + `onChange` (`e.target.value`, number는 `Number()` 변환).
- **checkbox** — `checked` + `onChange` (`e.target.checked`).
- **select** — `value` 는 선택된 `option`의 value 문자열.
- **textarea** — 긴 본문, `rows` 조절.

## 검증

- **제출 시점**만 검증하는 **lazy validation**과, **입력 중** 실시간 검증을 나눈다.
- 에러는 `errors.title` 같은 **객체**로 모아 필드 아래에 표시.
- 서버가 돌려준 필드별 에러(422 등)를 **맵으로 합치기**도 한다.

## 등록 vs 수정

- **등록** — 빈 초기값, `POST` (또는 REST 계약에 맞는 메서드).
- **수정** — `useParams`로 id, 마운트 시 **GET**으로 기존 데이터 로드 후 state 채움, 제출 시 `PUT`/`PATCH`.
- 같은 컴포넌트에서 `isEdit = Boolean(id)` 처럼 분기해 **제목·버튼 문구**만 바꿀 수 있다.

## 저장 payload

- 폼 state를 그대로 보내지 않고 **API가 기대하는 형태**로 가공(날짜 포맷, 불필요 필드 제거).
- 이미지 id 배열·순서 등은 14장과 연결해 **별도 state**에서 합친다.

## 이중 제출 방지

제출 중 **`submitting` 플래그**로 버튼 비활성화, 중복 클릭 방지.

## 이 프로젝트 참고

`ArtworkPost`, `HistoryPost` 등에서 **폼 state와 API 연결**을 따라가 보면 좋다.

## 요약

- 등록·수정은 **한 폼 + 모드 분기**가 흔하다.
- **제어 컴포넌트 + 검증 + submitting** 패턴을 기본으로 한다.
- 수정은 **id로 불러오기** 후 state에 넣고, payload는 **API 스키마**에 맞게 가공한다.

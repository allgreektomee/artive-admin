# 빌드·트랜스파일·JSX·타입과 마무리

실무 JavaScript 프로젝트는 작성한 코드를 그대로 배포하지 않는 경우가 많다. 브라우저 호환성을 맞추고, 여러 파일을 묶고, JSX를 변환하고, 타입 검사를 거쳐 최종 결과물을 만든다. 이 과정을 넓게 묶어 빌드라고 부른다.

## 이 글의 위치

앞 글에서는 npm과 코드 품질 도구를 다뤘다. 이번 글은 3부의 마무리로 빌드, 트랜스파일, JSX, TypeScript, 미니 프로젝트 흐름을 정리한다.

## 먼저 잡을 핵심

- 빌드는 개발용 소스 코드를 실행 또는 배포 가능한 결과물로 만드는 과정이다.
- 번들러는 여러 파일과 의존성을 묶어준다.
- 트랜스파일은 최신 문법을 다른 문법으로 변환하는 과정이다.
- JSX는 JavaScript 안에서 UI 구조를 표현하는 문법 확장이다.
- TypeScript는 JavaScript에 정적 타입 검사를 더한 언어다.

## 빌드란?

빌드는 소스 코드를 배포 가능한 형태로 준비하는 과정이다.

```bash
npm run build
```

빌드 과정에서는 보통 다음 작업이 일어난다.

- 모듈 해석
- 코드 변환
- 파일 묶기
- 압축
- 정적 파일 생성
- 타입 검사

프로젝트마다 빌드 과정은 다르지만 목적은 같다. 개발자가 작성한 코드를 실제 실행 환경에 맞게 준비하는 것이다.

## 번들러

번들러는 여러 JavaScript 파일과 의존성을 하나 또는 여러 개의 결과물로 묶는다. Vite, webpack, Rollup, esbuild 같은 도구가 대표적이다.

```js
// main.js
import { add } from './math.js';

console.log(add(2, 3));
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

브라우저가 직접 모든 파일과 패키지 의존성을 효율적으로 처리하기 어렵기 때문에 번들러가 중간에서 정리해준다.

## 트랜스파일

트랜스파일은 한 형태의 코드를 다른 형태의 코드로 바꾸는 과정이다. 대표적으로 최신 JavaScript 문법을 더 오래된 브라우저에서도 실행 가능한 코드로 바꾸는 작업이 있다.

```js
const doubled = [1, 2, 3].map((value) => value * 2);
```

트랜스파일 도구는 이런 코드를 대상 환경에 맞춰 변환할 수 있다. Babel과 TypeScript 컴파일러가 대표적이다.

## JSX

JSX는 JavaScript 안에서 HTML처럼 보이는 UI 구조를 작성하는 문법 확장이다.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

브라우저는 JSX를 그대로 이해하지 못한다. 빌드 도구가 JSX를 JavaScript 함수 호출 형태로 변환한다.

```js
function Greeting({ name }) {
  return React.createElement('h1', null, 'Hello, ', name);
}
```

실제 변환 결과는 사용하는 JSX 런타임과 설정에 따라 달라진다.

## TypeScript

TypeScript는 JavaScript에 타입 문법을 더한 언어다.

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));
```

타입 검사를 통해 잘못된 값 전달을 실행 전에 발견할 수 있다.

```ts
add('2', 3);
```

위 코드는 타입 검사에서 오류가 된다. TypeScript는 런타임을 바꾸는 도구라기보다, 개발 중에 오류를 더 빨리 찾도록 돕는 도구다.

## 타입과 런타임

TypeScript 타입은 빌드 후 JavaScript에서 사라진다.

```ts
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: 'Kim',
};
```

실행되는 JavaScript에는 `User` 타입 정보가 남지 않는다. 그래서 외부 입력 검증은 TypeScript 타입만 믿지 말고 런타임 검증도 필요하다.

## 미니 프로젝트 흐름

지금까지 배운 내용을 작은 프로젝트로 연결하면 좋다.

예시 주제:

- 할 일 목록
- 검색 필터가 있는 카드 목록
- 로컬 저장소를 사용하는 메모 앱
- fetch로 데이터를 불러오는 목록 화면

기본 흐름:

```text
1. HTML 구조를 만든다.
2. CSS로 기본 레이아웃을 잡는다.
3. JavaScript로 DOM을 찾는다.
4. 이벤트를 연결한다.
5. 상태를 배열이나 객체로 관리한다.
6. 상태가 바뀌면 화면을 다시 그린다.
7. 필요하면 localStorage나 fetch를 연결한다.
```

처음부터 프레임워크를 쓰기보다 순수 JavaScript로 이 흐름을 한 번 만들어보면 React나 Vue가 어떤 문제를 해결하는지 더 잘 보인다.

## 실무 프로젝트 감각

실무 프로젝트에서는 보통 다음 흐름을 반복한다.

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

개발 서버로 확인하고, 린트와 테스트로 품질을 점검하고, 빌드로 배포 가능한 결과물을 만든다.

## 선택 기준 정리

- 여러 파일과 패키지를 묶어야 하면 번들러를 사용한다.
- 최신 문법 호환성이 필요하면 트랜스파일을 고려한다.
- React 같은 UI 라이브러리를 쓰면 JSX를 자주 만난다.
- 규모가 커지고 협업이 필요하면 TypeScript가 큰 도움이 된다.
- 타입 검사는 런타임 검증을 완전히 대체하지 않는다.

## 정리

3부에서는 JavaScript가 실제 환경에서 어떻게 실행되는지 살펴봤다. 브라우저에서는 DOM, 이벤트, 네트워크, 저장소를 다루고, Node.js에서는 파일, 프로세스, 서버, 도구를 다룬다.

마지막으로 빌드와 타입 도구까지 이해하면 JavaScript 문법 지식이 실제 프로젝트 구조로 이어진다. 이제 중요한 것은 작은 프로젝트를 직접 만들며 흐름을 몸에 익히는 것이다.

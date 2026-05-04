# npm과 코드 품질

JavaScript 실무에서는 직접 작성한 코드만큼 외부 패키지와 개발 도구를 잘 다루는 것이 중요하다. npm은 패키지를 설치하고 스크립트를 실행하는 기본 도구이고, ESLint, Prettier, Jest 같은 도구는 코드 품질을 유지하는 데 도움을 준다.

## 이 글의 위치

앞 글에서는 Node.js의 시스템 API를 살펴봤다. 이번 글에서는 프로젝트를 관리하고 코드 품질을 유지하는 실무 도구를 정리한다.

## 먼저 잡을 핵심

- npm은 Node.js 패키지 매니저다.
- `package.json`은 프로젝트 정보, 의존성, 스크립트를 담는다.
- `dependencies`는 실행에 필요한 패키지, `devDependencies`는 개발에 필요한 패키지다.
- ESLint는 코드 문제를 찾고, Prettier는 코드 형식을 맞춘다.
- Jest 같은 테스트 도구는 코드가 의도대로 동작하는지 확인한다.

## package.json

`package.json`은 Node.js 프로젝트의 중심 설정 파일이다.

```json
{
  "name": "my-app",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

프로젝트 이름, 모듈 방식, 실행 스크립트, 설치된 패키지 정보가 들어간다.

## npm scripts

`scripts`에 등록한 명령은 `npm run`으로 실행한다.

```bash
npm run dev
npm run build
npm test
```

반복해서 실행하는 명령을 스크립트로 정리하면 팀원 모두 같은 방식으로 개발하고 빌드할 수 있다.

## dependencies와 devDependencies

`dependencies`는 애플리케이션 실행에 필요한 패키지다.

```bash
npm install axios
```

`devDependencies`는 개발 중에만 필요한 도구다.

```bash
npm install -D eslint prettier jest
```

빌드 도구, 린터, 테스트 도구는 보통 `devDependencies`에 들어간다.

## package-lock.json

`package-lock.json`은 실제 설치된 의존성 버전을 고정한다. 같은 `package.json`이라도 시간이 지나면 하위 의존성 버전이 달라질 수 있는데, lock 파일은 설치 결과를 재현 가능하게 만든다.

```bash
npm ci
```

CI 환경에서는 `npm install`보다 `npm ci`를 자주 사용한다. lock 파일 기준으로 깨끗하게 설치하기 때문이다.

## ESLint

ESLint는 코드에서 잠재적인 문제를 찾는 도구다.

```bash
npm run lint
```

예를 들어 사용하지 않는 변수, 위험한 비교, React Hooks 규칙 위반 같은 문제를 찾아준다. ESLint의 목적은 코드 스타일보다 버그 가능성을 줄이는 데 더 가깝다.

## Prettier

Prettier는 코드 포맷터다. 줄바꿈, 들여쓰기, 따옴표 같은 형식을 자동으로 맞춘다.

```bash
npx prettier . --write
```

ESLint가 "문제 찾기"에 가깝다면 Prettier는 "모양 맞추기"에 가깝다. 둘을 함께 쓰면 코드 리뷰에서 형식 논쟁을 줄일 수 있다.

## 테스트

테스트는 코드가 기대한 대로 동작하는지 확인하는 자동화된 코드다.

```js
function add(a, b) {
  return a + b;
}

test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

실행 결과:

```text
PASS adds numbers
```

테스트 도구는 Jest, Vitest, Testing Library 등 프로젝트 성격에 따라 선택한다.

## 코드 품질 루틴

실무 프로젝트에서는 보통 아래 흐름을 만든다.

```bash
npm run lint
npm test
npm run build
```

커밋 전이나 PR 전 이 명령들이 통과하면 기본적인 품질을 확인할 수 있다.

## 선택 기준 정리

- 패키지 설치와 스크립트 실행은 npm으로 관리한다.
- 반복 명령은 `package.json`의 `scripts`에 등록한다.
- 실행 패키지는 `dependencies`, 개발 도구는 `devDependencies`에 둔다.
- 코드 문제는 ESLint로 찾는다.
- 코드 형식은 Prettier로 맞춘다.
- 중요한 로직은 테스트로 보호한다.

## 정리

npm과 코드 품질 도구는 프로젝트를 개인 작업에서 팀 작업으로 확장하는 기반이다. 코드를 잘 쓰는 것만큼, 같은 방식으로 설치하고 검사하고 빌드하는 흐름을 만드는 것이 중요하다.

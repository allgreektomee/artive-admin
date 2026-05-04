# 내비게이션·네트워크·저장소·Worker

현대 웹 애플리케이션은 화면 안에서 주소를 바꾸고, 서버와 데이터를 주고받고, 브라우저에 데이터를 저장하고, 무거운 작업을 별도 스레드로 넘긴다. 이 글에서는 그 기반이 되는 브라우저 API를 정리한다.

## 이 글의 위치

앞 글에서는 컴포넌트, 그래픽, 미디어 API를 훑어봤다. 이번 글에서는 애플리케이션 동작에 직접 연결되는 내비게이션, 네트워크, 저장소, Worker를 다룬다.

## 먼저 잡을 핵심

- History API는 페이지 새로고침 없이 주소를 바꿀 수 있게 한다.
- `fetch()`는 HTTP 요청을 보내는 표준 API다.
- `localStorage`와 `sessionStorage`는 브라우저에 문자열 데이터를 저장한다.
- Web Worker는 무거운 작업을 메인 스레드 밖에서 실행한다.
- 브라우저 저장소와 Worker는 편리하지만 용량, 보안, 직렬화 제약을 고려해야 한다.

## History API

브라우저 주소는 `history.pushState()`로 바꿀 수 있다.

```js
history.pushState({ page: 'about' }, '', '/about');

console.log(location.pathname);
```

실행 결과:

```text
/about
```

SPA 라우터는 이런 기능을 기반으로 페이지 새로고침 없이 화면을 바꾼다.

## 뒤로 가기 처리

사용자가 뒤로 가기를 누르면 `popstate` 이벤트가 발생한다.

```js
window.addEventListener('popstate', (event) => {
  console.log(location.pathname);
  console.log(event.state);
});
```

라우터는 현재 주소를 읽고 어떤 화면을 보여줄지 결정한다.

## fetch 기본

`fetch()`는 서버에 HTTP 요청을 보낸다.

```js
async function loadUser() {
  const response = await fetch('/api/user');
  const user = await response.json();

  console.log(user);
}
```

`fetch()`는 Promise를 반환한다. 응답 본문을 JSON으로 읽을 때는 `response.json()`을 다시 `await`한다.

## HTTP 에러 처리

`fetch()`는 서버가 404나 500을 반환해도 네트워크 요청 자체가 완료되면 rejected Promise가 되지 않는다. 응답 상태를 직접 확인해야 한다.

```js
async function requestJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

`response.ok`는 상태 코드가 성공 범위인지 알려준다.

## POST 요청

데이터를 보낼 때는 `method`, `headers`, `body`를 지정한다.

```js
async function createPost(title) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  return response.json();
}
```

서버와 JSON을 주고받을 때는 `Content-Type`과 직렬화를 함께 맞춰야 한다.

## localStorage와 sessionStorage

브라우저 저장소는 문자열 키-값을 저장한다.

```js
localStorage.setItem('theme', 'dark');

console.log(localStorage.getItem('theme'));

localStorage.removeItem('theme');
```

`localStorage`는 브라우저를 닫아도 남고, `sessionStorage`는 탭 세션이 끝나면 사라진다.

## 객체 저장하기

저장소는 문자열만 저장하므로 객체는 JSON으로 바꿔야 한다.

```js
const settings = { theme: 'dark', compact: true };

localStorage.setItem('settings', JSON.stringify(settings));

const raw = localStorage.getItem('settings');
const parsed = raw ? JSON.parse(raw) : null;

console.log(parsed);
```

민감한 토큰이나 개인정보를 브라우저 저장소에 넣는 것은 신중해야 한다. XSS 공격에 노출되면 읽힐 수 있다.

## Web Worker

JavaScript는 브라우저 메인 스레드에서 UI와 함께 실행된다. 무거운 계산이 오래 걸리면 화면이 멈춘 것처럼 느껴질 수 있다. Web Worker는 이런 작업을 별도 스레드로 넘기는 API다.

```js
const worker = new Worker('/worker.js');

worker.postMessage({ count: 1000 });

worker.addEventListener('message', (event) => {
  console.log(event.data);
});
```

Worker 파일에서는 메시지를 받아 처리한다.

```js
// worker.js
self.addEventListener('message', (event) => {
  const { count } = event.data;
  self.postMessage({ result: count * 2 });
});
```

Worker와 메인 스레드는 메시지로 데이터를 주고받는다. DOM을 직접 조작할 수는 없다.

## 선택 기준 정리

- 주소만 바꾸고 화면은 JavaScript로 렌더링하려면 History API를 사용한다.
- HTTP 요청은 `fetch()`를 사용하되 `response.ok`를 확인한다.
- 간단한 문자열 설정은 `localStorage`나 `sessionStorage`를 사용할 수 있다.
- 객체 저장은 JSON 직렬화와 파싱을 함께 고려한다.
- 무거운 계산으로 UI가 멈추면 Web Worker를 고려한다.

## 정리

내비게이션, 네트워크, 저장소, Worker는 웹 애플리케이션을 애플리케이션답게 만드는 핵심 API다. 주소, 서버 데이터, 로컬 상태, 무거운 작업을 각각 어떤 API로 다루는지 구분하면 브라우저 환경이 훨씬 선명해진다.

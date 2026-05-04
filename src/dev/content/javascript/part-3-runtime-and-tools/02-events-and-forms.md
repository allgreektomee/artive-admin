# 이벤트와 폼

웹 페이지는 사용자의 행동에 반응해야 한다. 클릭, 입력, 제출, 키보드 조작 같은 행동을 JavaScript에서 다루는 방법이 이벤트다. 폼은 사용자의 입력을 모아 서버나 애플리케이션 로직으로 전달하는 기본 구조다.

## 이 글의 위치

앞 글에서는 DOM 요소를 찾고 바꾸는 방법을 봤다. 이번 글에서는 사용자의 행동을 이벤트로 받고, 폼 입력값을 읽고 검증하는 흐름을 정리한다.

## 먼저 잡을 핵심

- 이벤트는 브라우저에서 발생한 사용자의 행동이나 상태 변화를 나타낸다.
- `addEventListener()`로 이벤트 핸들러를 등록한다.
- 이벤트 객체에는 클릭한 대상, 입력값, 기본 동작 제어 정보가 들어 있다.
- 폼 제출은 기본적으로 페이지 이동을 일으킬 수 있으므로 `preventDefault()`를 자주 사용한다.
- 이벤트 위임은 부모 요소에서 하위 요소 이벤트를 한 번에 처리하는 패턴이다.

## 클릭 이벤트

버튼 클릭에 반응하려면 `addEventListener()`를 사용한다.

```js
const button = document.querySelector('button');

button?.addEventListener('click', () => {
  console.log('clicked');
});
```

첫 번째 인자는 이벤트 이름이고, 두 번째 인자는 이벤트가 발생했을 때 실행할 함수다. 이 함수를 이벤트 핸들러라고 부른다.

## 이벤트 객체

이벤트 핸들러는 이벤트 객체를 받을 수 있다.

```js
const button = document.querySelector('button');

button?.addEventListener('click', (event) => {
  console.log(event.type);
  console.log(event.currentTarget === button);
});
```

`event.type`은 이벤트 이름이고, `event.currentTarget`은 이벤트 핸들러가 등록된 요소다.

## target과 currentTarget

이벤트에서 자주 헷갈리는 값이 `target`과 `currentTarget`이다.

```js
const list = document.querySelector('#list');

list?.addEventListener('click', (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

`target`은 실제 이벤트가 시작된 요소이고, `currentTarget`은 현재 이벤트 핸들러가 붙어 있는 요소다. 이벤트 위임을 쓸 때 이 차이가 중요하다.

## 이벤트 전파

브라우저 이벤트는 보통 하위 요소에서 시작해 부모 요소로 올라간다. 이를 버블링이라고 한다.

```js
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

parent?.addEventListener('click', () => {
  console.log('parent');
});

child?.addEventListener('click', () => {
  console.log('child');
});
```

자식 요소를 클릭하면 자식 핸들러가 실행된 뒤 부모 핸들러도 실행될 수 있다.

## 이벤트 위임

여러 하위 요소에 각각 이벤트를 붙이지 않고, 부모 요소 하나에서 처리하는 패턴을 이벤트 위임이라고 한다.

```js
const list = document.querySelector('#todo-list');

list?.addEventListener('click', (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) return;
  if (!target.matches('button[data-action="delete"]')) return;

  console.log('delete item');
});
```

동적으로 추가되는 요소까지 처리할 수 있어 목록 UI에서 자주 사용한다.

## 입력값 읽기

입력 요소의 값은 `value`로 읽는다.

```js
const input = document.querySelector('input');

input?.addEventListener('input', () => {
  console.log(input.value);
});
```

`input` 이벤트는 사용자가 값을 입력할 때마다 발생한다.

## 폼 제출

폼 제출은 `submit` 이벤트로 처리한다.

```js
const form = document.querySelector('form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  console.log(formData.get('email'));
});
```

`preventDefault()`는 브라우저의 기본 동작을 막는다. 폼 제출의 기본 동작은 페이지 이동이나 새 요청이 될 수 있으므로, JavaScript로 처리할 때는 자주 사용한다.

## 간단한 검증

제출 전에 입력값을 확인할 수 있다.

```js
const form = document.querySelector('form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const email = String(formData.get('email') ?? '');

  if (!email.includes('@')) {
    console.log('이메일 형식을 확인하세요.');
    return;
  }

  console.log('submit');
});
```

클라이언트 검증은 사용자 경험을 좋게 만들지만, 서버 검증을 대체하지는 않는다. 최종 검증은 항상 서버에서도 해야 한다.

## 선택 기준 정리

- 사용자 행동에 반응하려면 `addEventListener()`를 사용한다.
- 기본 브라우저 동작을 막아야 하면 `preventDefault()`를 사용한다.
- 실제 클릭된 요소가 필요하면 `event.target`을 본다.
- 이벤트 핸들러가 붙은 요소가 필요하면 `event.currentTarget`을 본다.
- 목록처럼 하위 요소가 많거나 동적으로 바뀌면 이벤트 위임을 고려한다.

## 정리

이벤트는 웹 페이지를 정적인 문서에서 상호작용하는 화면으로 바꾼다. 폼은 사용자 입력을 받는 대표적인 구조다.

이벤트 객체, 기본 동작, 이벤트 전파를 이해하면 클릭과 입력 처리를 더 안정적으로 만들 수 있다.

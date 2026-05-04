# 브라우저 실행과 DOM 기초

JavaScript는 브라우저 안에서 HTML과 CSS를 읽고, 사용자의 행동에 반응하고, 화면을 바꾸는 역할을 한다. 브라우저 실행 환경을 이해하면 "코드는 언제 실행되고, 화면 요소는 어떻게 찾고 바꾸는지"가 보인다.

## 이 글의 위치

1부와 2부에서는 JavaScript 문법과 표준 객체를 다뤘다. 3부에서는 그 코드가 브라우저와 Node.js 같은 실행 환경에서 어떻게 쓰이는지 살펴본다. 이번 글은 브라우저와 DOM의 기본이다.

## 먼저 잡을 핵심

- 브라우저는 HTML을 읽어 DOM 트리를 만든다.
- DOM은 JavaScript가 문서 구조를 다룰 수 있게 만든 객체 모델이다.
- `document.querySelector()`로 요소를 찾을 수 있다.
- 요소의 텍스트, 속성, 클래스, 스타일을 JavaScript로 바꿀 수 있다.
- 스크립트 실행 시점은 DOM 조작 가능 여부에 영향을 준다.

## 브라우저 실행 환경

브라우저에서 JavaScript는 웹 페이지와 함께 실행된다. 이때 브라우저가 제공하는 대표 전역 객체가 `window`와 `document`다.

```js
console.log(typeof window);
console.log(typeof document);
```

실행 결과:

```text
object
object
```

`window`는 브라우저 창 전체를 나타내고, `document`는 현재 HTML 문서를 나타낸다. Node.js에는 기본적으로 `window`와 `document`가 없다.

## DOM이란?

DOM은 Document Object Model의 줄임말이다. HTML 문서를 JavaScript가 다룰 수 있는 객체 구조로 표현한 것이다.

```html
<main>
  <h1>Hello</h1>
  <p>JavaScript</p>
</main>
```

브라우저는 이 HTML을 읽어 `document`, `main`, `h1`, `p` 같은 노드로 구성된 트리를 만든다. JavaScript는 이 DOM 트리의 노드를 찾아 읽거나 바꾼다.

## 요소 찾기

가장 자주 쓰는 선택 메서드는 `querySelector()`와 `querySelectorAll()`이다.

```js
const title = document.querySelector('h1');
const items = document.querySelectorAll('.item');

console.log(title?.textContent);
console.log(items.length);
```

`querySelector()`는 첫 번째 요소 하나를 반환하고, `querySelectorAll()`은 조건에 맞는 요소 목록을 반환한다.

## 텍스트 바꾸기

요소의 텍스트는 `textContent`로 바꿀 수 있다.

```js
const title = document.querySelector('#title');

if (title) {
  title.textContent = 'Updated title';
}
```

`querySelector()`가 요소를 찾지 못하면 `null`을 반환한다. 그래서 실제 코드에서는 요소가 있는지 확인한 뒤 조작하는 습관이 좋다.

## 속성과 클래스 조작

HTML 속성은 `setAttribute()`와 `getAttribute()`로 다룰 수 있다.

```js
const link = document.querySelector('a');

if (link) {
  link.setAttribute('href', 'https://example.com');
  console.log(link.getAttribute('href'));
}
```

클래스는 `classList`로 다루는 편이 편하다.

```js
const panel = document.querySelector('.panel');

if (panel) {
  panel.classList.add('is-open');
  panel.classList.toggle('is-active');
  panel.classList.remove('is-hidden');
}
```

## 요소 만들기

새 요소는 `document.createElement()`로 만든 뒤 DOM에 추가한다.

```js
const list = document.querySelector('#list');
const item = document.createElement('li');

item.textContent = 'new item';

if (list) {
  list.append(item);
}
```

문자열로 HTML을 붙이는 방식보다 요소를 직접 만들면 사용자 입력을 다룰 때 더 안전한 코드를 만들기 쉽다.

## 실행 시점

DOM 요소가 만들어지기 전에 JavaScript가 먼저 실행되면 요소를 찾지 못할 수 있다.

```js
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('h1');
  console.log(title?.textContent);
});
```

`DOMContentLoaded`는 HTML 파싱이 끝나 DOM을 조작할 수 있을 때 발생한다.

## 선택 기준 정리

- 요소 하나를 찾을 때는 `querySelector()`를 사용한다.
- 여러 요소를 찾을 때는 `querySelectorAll()`을 사용한다.
- 텍스트는 `textContent`로 바꾼다.
- 클래스는 `classList`로 다룬다.
- DOM 조작 코드는 요소가 존재하는지 확인하고 실행한다.

## 정리

브라우저에서 JavaScript는 DOM을 통해 HTML 문서를 다룬다. DOM은 HTML을 객체 트리로 표현한 것이고, JavaScript는 이 트리의 요소를 찾아 읽고 바꾼다.

DOM 조작의 핵심은 요소를 찾고, 필요한 값만 바꾸고, 실행 시점을 안전하게 맞추는 것이다.

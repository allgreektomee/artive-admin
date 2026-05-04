# CSS 연동과 레이아웃

JavaScript는 DOM을 바꿀 수 있고, DOM에는 스타일도 포함된다. 하지만 모든 스타일을 JavaScript로 처리하는 것은 좋은 방향이 아니다. CSS가 잘하는 일과 JavaScript가 해야 하는 일을 나누는 것이 중요하다.

## 이 글의 위치

앞 글에서는 이벤트와 폼을 다뤘다. 이번 글에서는 이벤트에 반응해 클래스와 스타일을 바꾸고, 요소의 위치와 크기를 읽는 방법을 정리한다.

## 먼저 잡을 핵심

- 스타일 변경은 가능하면 클래스 토글로 처리한다.
- `style` 프로퍼티는 인라인 스타일을 직접 바꿀 때 사용한다.
- `getComputedStyle()`은 실제 적용된 스타일을 읽는다.
- `getBoundingClientRect()`는 요소의 위치와 크기를 알려준다.
- 스크롤 위치와 창 크기는 레이아웃 계산에 자주 사용된다.

## 클래스 토글

UI 상태는 클래스로 표현하는 편이 좋다.

```js
const button = document.querySelector('button');
const panel = document.querySelector('.panel');

button?.addEventListener('click', () => {
  panel?.classList.toggle('is-open');
});
```

CSS는 상태에 따른 표현을 담당한다.

```css
.panel {
  display: none;
}

.panel.is-open {
  display: block;
}
```

JavaScript는 상태 클래스만 바꾸고, 실제 디자인은 CSS에 맡긴다.

## 인라인 스타일 변경

간단한 동적 값은 `style`로 직접 넣을 수 있다.

```js
const box = document.querySelector('.box');

if (box instanceof HTMLElement) {
  box.style.width = '200px';
  box.style.backgroundColor = 'tomato';
}
```

CSS 프로퍼티 이름이 `background-color`처럼 하이픈을 포함하면 JavaScript에서는 `backgroundColor`처럼 camelCase로 쓴다.

## 실제 적용된 스타일 읽기

요소의 실제 스타일은 `getComputedStyle()`로 읽는다.

```js
const box = document.querySelector('.box');

if (box) {
  const style = getComputedStyle(box);
  console.log(style.display);
  console.log(style.color);
}
```

`element.style`은 인라인 스타일만 확인한다. CSS 파일에서 적용된 결과까지 보려면 `getComputedStyle()`을 사용한다.

## 위치와 크기 읽기

요소의 화면상 위치와 크기는 `getBoundingClientRect()`로 얻는다.

```js
const box = document.querySelector('.box');

if (box) {
  const rect = box.getBoundingClientRect();

  console.log(rect.width);
  console.log(rect.height);
  console.log(rect.top);
  console.log(rect.left);
}
```

드롭다운 위치 계산, 툴팁 표시, 화면 안에 보이는지 판단할 때 자주 사용한다.

## 스크롤 다루기

스크롤 위치는 `window.scrollY`로 읽을 수 있다.

```js
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
});
```

특정 위치로 이동할 때는 `scrollTo()`를 사용할 수 있다.

```js
window.scrollTo({
  top: 0,
  behavior: 'smooth',
});
```

스크롤 이벤트는 매우 자주 발생하므로 무거운 작업을 넣으면 성능 문제가 생길 수 있다.

## 창 크기

브라우저 창 크기는 `innerWidth`, `innerHeight`로 확인한다.

```js
console.log(window.innerWidth);
console.log(window.innerHeight);
```

창 크기 변화는 `resize` 이벤트로 감지할 수 있다.

```js
window.addEventListener('resize', () => {
  console.log(window.innerWidth);
});
```

반응형 레이아웃은 CSS 미디어 쿼리로 해결하는 것이 우선이다. JavaScript는 실제 계산이 필요한 경우에만 사용한다.

## 레이아웃 성능 감각

브라우저는 DOM 변경과 스타일 계산, 레이아웃 계산, 페인트 과정을 거쳐 화면을 그린다. JavaScript에서 크기를 읽고 바로 스타일을 바꾸는 작업을 반복하면 브라우저가 레이아웃을 자주 다시 계산할 수 있다.

```js
const boxes = document.querySelectorAll('.box');

for (const box of boxes) {
  const width = box.getBoundingClientRect().width;

  if (box instanceof HTMLElement) {
    box.style.height = `${width}px`;
  }
}
```

작은 화면에서는 문제가 없어 보여도 요소가 많아지면 비용이 커질 수 있다. 가능하면 CSS로 해결하고, JavaScript 계산은 필요한 곳에만 둔다.

## 선택 기준 정리

- 상태 변화는 클래스 추가와 제거로 표현한다.
- 값이 매번 달라지는 스타일만 `style`로 직접 설정한다.
- 실제 적용 스타일은 `getComputedStyle()`로 읽는다.
- 위치와 크기는 `getBoundingClientRect()`로 읽는다.
- 스크롤과 리사이즈 이벤트에는 무거운 작업을 넣지 않는다.

## 정리

CSS와 JavaScript는 역할이 다르다. CSS는 표현과 레이아웃을 담당하고, JavaScript는 상태 변화와 계산을 담당하는 것이 기본이다.

스타일을 직접 조작할 수 있다고 해서 모든 스타일을 JavaScript로 옮길 필요는 없다. 클래스로 상태를 표현하고 CSS가 화면을 그리게 하는 방식이 가장 유지보수하기 쉽다.

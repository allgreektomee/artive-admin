# 컴포넌트·그래픽·미디어 맛보기

브라우저는 문서와 폼만 다루는 환경이 아니다. 재사용 가능한 컴포넌트를 만들고, 그래픽을 그리고, 오디오나 비디오 같은 미디어도 제어할 수 있다.

이 글은 깊게 들어가기보다 Web Component, SVG, Canvas, 미디어 API가 각각 어떤 역할을 하는지 감을 잡는 데 목적이 있다.

## 이 글의 위치

앞 글에서는 CSS와 레이아웃을 JavaScript로 다루는 방법을 봤다. 이번 글에서는 브라우저가 제공하는 조금 더 넓은 표현 도구를 훑어본다.

## 먼저 잡을 핵심

- Web Component는 브라우저 표준만으로 재사용 가능한 사용자 정의 요소를 만드는 기술이다.
- SVG는 XML 기반 벡터 그래픽이다.
- Canvas는 픽셀 기반으로 그림을 그리는 영역이다.
- 미디어 요소는 JavaScript로 재생, 정지, 볼륨 같은 상태를 제어할 수 있다.
- 실무에서는 요구사항에 따라 SVG, Canvas, CSS, 라이브러리를 선택한다.

## Web Component

Web Component는 브라우저 표준으로 사용자 정의 HTML 요소를 만드는 기술이다.

```js
class HelloCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>Hello Web Component</p>`;
  }
}

customElements.define('hello-card', HelloCard);
```

HTML에서는 이렇게 사용할 수 있다.

```html
<hello-card></hello-card>
```

`connectedCallback()`은 요소가 문서에 연결될 때 실행된다. React나 Vue 같은 프레임워크와 별개로 브라우저 표준만으로 컴포넌트를 만들 수 있다는 점이 특징이다.

## Shadow DOM 감각

Shadow DOM은 컴포넌트 내부 DOM을 바깥 문서와 어느 정도 분리하는 기술이다.

```js
class UserBadge extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });

    root.innerHTML = `
      <style>
        span { color: tomato; }
      </style>
      <span>User</span>
    `;
  }
}

customElements.define('user-badge', UserBadge);
```

컴포넌트 내부 스타일이 바깥 요소에 쉽게 새어나가지 않도록 경계를 만들 수 있다.

## SVG

SVG는 선, 원, 사각형, 경로 같은 벡터 그래픽을 표현한다. 확대해도 깨지지 않는 아이콘이나 차트에 잘 맞는다.

```html
<svg width="120" height="80" viewBox="0 0 120 80">
  <circle cx="40" cy="40" r="24" fill="tomato" />
  <rect x="70" y="20" width="32" height="40" fill="royalblue" />
</svg>
```

SVG 요소도 DOM이므로 JavaScript로 속성을 바꿀 수 있다.

```js
const circle = document.querySelector('circle');

circle?.setAttribute('fill', 'gold');
```

## Canvas

Canvas는 JavaScript로 픽셀 기반 그림을 그리는 영역이다.

```js
const canvas = document.querySelector('canvas');
const ctx = canvas?.getContext('2d');

if (ctx) {
  ctx.fillStyle = 'tomato';
  ctx.fillRect(10, 10, 80, 40);
}
```

Canvas는 한 번 그린 도형이 DOM 요소로 남지 않는다. 게임, 실시간 시각화, 이미지 처리처럼 계속 다시 그리는 작업에 적합하다.

## SVG와 Canvas 차이

SVG는 그래픽 요소가 DOM으로 남는다. 각 도형을 선택하고 속성을 바꾸기 쉽다. 아이콘, 다이어그램, 단순 차트에 잘 맞는다.

Canvas는 픽셀에 직접 그린다. 많은 요소를 빠르게 다시 그려야 하는 작업에 유리하지만, 개별 도형을 DOM처럼 선택하기는 어렵다.

## 미디어 요소 제어

`audio`와 `video` 요소는 JavaScript로 제어할 수 있다.

```js
const video = document.querySelector('video');

async function playVideo() {
  if (!video) return;

  await video.play();
  console.log(video.paused);
}
```

브라우저 정책에 따라 자동 재생은 제한될 수 있다. 보통 사용자의 클릭 같은 상호작용 뒤에 재생해야 안전하다.

## 미디어 상태 읽기

재생 시간, 볼륨, 정지 여부도 확인할 수 있다.

```js
const audio = document.querySelector('audio');

if (audio) {
  audio.volume = 0.5;
  console.log(audio.currentTime);
  console.log(audio.paused);
}
```

미디어 플레이어를 직접 만들 때 이런 속성과 이벤트를 조합한다.

## 선택 기준 정리

- 재사용 가능한 브라우저 표준 컴포넌트가 필요하면 Web Component를 고려한다.
- 아이콘과 벡터 그래픽은 SVG가 잘 맞는다.
- 실시간 그래픽이나 픽셀 기반 작업은 Canvas가 잘 맞는다.
- 오디오와 비디오 제어는 미디어 요소 API를 사용한다.
- 복잡한 UI는 표준 API만 고집하기보다 프레임워크와 라이브러리 선택도 함께 고려한다.

## 정리

브라우저는 DOM 조작을 넘어 컴포넌트, 그래픽, 미디어를 다룰 수 있는 다양한 API를 제공한다. 모든 기능을 깊게 외울 필요는 없지만, 어떤 도구가 어떤 문제에 맞는지 감을 잡아두면 선택지가 넓어진다.

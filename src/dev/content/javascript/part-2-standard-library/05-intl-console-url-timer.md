# Intl·콘솔·URL·타이머

JavaScript 표준 라이브러리에는 크지는 않지만 실무에서 자주 쓰는 도구들이 있다. 날짜와 숫자를 지역에 맞게 표시하는 `Intl`, 디버깅을 돕는 `console`, 주소를 안전하게 다루는 `URL`, 시간 지연 작업을 만드는 타이머가 대표적이다.

이 글은 서로 다른 기능을 하나로 묶는다. 공통점은 "애플리케이션 주변부에서 자주 필요한 표준 도구"라는 점이다.

## 이 글의 위치

앞 글에서는 날짜, 에러, JSON을 다뤘다. 이번 글에서는 국제화, 로깅, URL 파싱, 타이머처럼 서비스 코드를 단단하게 만드는 주변 API를 정리한다.

## 먼저 잡을 핵심

- `Intl`은 숫자, 날짜, 목록 등을 지역 형식에 맞게 표시한다.
- `console`은 단순 출력뿐 아니라 표, 시간 측정, 그룹 출력도 제공한다.
- `URL`과 `URLSearchParams`는 문자열 조합보다 안전하게 주소를 다룬다.
- `setTimeout()`은 일정 시간 뒤 한 번 실행하고, `setInterval()`은 반복 실행한다.
- 타이머는 반드시 취소 가능성을 고려해야 한다.

## Intl.NumberFormat

숫자를 금액이나 천 단위 구분 형식으로 보여줄 때 직접 문자열을 조립하지 않아도 된다.

```js
const price = 1234567;

const formatter = new Intl.NumberFormat('ko-KR');

console.log(formatter.format(price));
```

실행 결과:

```text
1,234,567
```

통화 형식도 지원한다.

```js
const formatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

console.log(formatter.format(1234567));
```

실행 결과:

```text
₩1,234,567
```

숫자 표시 형식은 국가마다 다르다. `Intl.NumberFormat`을 쓰면 이런 규칙을 직접 구현하지 않아도 된다.

## Intl.DateTimeFormat

날짜 표시도 지역에 따라 달라진다.

```js
const date = new Date('2026-05-04T01:30:00.000Z');

const formatter = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Seoul',
});

console.log(formatter.format(date));
```

실행 결과:

```text
2026. 5. 4. 오전 10:30
```

서버에서 UTC로 받은 시간을 사용자 지역에 맞게 보여줄 때 유용하다.

## Intl.ListFormat

목록을 자연스러운 문장으로 만들 수도 있다.

```js
const tags = ['JavaScript', 'React', 'Node.js'];

const formatter = new Intl.ListFormat('ko-KR', {
  style: 'long',
  type: 'conjunction',
});

console.log(formatter.format(tags));
```

실행 결과:

```text
JavaScript, React 및 Node.js
```

작은 기능이지만 다국어 서비스를 만들 때 직접 접속사를 붙이는 코드를 줄여준다.

## console 기본

`console.log()`는 가장 흔한 디버깅 도구다. 하지만 `console`에는 더 많은 메서드가 있다.

```js
const user = { id: 1, name: 'Kim' };

console.log('user:', user);
console.warn('deprecated option');
console.error('failed to load');
```

실행 결과:

```text
user: { id: 1, name: 'Kim' }
deprecated option
failed to load
```

브라우저와 Node.js 환경에 따라 표시 방식은 조금 다르지만, 로그 수준을 나눠 읽기 쉽게 만들 수 있다.

## console.table과 시간 측정

배열이나 객체 목록은 `console.table()`로 보면 편하다.

```js
const users = [
  { id: 1, name: 'Kim' },
  { id: 2, name: 'Lee' },
];

console.table(users);
```

실행 결과:

```text
┌─────────┬────┬───────┐
│ (index) │ id │ name  │
├─────────┼────┼───────┤
│ 0       │ 1  │ 'Kim' │
│ 1       │ 2  │ 'Lee' │
└─────────┴────┴───────┘
```

간단한 시간 측정은 `console.time()`과 `console.timeEnd()`로 할 수 있다.

```js
console.time('loop');

let total = 0;
for (let i = 0; i < 1000; i += 1) {
  total += i;
}

console.timeEnd('loop');
console.log(total);
```

실행 결과:

```text
loop: 0.1ms
499500
```

실행 시간은 환경마다 달라진다. 정확한 성능 측정에는 전문 도구가 필요하지만, 흐름을 빠르게 확인할 때는 유용하다.

## URL 객체

URL 문자열을 직접 자르고 붙이면 실수하기 쉽다. `URL` 객체를 사용하면 주소의 구성 요소를 안전하게 다룰 수 있다.

```js
const url = new URL('https://example.com/articles?page=2&keyword=js');

console.log(url.origin);
console.log(url.pathname);
console.log(url.searchParams.get('page'));
```

실행 결과:

```text
https://example.com
/articles
2
```

쿼리 파라미터를 수정할 때도 문자열 조합보다 안전하다.

```js
const url = new URL('https://example.com/articles');

url.searchParams.set('page', '1');
url.searchParams.set('keyword', 'javascript');

console.log(url.toString());
```

실행 결과:

```text
https://example.com/articles?page=1&keyword=javascript
```

## URLSearchParams

쿼리 문자열만 따로 다룰 때는 `URLSearchParams`를 사용할 수 있다.

```js
const params = new URLSearchParams();

params.set('page', '1');
params.set('sort', 'latest');

console.log(params.toString());
console.log(params.get('sort'));
```

실행 결과:

```text
page=1&sort=latest
latest
```

브라우저에서 검색 조건을 URL에 반영하거나, API 요청 쿼리를 만들 때 자주 사용한다.

## setTimeout

`setTimeout()`은 일정 시간이 지난 뒤 콜백을 한 번 실행한다.

```js
setTimeout(() => {
  console.log('later');
}, 100);

console.log('now');
```

실행 결과:

```text
now
later
```

타이머는 비동기로 실행된다. 그래서 `setTimeout(..., 0)`이라고 해도 현재 실행 중인 코드가 끝난 뒤에 실행된다.

## clearTimeout

예약한 작업은 취소할 수 있어야 한다.

```js
const timerId = setTimeout(() => {
  console.log('will not run');
}, 1000);

clearTimeout(timerId);

console.log('cancelled');
```

실행 결과:

```text
cancelled
```

검색 자동완성, 입력 지연 처리, 컴포넌트 정리 과정에서 타이머 취소는 중요하다.

## setInterval

`setInterval()`은 일정 간격으로 콜백을 반복 실행한다.

```js
let count = 0;

const intervalId = setInterval(() => {
  count += 1;
  console.log(count);

  if (count === 3) {
    clearInterval(intervalId);
  }
}, 100);
```

실행 결과:

```text
1
2
3
```

반복 타이머는 반드시 종료 조건을 생각해야 한다. 계속 살아 있는 타이머는 메모리 누수나 불필요한 작업을 만들 수 있다.

## 선택 기준 정리

- 숫자와 날짜 표시에는 `Intl`을 우선 고려한다.
- 디버깅 로그는 `console.log()`만 쓰기보다 상황에 맞는 메서드를 사용한다.
- URL 문자열을 직접 조립하지 말고 `URL`, `URLSearchParams`를 사용한다.
- 한 번 지연 실행은 `setTimeout()`을 사용한다.
- 반복 실행은 `setInterval()`을 사용하되 반드시 `clearInterval()`을 고려한다.

## 정리

`Intl`, `console`, `URL`, 타이머는 거대한 주제는 아니지만 실무 코드의 품질에 큰 영향을 준다. 직접 문자열을 조합하거나 임시 로그에만 의존하는 습관을 줄이면 코드가 더 안전하고 읽기 쉬워진다.

표준 라이브러리의 작은 도구를 잘 쓰는 것은 복잡한 프레임워크를 아는 것만큼 중요하다.

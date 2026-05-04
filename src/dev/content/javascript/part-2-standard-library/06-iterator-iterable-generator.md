# 이터레이터·이터러블·제너레이터

`for...of`, 스프레드 문법, 구조 분해, `Map`, `Set`은 서로 다른 기능처럼 보이지만 공통 기반이 있다. 바로 이터러블 프로토콜이다.

이터레이터와 이터러블을 이해하면 "왜 배열은 순회되고 일반 객체는 바로 순회되지 않는지", "제너레이터가 왜 지연 실행에 유용한지"가 자연스럽게 연결된다.

## 이 글의 위치

앞 글에서는 실무에서 자주 쓰는 작은 표준 API를 다뤘다. 이번 글에서는 JavaScript 순회 문법의 기반인 이터레이터, 이터러블, 제너레이터를 정리한다.

## 먼저 잡을 핵심

- 리터럴은 코드에 값을 직접 써놓은 표현이다.
- 이터러블은 `Symbol.iterator` 메서드를 가진 객체다.
- 이터레이터는 `next()` 메서드로 값을 하나씩 반환하는 객체다.
- 이터레이션 프로토콜은 이터러블과 이터레이터가 지켜야 하는 순회 약속이다.
- `for...of`는 이터러블을 순회한다.
- 제너레이터 함수는 실행을 멈췄다가 다시 이어갈 수 있는 특별한 함수다.
- 제너레이터 객체는 제너레이터 함수를 호출했을 때 반환되는 이터레이터다.
- `yield`는 제너레이터 함수 안에서 값을 바깥으로 내보내고 실행을 잠시 멈추는 키워드다.
- 이터러블은 값을 한 번에 만들지 않고 필요할 때 하나씩 만들 수 있다.

## 용어 먼저 정리

`literal`은 리터럴이라고 읽는다. 코드에 값을 직접 써놓은 표현이다.

```js
console.log('hello');
console.log(123);
console.log({ name: 'Kim' });
console.log([1, 2]);
```

실행 결과:

```text
hello
123
{ name: 'Kim' }
[ 1, 2 ]
```

`iterable`은 이터러블이라고 읽는다. `for...of`로 순회 가능한 객체다. 배열, 문자열, `Set`, `Map`이 대표적이다.

```js
for (const value of ['a', 'b']) {
  console.log(value);
}
```

실행 결과:

```text
a
b
```

`iterator`는 이터레이터라고 읽는다. `next()`로 값을 하나씩 꺼내는 객체다.

```js
const iterator = ['a', 'b'][Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

실행 결과:

```text
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: undefined, done: true }
```

정리하면 리터럴은 "값을 코드에 직접 쓰는 방식"이고, 이터러블과 이터레이터는 "값을 하나씩 순회하는 방식"에 관련된 용어다. 이름이 비슷하게 느껴질 수 있지만 서로 다른 개념이다.

`generator function`은 제너레이터 함수라고 읽는다. `function*`으로 선언하는 특별한 함수다. 일반 함수는 한 번 호출되면 끝까지 실행되지만, 제너레이터 함수는 `yield`를 만날 때마다 실행을 멈췄다가 다음 `next()` 호출 때 이어서 실행된다.

```js
function* makeSteps() {
  console.log('start');
  yield 'step-1';
  console.log('middle');
  yield 'step-2';
  console.log('end');
}

const generator = makeSteps();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

실행 결과:

```text
start
{ value: 'step-1', done: false }
middle
{ value: 'step-2', done: false }
end
{ value: undefined, done: true }
```

`generator object`는 제너레이터 객체라고 읽는다. 제너레이터 함수를 호출했을 때 바로 함수 본문이 실행되는 것이 아니라, 제너레이터 객체가 반환된다. 이 객체는 `next()`를 가진 이터레이터이고, 동시에 `Symbol.iterator`도 가진 이터러블이다.

```js
function* numbers() {
  yield 1;
}

const generator = numbers();

console.log(typeof generator.next);
console.log(typeof generator[Symbol.iterator]);
console.log(generator[Symbol.iterator]() === generator);
```

실행 결과:

```text
function
function
true
```

`yield`는 제너레이터 함수 안에서만 사용할 수 있다. `return`처럼 값을 바깥으로 내보내지만 함수가 완전히 끝나는 것은 아니다. `yield`는 "여기까지 실행하고 값을 하나 내보낸 뒤 잠시 멈춘다"에 가깝다.

## 이터레이션 프로토콜

이터레이션 프로토콜은 JavaScript에서 순회가 가능하려면 지켜야 하는 약속이다. 크게 이터러블 프로토콜과 이터레이터 프로토콜로 나눌 수 있다.

이터러블 프로토콜:

- 객체가 `Symbol.iterator` 메서드를 가진다.
- `Symbol.iterator()`를 호출하면 이터레이터를 반환한다.

이터레이터 프로토콜:

- 이터레이터는 `next()` 메서드를 가진다.
- `next()`는 `{ value, done }` 형태의 객체를 반환한다.
- `done`이 `true`이면 순회가 끝났다는 뜻이다.

```js
const iterable = {
  [Symbol.iterator]() {
    let count = 1;

    return {
      next() {
        if (count <= 2) {
          return { value: count++, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

for (const value of iterable) {
  console.log(value);
}
```

실행 결과:

```text
1
2
```

`for...of`는 내부적으로 이 약속을 사용한다. 먼저 객체의 `Symbol.iterator()`를 호출해 이터레이터를 얻고, 그 이터레이터의 `next()`를 반복 호출하다가 `done: true`가 나오면 멈춘다.

## for...of가 순회하는 것

배열, 문자열, `Set`, `Map`은 `for...of`로 순회할 수 있다.

```js
for (const value of ['a', 'b']) {
  console.log(value);
}

for (const char of 'JS') {
  console.log(char);
}
```

실행 결과:

```text
a
b
J
S
```

이 값들은 모두 이터러블이다. 즉 `Symbol.iterator`라는 특별한 메서드를 가지고 있다.

```js
const values = [1, 2, 3];

console.log(typeof values[Symbol.iterator]);
```

실행 결과:

```text
function
```

## 이터레이터 직접 보기

이터러블의 `Symbol.iterator()`를 호출하면 이터레이터가 나온다.

```js
const values = ['a', 'b'];
const iterator = values[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

실행 결과:

```text
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: undefined, done: true }
```

이터레이터의 `next()`는 `{ value, done }` 형태를 반환한다. `done`이 `true`가 되면 순회가 끝났다는 뜻이다.

## 직접 이터러블 만들기

일반 객체도 `Symbol.iterator`를 제공하면 `for...of`로 순회할 수 있다.

```js
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const end = this.to;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

for (const number of range) {
  console.log(number);
}
```

실행 결과:

```text
1
2
3
```

이 예제에서 `range`는 배열이 아니지만 순회 가능하다. 핵심은 `Symbol.iterator` 메서드가 이터레이터를 반환한다는 점이다.

## 스프레드와 구조 분해

이터러블은 `for...of`뿐 아니라 스프레드 문법과 구조 분해에서도 사용된다.

```js
const set = new Set(['js', 'react']);

console.log([...set]);

const [first, second] = set;
console.log(first);
console.log(second);
```

실행 결과:

```text
[ 'js', 'react' ]
js
react
```

스프레드 문법은 단순히 배열 전용 문법이 아니다. 이터러블을 펼치는 문법이다.

## 제너레이터 함수

제너레이터 함수는 `function*`으로 만든다. 일반 함수와 가장 큰 차이는 실행 방식이다. 일반 함수는 호출하면 본문이 바로 실행되고 `return`을 만나거나 끝까지 가면 종료된다. 제너레이터 함수는 호출해도 본문이 바로 실행되지 않고, 제너레이터 객체를 반환한다.

반환된 제너레이터 객체의 `next()`를 호출할 때마다 함수 본문이 다음 `yield`까지 실행된다. `yield` 오른쪽 값은 `next()` 결과의 `value`가 되고, 아직 끝나지 않았으면 `done`은 `false`다.

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = numbers();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

실행 결과:

```text
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

제너레이터 객체는 이터레이터이면서 이터러블이다. 그래서 `for...of`로 바로 순회할 수 있다.

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

for (const number of numbers()) {
  console.log(number);
}
```

실행 결과:

```text
1
2
3
```

## 지연 실행

제너레이터는 값을 미리 전부 만들지 않는다. `next()`가 호출될 때마다 다음 `yield`까지 실행된다.

```js
function* makeIds() {
  let id = 1;

  while (true) {
    yield id++;
  }
}

const ids = makeIds();

console.log(ids.next().value);
console.log(ids.next().value);
console.log(ids.next().value);
```

실행 결과:

```text
1
2
3
```

무한 반복처럼 보이지만 한 번에 무한한 값을 만들지는 않는다. 필요한 순간에 하나씩 만든다. 이런 성질을 지연 실행이라고 한다.

## yield로 값 받기

`yield`는 값을 내보내기만 하는 것이 아니라, 바깥에서 다시 값을 받을 수도 있다.

```js
function* conversation() {
  const name = yield 'What is your name?';
  yield `Hello, ${name}`;
}

const iterator = conversation();

console.log(iterator.next().value);
console.log(iterator.next('Kim').value);
```

실행 결과:

```text
What is your name?
Hello, Kim
```

첫 번째 `next()`는 첫 번째 `yield`까지 실행한다. 두 번째 `next('Kim')`의 인자가 첫 번째 `yield` 표현식의 결과가 된다.

## yield*

`yield*`는 다른 이터러블에 순회를 위임한다.

```js
function* combined() {
  yield 'start';
  yield* [1, 2, 3];
  yield 'end';
}

console.log([...combined()]);
```

실행 결과:

```text
[ 'start', 1, 2, 3, 'end' ]
```

여러 순회 소스를 하나로 합칠 때 유용하다.

## 선택 기준 정리

- 단순 배열 순회는 `for...of`나 배열 메서드를 사용한다.
- 직접 순회 가능한 객체를 만들고 싶으면 `Symbol.iterator`를 구현한다.
- 값을 필요할 때 하나씩 만들고 싶으면 제너레이터를 고려한다.
- 무한 시퀀스나 큰 데이터 흐름은 지연 실행이 유리하다.
- 제너레이터의 양방향 통신은 강력하지만 복잡해질 수 있으므로 신중하게 쓴다.

## 정리

이터러블은 JavaScript 순회의 공통 약속이다. `for...of`, 스프레드, 구조 분해, `Set`, `Map`이 모두 이 약속 위에서 동작한다.

제너레이터는 이터레이터를 쉽게 만드는 문법이다. 값을 한 번에 만들지 않고 필요할 때 하나씩 생성할 수 있어, 순회 흐름을 표현할 때 강력하다.

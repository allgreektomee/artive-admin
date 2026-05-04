# 비동기 전체 흐름

JavaScript는 싱글 스레드로 실행되지만, 네트워크 요청, 타이머, 파일 읽기 같은 작업을 기다리면서 프로그램 전체를 멈추지는 않는다. 이때 필요한 개념이 비동기 처리다. 비동기는 결과가 지금 당장 준비되지 않은 작업을 나중에 이어서 처리하는 방식이다.

비동기 코드는 콜백에서 시작해 Promise, `async`/`await`, 비동기 이터레이션으로 이어진다. 비동기 이터레이션은 `for await...of`처럼 시간이 지나며 도착하는 값을 하나씩 순회하는 방식이다. 문법은 달라졌지만 핵심은 같다. "지금 바로 결과가 없는 작업을 어떻게 표현하고 이어갈 것인가"다.

## 이 글의 위치

앞 글에서는 값을 하나씩 꺼내는 이터레이터와 제너레이터를 다뤘다. 이번 글에서는 시간이 걸리는 작업을 표현하는 비동기 흐름을 정리한다.

## 먼저 잡을 핵심

- 콜백은 나중에 실행할 함수를 넘기는 방식이다.
- Promise는 미래에 완료되거나 실패할 값을 표현한다.
- `then()`은 성공 흐름, `catch()`는 실패 흐름을 연결한다.
- `async` 함수는 항상 Promise를 반환한다.
- `await`는 Promise가 처리될 때까지 해당 async 함수의 실행을 잠시 멈춘다.
- 비동기 이터레이션은 비동기적으로 도착하는 여러 값을 `for await...of`로 순회하는 방식이다.

## 콜백

콜백은 가장 기본적인 비동기 표현이다.

```js
function delay(callback) {
  setTimeout(() => {
    callback('done');
  }, 100);
}

delay((result) => {
  console.log(result);
});
```

실행 결과:

```text
done
```

콜백은 단순하지만 작업이 여러 단계로 이어지면 중첩이 깊어진다. 에러 처리 규칙도 함수마다 달라지기 쉽다.

## Promise 만들기

Promise는 비동기 작업의 성공 또는 실패를 객체로 표현한다.

```js
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('done');
  }, 100);
});

promise.then((result) => {
  console.log(result);
});
```

실행 결과:

```text
done
```

Promise는 세 가지 상태를 가진다.

- pending: 아직 완료되지 않음
- fulfilled: 성공
- rejected: 실패

한 번 fulfilled나 rejected가 되면 다시 상태가 바뀌지 않는다.

## then 체이닝

`then()`은 새 Promise를 반환한다. 그래서 작업을 이어 붙일 수 있다.

```js
Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => value * 10)
  .then((value) => {
    console.log(value);
  });
```

실행 결과:

```text
20
```

각 `then()`에서 반환한 값이 다음 `then()`으로 전달된다. Promise를 반환하면 그 Promise가 처리될 때까지 기다린 뒤 다음 단계로 넘어간다.

## catch와 finally

실패는 `catch()`로 처리한다.

```js
Promise.reject(new Error('failed'))
  .then(() => {
    console.log('success');
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log('cleanup');
  });
```

실행 결과:

```text
failed
cleanup
```

`finally()`는 성공과 실패에 관계없이 실행된다. 로딩 상태 해제나 리소스 정리에 적합하다.

## async와 await

`async`/`await`는 Promise 기반 코드를 동기 코드처럼 읽히게 한다.

```js
function fetchUser() {
  return Promise.resolve({ id: 1, name: 'Kim' });
}

async function main() {
  const user = await fetchUser();
  console.log(user.name);
}

main();
```

실행 결과:

```text
Kim
```

`await`는 Promise가 처리될 때까지 현재 `async` 함수의 실행을 멈춘다. 하지만 JavaScript 전체 스레드를 막는 것은 아니다.

## async 함수의 반환값

`async` 함수는 항상 Promise를 반환한다.

```js
async function getNumber() {
  return 10;
}

console.log(getNumber() instanceof Promise);

getNumber().then((value) => {
  console.log(value);
});
```

실행 결과:

```text
true
10
```

`return 10`처럼 일반 값을 반환해도 Promise로 감싸진다.

## async 에러 처리

`async` 함수 안에서 발생한 에러는 rejected Promise가 된다. `try...catch`로 처리할 수 있다.

```js
async function parseJson(text) {
  return JSON.parse(text);
}

async function main() {
  try {
    await parseJson('{bad json}');
  } catch (error) {
    console.log(error instanceof SyntaxError);
  }
}

main();
```

실행 결과:

```text
true
```

`await`를 쓰는 코드는 `try...catch`와 함께 읽으면 흐름이 명확하다.

## Promise.all

서로 독립적인 비동기 작업은 동시에 시작하고 함께 기다릴 수 있다.

```js
const userPromise = Promise.resolve({ id: 1 });
const postsPromise = Promise.resolve(['post-1', 'post-2']);

Promise.all([userPromise, postsPromise]).then(([user, posts]) => {
  console.log(user.id);
  console.log(posts.length);
});
```

실행 결과:

```text
1
2
```

`Promise.all()`은 하나라도 실패하면 전체가 실패한다. 모두 성공해야 다음 단계로 갈 수 있는 작업에 적합하다.

## Promise.allSettled

성공과 실패를 모두 모아야 할 때는 `Promise.allSettled()`가 좋다.

```js
const tasks = [
  Promise.resolve('ok'),
  Promise.reject(new Error('fail')),
];

Promise.allSettled(tasks).then((results) => {
  console.log(results[0].status);
  console.log(results[1].status);
});
```

실행 결과:

```text
fulfilled
rejected
```

일부 작업 실패가 전체 실패를 의미하지 않는 경우에 유용하다.

## 비동기 순회

비동기 이터러블은 `for await...of`로 순회할 수 있다.

```js
async function* makeAsyncNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

async function main() {
  for await (const number of makeAsyncNumbers()) {
    console.log(number);
  }
}

main();
```

실행 결과:

```text
1
2
3
```

네트워크 스트림, 파일 스트림처럼 데이터가 한 번에 오지 않는 흐름을 표현할 때 사용한다.

## 선택 기준 정리

- 단순 이벤트 통지는 콜백으로 충분할 수 있다.
- 완료와 실패가 있는 비동기 값은 Promise로 표현한다.
- 여러 단계를 읽기 쉽게 쓰고 싶으면 `async`/`await`를 사용한다.
- 독립 작업을 병렬로 기다릴 때는 `Promise.all()`을 사용한다.
- 실패까지 결과로 모아야 하면 `Promise.allSettled()`를 사용한다.
- 순차적으로 도착하는 비동기 데이터는 `for await...of`를 고려한다.

## 정리

비동기 처리는 JavaScript 실무의 핵심이다. 콜백, Promise, `async`/`await`는 서로 대체 관계라기보다 발전한 표현 방식이다.

가장 중요한 원칙은 비동기 작업의 성공, 실패, 정리 흐름을 명확히 드러내는 것이다. 문법보다 흐름이 먼저다.

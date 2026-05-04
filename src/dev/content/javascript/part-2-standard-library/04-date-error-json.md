# 날짜·에러·JSON

실무 JavaScript에서 날짜, 에러, JSON은 거의 매일 만난다. 사용자가 입력한 날짜를 표시하고, 실패 상황을 에러로 전달하고, 서버와 데이터를 주고받을 때 모두 이 세 가지가 등장한다.

이 글에서는 `Date`, `Error`, `JSON`을 한 번에 묶어서 본다. 서로 다른 주제처럼 보이지만, 공통점이 있다. 모두 "값을 어떻게 표현하고, 전달하고, 해석할 것인가"와 관련 있다.

## 이 글의 위치

앞 글에서는 문자열 패턴을 다루는 정규 표현식을 봤다. 이번 글에서는 날짜와 시간, 실패 표현, 데이터 직렬화를 정리한다.

## 먼저 잡을 핵심

- `Date`는 특정 시점을 나타내는 객체다.
- 월은 0부터 시작하므로 생성자 사용 시 주의해야 한다.
- 에러는 문자열보다 `Error` 객체로 던지는 편이 추적에 좋다.
- `JSON.stringify()`는 JavaScript 값을 JSON 문자열로 바꾼다.
- `JSON.parse()`는 JSON 문자열을 JavaScript 값으로 바꾼다.

## Date 기본

`new Date()`는 현재 시점을 나타내는 `Date` 객체를 만든다.

```js
const now = new Date();

console.log(now instanceof Date);
console.log(Number.isFinite(now.getTime()));
```

실행 결과:

```text
true
true
```

`getTime()`은 1970년 1월 1일 00:00:00 UTC부터 흐른 밀리초를 반환한다. 날짜 비교나 저장에서는 이 숫자값이 유용하다.

## 날짜 만들기

문자열이나 숫자로 날짜를 만들 수 있다.

```js
const fromString = new Date('2026-05-04T10:00:00+09:00');
const fromMs = new Date(0);

console.log(fromString.getFullYear());
console.log(fromMs.toISOString());
```

실행 결과:

```text
2026
1970-01-01T00:00:00.000Z
```

문자열 파싱은 환경과 형식에 민감할 수 있다. 가능하면 ISO 8601 형식을 사용하고, 서버와 주고받을 때는 타임존 기준을 명확히 정해야 한다.

## 월은 0부터 시작한다

`new Date(year, monthIndex, day)` 형태에서 `monthIndex`는 0부터 시작한다.

```js
const date = new Date(2026, 0, 1);

console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDate());
```

실행 결과:

```text
2026
0
1
```

`0`이 1월이고 `11`이 12월이다. 이 규칙은 실수하기 쉬우므로 직접 생성자를 쓰는 코드는 조심해야 한다.

## 날짜 비교

`Date` 객체끼리 비교할 때는 내부 시간값이 비교된다.

```js
const start = new Date('2026-05-04T10:00:00+09:00');
const end = new Date('2026-05-04T11:00:00+09:00');

console.log(start < end);
console.log(end.getTime() - start.getTime());
```

실행 결과:

```text
true
3600000
```

차이는 밀리초 단위다. 날짜 계산은 타임존, 일광절약시간, 말일 처리 때문에 생각보다 복잡하다. 복잡한 일정 계산이 필요하면 표준 `Date`만으로 밀어붙이기보다 라이브러리나 `Temporal` 같은 새 API를 검토한다.

## Error 기본

실패 상황은 문자열보다 `Error` 객체로 표현하는 것이 좋다.

```js
function parseAmount(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    throw new Error('amount must be a number');
  }

  return amount;
}

try {
  console.log(parseAmount('abc'));
} catch (error) {
  console.log(error instanceof Error);
  console.log(error.message);
}
```

실행 결과:

```text
true
amount must be a number
```

`Error` 객체는 메시지뿐 아니라 스택 추적 정보도 가진다. 운영에서 장애를 분석할 때 이 차이가 크다.

## try...catch 기본

`try...catch`는 실행 중 발생한 예외를 잡아서 프로그램이 바로 중단되지 않게 처리하는 문법이다.

```js
try {
  const value = JSON.parse('{"name":"Kim"}');
  console.log(value.name);
} catch (error) {
  console.log('parse failed');
}
```

실행 결과:

```text
Kim
```

`try` 블록 안에서 에러가 발생하지 않으면 `catch`는 실행되지 않는다. 에러가 발생하면 남은 `try` 코드는 건너뛰고 `catch` 블록으로 이동한다.

```js
try {
  console.log('before');
  JSON.parse('{bad json}');
  console.log('after');
} catch (error) {
  console.log('catch');
  console.log(error instanceof SyntaxError);
}
```

실행 결과:

```text
before
catch
true
```

`after`는 출력되지 않는다. `JSON.parse()`에서 예외가 발생하는 순간 제어 흐름이 `catch`로 넘어가기 때문이다.

## finally

`finally`는 성공하든 실패하든 마지막에 실행된다. 파일 닫기, 로딩 상태 해제, 잠금 해제처럼 정리 작업이 필요할 때 사용한다.

```js
function runTask(shouldFail) {
  try {
    if (shouldFail) {
      throw new Error('task failed');
    }

    console.log('task success');
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('cleanup');
  }
}

runTask(false);
runTask(true);
```

실행 결과:

```text
task success
cleanup
task failed
cleanup
```

`finally`는 성공과 실패 양쪽에서 모두 실행된다. 그래서 `catch`에만 정리 코드를 넣는 것보다 안전하다.

## 잡을 에러와 다시 던질 에러

모든 에러를 무조건 삼키면 문제를 숨기게 된다. 현재 함수가 처리할 수 있는 에러만 처리하고, 처리할 수 없는 에러는 다시 던지는 편이 좋다.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function parseUser(json) {
  try {
    const user = JSON.parse(json);

    if (!user.name) {
      throw new ValidationError('name is required');
    }

    return user;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { name: 'Unknown' };
    }

    throw error;
  }
}

console.log(parseUser('{bad json}'));

try {
  parseUser('{"name":""}');
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

실행 결과:

```text
{ name: 'Unknown' }
ValidationError
name is required
```

이 예제에서 JSON 문법 오류는 기본값으로 처리한다. 하지만 검증 오류는 호출자가 알아야 하는 문제로 보고 다시 던진다. `catch`는 에러를 없애는 장소가 아니라, 그 위치에서 책임질 수 있는 실패만 처리하는 장소다.

## 직접 에러 타입 만들기

에러 종류를 구분하고 싶으면 `Error`를 상속할 수 있다.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function createUser(name) {
  if (!name) {
    throw new ValidationError('name is required');
  }

  return { name };
}

try {
  createUser('');
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

실행 결과:

```text
ValidationError
name is required
```

에러 타입을 나누면 "사용자 입력 문제인지", "서버 내부 문제인지", "외부 API 문제인지" 같은 분기를 더 명확하게 만들 수 있다.

## JSON.stringify()

`JSON.stringify()`는 JavaScript 값을 JSON 문자열로 바꾼다.

```js
const user = {
  id: 1,
  name: 'Kim',
  active: true,
};

const json = JSON.stringify(user);

console.log(json);
console.log(typeof json);
```

실행 결과:

```text
{"id":1,"name":"Kim","active":true}
string
```

JSON은 서버와 데이터를 주고받는 대표 형식이다. 문자열, 숫자, 불리언, 배열, 객체, `null`을 표현할 수 있다.

## JSON.parse()

`JSON.parse()`는 JSON 문자열을 JavaScript 값으로 바꾼다.

```js
const json = '{"id":1,"name":"Kim","active":true}';
const user = JSON.parse(json);

console.log(user.name);
console.log(user.active);
```

실행 결과:

```text
Kim
true
```

잘못된 JSON을 파싱하면 에러가 발생한다.

```js
try {
  JSON.parse('{id: 1}');
} catch (error) {
  console.log(error instanceof SyntaxError);
}
```

실행 결과:

```text
true
```

그래서 외부에서 들어온 JSON 문자열은 `try...catch`로 처리해야 한다.

## JSON이 표현하지 못하는 값

JSON은 JavaScript 전체를 표현하지 않는다. 함수, `undefined`, 심벌은 JSON으로 보존되지 않는다.

```js
const value = {
  name: 'Kim',
  age: undefined,
  greet() {
    return 'hello';
  },
};

console.log(JSON.stringify(value));
```

실행 결과:

```text
{"name":"Kim"}
```

객체의 `undefined` 값과 함수는 빠진다. 날짜도 `Date` 객체 그대로 보존되는 것이 아니라 문자열로 바뀐다.

```js
const value = {
  createdAt: new Date('2026-05-04T00:00:00.000Z'),
};

console.log(JSON.stringify(value));
```

실행 결과:

```text
{"createdAt":"2026-05-04T00:00:00.000Z"}
```

다시 `JSON.parse()`하면 `createdAt`은 `Date`가 아니라 문자열이다.

## 안전하게 파싱하기

외부 입력은 언제든 깨질 수 있다. 안전하게 파싱하는 함수를 만들어두면 반복을 줄일 수 있다.

```js
function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error };
  }
}

console.log(safeJsonParse('{"name":"Kim"}').ok);
console.log(safeJsonParse('{name:"Kim"}').ok);
```

실행 결과:

```text
true
false
```

이런 형태는 호출하는 쪽이 예외 처리 흐름을 매번 만들지 않아도 되게 해준다.

## 선택 기준 정리

- 현재 시점은 `new Date()`로 만든다.
- 서버와 날짜를 주고받을 때는 ISO 문자열과 타임존 기준을 명확히 한다.
- 실패 상황은 문자열을 던지지 말고 `Error` 객체를 사용한다.
- 외부 JSON은 항상 파싱 실패 가능성을 고려한다.
- JSON 직렬화는 함수, `undefined`, `Date` 같은 값이 어떻게 바뀌는지 알고 사용한다.

## 정리

`Date`는 시점, `Error`는 실패, `JSON`은 데이터 교환을 담당한다. 셋 모두 단순해 보이지만 실무에서는 경계 조건이 많다.

날짜는 타임존을, 에러는 추적 가능성을, JSON은 표현 가능한 값의 범위를 항상 같이 생각해야 한다.

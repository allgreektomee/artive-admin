# 템플릿 태그와 메타프로그래밍

JavaScript에는 코드를 더 유연하게 만드는 고급 기능이 있다. 템플릿 리터럴을 함수처럼 처리하는 태그 함수, 객체의 기본 동작을 가로채는 `Proxy`, 내부 객체 연산을 함수 형태로 제공하는 `Reflect`가 대표적이다.

이 기능들은 강력하지만 자주 남용할 필요는 없다. 실무에서는 "언제 쓰면 이득이고, 언제 복잡도만 늘어나는지"를 아는 것이 더 중요하다.

## 이 글의 위치

앞 글에서는 심벌과 객체 내부 동작을 봤다. 이번 글에서는 그 내부 동작을 활용해 문법과 객체 행동을 확장하는 방법을 다룬다.

## 먼저 잡을 핵심

- 템플릿 태그는 템플릿 리터럴을 함수 호출처럼 처리한다.
- 나머지 매개변수는 `...values`처럼 여러 인자를 배열로 모아 받는 함수 매개변수 문법이다.
- `Proxy`는 객체의 읽기, 쓰기, 호출 같은 동작을 가로챌 수 있다.
- `Reflect`는 객체 내부 연산을 함수 형태로 제공한다.
- 메타프로그래밍은 코드가 코드의 동작 방식을 다루는 기법이다.
- 강력한 기능일수록 디버깅과 예측 가능성을 함께 고려해야 한다.

## 용어 먼저 정리

메타프로그래밍은 코드가 값만 다루는 것이 아니라, 객체 접근이나 함수 호출 같은 코드의 동작 방식 자체를 다루는 기법이다. `Proxy`로 프로퍼티 읽기를 가로채거나, 태그 함수로 문자열 조합 방식을 바꾸는 것이 여기에 해당한다.

태그 함수 예제에서 자주 보이는 `...values`는 나머지 매개변수다. 함수로 들어온 여러 인자를 배열로 모아준다.

```js
function collect(...values) {
  console.log(values);
}

collect('a', 'b', 'c');
```

실행 결과:

```text
[ 'a', 'b', 'c' ]
```

## 템플릿 리터럴 복습

템플릿 리터럴은 백틱으로 문자열을 만들고 `${}` 안에 표현식을 넣는다.

```js
const name = 'Kim';
const count = 3;

console.log(`${name} has ${count} messages`);
```

실행 결과:

```text
Kim has 3 messages
```

여기까지는 단순 문자열 조합이다. 태그 함수를 붙이면 템플릿을 직접 해석할 수 있다.

## 태그 함수 기본

템플릿 리터럴 앞에 함수를 붙이면 태그 함수가 된다.

```js
function inspect(strings, ...values) {
  console.log(strings);
  console.log(values);
}

const name = 'Kim';
const count = 3;

inspect`${name} has ${count} messages`;
```

실행 결과:

```text
[ '', ' has ', ' messages' ]
[ 'Kim', 3 ]
```

첫 번째 인자는 문자열 조각 배열이고, 나머지 인자는 `${}` 안의 값들이다. 태그 함수는 이 조각들을 원하는 방식으로 조합할 수 있다.

## HTML 이스케이프 예제

태그 함수는 값을 안전하게 가공하는 데 사용할 수 있다.

```js
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function html(strings, ...values) {
  return strings.reduce((result, string, index) => {
    const value = index < values.length ? escapeHtml(values[index]) : '';
    return result + string + value;
  }, '');
}

const userInput = '<script>alert("x")</script>';

console.log(html`<p>${userInput}</p>`);
```

실행 결과:

```text
<p>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</p>
```

이런 패턴은 템플릿에 들어가는 값을 일괄 처리할 때 유용하다. 단, 실제 보안 처리는 환경별 검증된 도구를 사용하는 것이 안전하다.

## Proxy 기본

`Proxy`는 객체의 기본 동작을 가로채는 래퍼를 만든다.

```js
const target = {
  name: 'Kim',
};

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(`read ${String(prop)}`);
    return obj[prop];
  },
});

console.log(proxy.name);
```

실행 결과:

```text
read name
Kim
```

`get` 트랩은 프로퍼티를 읽을 때 실행된다. `set`, `has`, `deleteProperty`, `apply`, `construct` 같은 다양한 트랩도 있다.

## set 트랩으로 검증하기

값을 쓸 때 검증 로직을 넣을 수 있다.

```js
const user = new Proxy(
  { age: 20 },
  {
    set(obj, prop, value) {
      if (prop === 'age' && value < 0) {
        throw new RangeError('age must be positive');
      }

      obj[prop] = value;
      return true;
    },
  },
);

user.age = 30;
console.log(user.age);

try {
  user.age = -1;
} catch (error) {
  console.log(error.message);
}
```

실행 결과:

```text
30
age must be positive
```

`set` 트랩은 성공 여부를 불리언으로 반환해야 한다. 엄격 모드에서 `false`를 반환하면 에러가 발생할 수 있다.

## 없는 프로퍼티 처리하기

`Proxy`를 사용하면 없는 값을 읽을 때 기본값을 반환할 수 있다.

```js
const dict = new Proxy(
  { hello: '안녕' },
  {
    get(obj, prop) {
      return prop in obj ? obj[prop] : `[missing: ${String(prop)}]`;
    },
  },
);

console.log(dict.hello);
console.log(dict.goodbye);
```

실행 결과:

```text
안녕
[missing: goodbye]
```

이 방식은 편리하지만, 오타도 조용히 기본값으로 처리될 수 있다. 설정 객체나 도메인 객체에서는 오히려 에러를 내는 편이 안전할 때가 많다.

## Reflect 기본

`Reflect`는 객체 내부 연산을 함수로 제공한다.

```js
const user = { name: 'Kim' };

console.log(Reflect.get(user, 'name'));
console.log(Reflect.has(user, 'name'));
console.log(Reflect.set(user, 'age', 30));
console.log(user.age);
```

실행 결과:

```text
Kim
true
true
30
```

`obj[prop]`, `prop in obj`, `obj[prop] = value` 같은 연산을 함수 형태로 쓴다고 볼 수 있다.

## Proxy와 Reflect 함께 쓰기

`Proxy` 트랩 안에서 기본 동작을 유지하고 싶을 때 `Reflect`를 자주 사용한다.

```js
const user = { name: 'Kim' };

const proxy = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`get ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`set ${String(prop)}`);
    return Reflect.set(target, prop, value, receiver);
  },
});

proxy.age = 30;
console.log(proxy.name);
```

실행 결과:

```text
set age
get name
Kim
```

`Reflect`를 쓰면 기본 객체 동작을 직접 재구현하지 않아도 된다. 특히 상속이나 getter/setter가 얽힌 경우 `receiver`를 올바르게 넘기는 것이 중요하다.

## 함수도 Proxy로 감쌀 수 있다

함수 호출도 가로챌 수 있다.

```js
function sum(a, b) {
  return a + b;
}

const loggedSum = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(`args: ${args.join(', ')}`);
    return Reflect.apply(target, thisArg, args);
  },
});

console.log(loggedSum(2, 3));
```

실행 결과:

```text
args: 2, 3
5
```

로깅, 권한 검사, 캐싱 같은 횡단 관심사를 실험적으로 붙일 수 있다. 하지만 함수 호출 경로가 숨겨지므로 남용하면 디버깅이 어려워진다.

## 메타프로그래밍을 쓰는 시점

메타프로그래밍은 코드가 객체의 동작 방식에 개입하는 기법이다. 강력하지만 일반 비즈니스 로직에 항상 필요한 것은 아니다.

잘 맞는 경우:

- 라이브러리나 프레임워크의 반응형 상태 추적
- 객체 접근 로깅이나 검증
- 동적 API 클라이언트 생성
- 템플릿 값의 일괄 이스케이프

조심할 경우:

- 단순 객체 접근을 과하게 추상화할 때
- 팀원이 동작을 예측하기 어려울 때
- 에러 위치가 실제 원인과 멀어질 때
- 성능에 민감한 반복 경로에 무겁게 사용할 때

## 선택 기준 정리

- 문자열 조합 중 값 가공이 필요하면 템플릿 태그를 고려한다.
- 객체 읽기와 쓰기를 가로채야 하면 `Proxy`를 고려한다.
- `Proxy` 안에서 기본 동작을 유지하려면 `Reflect`를 함께 사용한다.
- 단순 검증은 일반 함수나 클래스 메서드로 충분한지 먼저 본다.
- 메타프로그래밍은 강력하지만 숨은 동작을 만들 수 있으므로 사용 범위를 좁게 유지한다.

## 정리

템플릿 태그, `Proxy`, `Reflect`는 JavaScript의 동작 방식을 한 단계 더 깊게 다룰 수 있게 해준다. 이 기능들은 프레임워크와 라이브러리 내부에서 특히 자주 쓰인다.

실무에서 중요한 것은 "쓸 수 있다"가 아니라 "써서 더 단순해지는가"다. 동작을 숨기는 도구일수록 의도와 경계를 분명히 해야 한다.

# 심벌과 객체 내부

JavaScript 객체는 단순히 키와 값의 묶음처럼 보이지만, 내부에는 더 많은 규칙이 있다. 프로퍼티 속성, 심벌 키, 프로토타입, 확장 가능 여부 같은 개념이 객체의 동작을 결정한다.

이 글에서는 객체를 "겉으로 쓰는 방법"이 아니라 "안쪽에서 어떻게 동작하는지"에 가깝게 살펴본다.

## 이 글의 위치

앞 글에서는 비동기 흐름을 정리했다. 이번 글에서는 객체의 내부 규칙과 심벌을 다룬다.

## 먼저 잡을 핵심

- `Symbol`은 유일한 프로퍼티 키를 만들 때 사용한다.
- 잘 알려진 심벌은 JavaScript 내부 동작을 사용자 코드가 조정할 수 있게 해준다.
- 프로퍼티에는 값뿐 아니라 열거 가능성, 수정 가능성 같은 속성이 있다.
- 객체는 확장 가능 여부를 제어할 수 있다.
- 프로토타입은 객체가 없는 프로퍼티를 찾아 올라가는 연결이다.

## Symbol 기본

`Symbol()`은 매번 유일한 값을 만든다.

```js
const a = Symbol('id');
const b = Symbol('id');

console.log(a === b);
console.log(typeof a);
```

실행 결과:

```text
false
symbol
```

설명이 같아도 서로 다른 심벌이다. 이 특징 덕분에 객체의 키 충돌을 피할 수 있다.

```js
const id = Symbol('id');
const user = {
  name: 'Kim',
  [id]: 1,
};

console.log(user.name);
console.log(user[id]);
console.log(Object.keys(user));
```

실행 결과:

```text
Kim
1
[ 'name' ]
```

심벌 키는 일반적인 `Object.keys()` 결과에 나오지 않는다. 완전히 숨겨지는 것은 아니지만, 일반 문자열 키와는 다르게 취급된다.

## Symbol.for

`Symbol.for()`는 전역 심벌 레지스트리에서 심벌을 찾거나 만든다.

```js
const a = Symbol.for('app.id');
const b = Symbol.for('app.id');

console.log(a === b);
console.log(Symbol.keyFor(a));
```

실행 결과:

```text
true
app.id
```

일반 `Symbol()`은 매번 새 심벌을 만들고, `Symbol.for()`는 같은 키로 공유되는 심벌을 가져온다.

## 잘 알려진 심벌

JavaScript에는 특별한 의미를 가진 심벌들이 있다. 대표적인 것이 `Symbol.iterator`다.

```js
const range = {
  from: 1,
  to: 3,
  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value += 1) {
      yield value;
    }
  },
};

console.log([...range]);
```

실행 결과:

```text
[ 1, 2, 3 ]
```

`Symbol.iterator`를 구현하면 객체가 이터러블이 된다. 즉 JavaScript의 표준 동작 일부를 객체가 직접 정의할 수 있다.

## Symbol.toStringTag

`Symbol.toStringTag`는 `Object.prototype.toString` 결과를 바꿀 수 있다.

```js
const user = {
  [Symbol.toStringTag]: 'User',
};

console.log(Object.prototype.toString.call(user));
```

실행 결과:

```text
[object User]
```

일반 코드에서 자주 쓰지는 않지만, 라이브러리나 내장 객체처럼 보이는 값을 만들 때 이해해두면 좋다.

## 프로퍼티 디스크립터

객체의 프로퍼티는 값만 가진 것이 아니다. 수정 가능 여부, 열거 가능 여부, 재정의 가능 여부 같은 속성을 함께 가진다.

```js
const user = {};

Object.defineProperty(user, 'id', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});

user.id = 2;

console.log(user.id);
console.log(Object.keys(user));
```

실행 결과:

```text
1
[ 'id' ]
```

`writable: false`라서 값을 바꾸려는 시도가 반영되지 않는다. 엄격 모드에서는 에러가 날 수 있다.

## enumerable

`enumerable`은 열거에 포함되는지 결정한다.

```js
const user = { name: 'Kim' };

Object.defineProperty(user, 'secret', {
  value: 'hidden',
  enumerable: false,
});

console.log(user.secret);
console.log(Object.keys(user));
```

실행 결과:

```text
hidden
[ 'name' ]
```

값은 읽을 수 있지만 `Object.keys()`에는 나오지 않는다. 프레임워크나 라이브러리 내부 속성에서 이런 패턴을 볼 수 있다.

## getter와 setter

프로퍼티는 값을 직접 저장하지 않고, 읽기와 쓰기 동작을 함수로 정의할 수도 있다.

```js
const user = {
  firstName: 'Seoha',
  lastName: 'Jung',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  },
};

console.log(user.fullName);

user.fullName = 'Kim Min';
console.log(user.firstName);
```

실행 결과:

```text
Seoha Jung
Kim
```

겉으로는 프로퍼티처럼 보이지만 내부적으로는 함수가 실행된다.

## 객체 확장 제어

객체에 새 프로퍼티를 추가하지 못하게 할 수 있다.

```js
const config = { mode: 'prod' };

Object.preventExtensions(config);
config.debug = true;

console.log(config.debug);
console.log(Object.isExtensible(config));
```

실행 결과:

```text
undefined
false
```

더 강한 제어도 있다.

- `Object.preventExtensions()`: 새 프로퍼티 추가 금지
- `Object.seal()`: 추가와 삭제 금지, 기존 값 변경은 가능
- `Object.freeze()`: 추가, 삭제, 값 변경 금지

```js
const config = Object.freeze({ mode: 'prod' });

config.mode = 'dev';

console.log(config.mode);
console.log(Object.isFrozen(config));
```

실행 결과:

```text
prod
true
```

단, `freeze()`는 기본적으로 얕은 동결이다. 중첩 객체까지 자동으로 얼리지는 않는다.

## 프로토타입 확인

객체는 프로토타입을 통해 다른 객체의 프로퍼티를 찾아갈 수 있다.

```js
const parent = {
  greet() {
    return 'hello';
  },
};

const child = Object.create(parent);
child.name = 'Kim';

console.log(child.name);
console.log(child.greet());
console.log(Object.getPrototypeOf(child) === parent);
```

실행 결과:

```text
Kim
hello
true
```

`child`에는 `greet()`가 직접 없지만, 프로토타입인 `parent`에서 찾아 실행한다.

## own property와 inherited property

객체 자신이 가진 프로퍼티와 프로토타입에서 물려받은 프로퍼티는 구분해야 한다.

```js
const parent = { role: 'admin' };
const user = Object.create(parent);
user.name = 'Kim';

console.log('role' in user);
console.log(Object.hasOwn(user, 'role'));
console.log(Object.hasOwn(user, 'name'));
```

실행 결과:

```text
true
false
true
```

`in`은 프로토타입까지 확인하고, `Object.hasOwn()`은 객체 자신의 프로퍼티만 확인한다.

## 선택 기준 정리

- 충돌 없는 특별한 키가 필요하면 `Symbol`을 고려한다.
- 객체를 순회 가능하게 만들려면 `Symbol.iterator`를 구현한다.
- 프로퍼티 노출과 수정 가능성을 제어하려면 디스크립터를 사용한다.
- 설정 객체를 보호하고 싶으면 `freeze()`나 `seal()`을 고려한다.
- 프로퍼티 존재 여부를 볼 때는 `in`과 `Object.hasOwn()`의 차이를 구분한다.

## 정리

객체는 단순한 키-값 저장소 이상이다. 심벌, 디스크립터, 확장성, 프로토타입이 합쳐져 객체의 실제 동작을 만든다.

이 개념들은 매일 직접 작성하지 않더라도, 프레임워크와 라이브러리가 객체를 다루는 방식을 이해하는 데 큰 도움이 된다.

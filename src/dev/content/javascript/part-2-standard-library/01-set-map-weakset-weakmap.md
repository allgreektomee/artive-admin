# Set·Map·WeakSet·WeakMap

배열과 객체만으로도 많은 데이터를 다룰 수 있다. 하지만 중복을 없애거나, 값의 존재 여부를 빠르게 확인하거나, 객체를 키로 사용해야 할 때는 `Set`과 `Map`이 더 잘 맞는다.

`WeakSet`과 `WeakMap`은 조금 더 특수하다. 순회할 수 없고 사용할 수 있는 값도 제한되지만, 객체의 생명주기와 함께 데이터를 다뤄야 할 때 유용하다. 여기서 객체의 생명주기란 객체가 생성되고, 사용되다가, 더 이상 참조되지 않아 가비지 컬렉션 대상이 되는 흐름을 말한다.

## 이 글의 위치

1부에서는 객체와 배열을 기본 자료구조로 다뤘다. 2부에서는 JavaScript가 제공하는 표준 객체를 더 넓게 살펴본다. 이번 글은 그 시작으로 컬렉션을 정리한다.

## 먼저 잡을 핵심

- `Set`은 중복 없는 값의 모음이다.
- `Map`은 키와 값을 연결해서 저장하는 컬렉션이다.
- `WeakSet`과 `WeakMap`은 객체만 다루며 순회할 수 없다.
- 약한 참조는 객체가 더 이상 다른 곳에서 쓰이지 않을 때 가비지 컬렉션을 막지 않는 참조다.
- 배열과 객체로 충분한지, `Set`과 `Map`이 더 의도를 잘 드러내는지 판단해야 한다.

## Set 기본

`Set`은 같은 값을 한 번만 저장한다. 배열에서 중복을 제거할 때 자주 사용한다.

```js
const tags = ['js', 'react', 'js', 'css'];
const uniqueTags = new Set(tags);

console.log(uniqueTags);
console.log([...uniqueTags]);
```

실행 결과:

```text
Set(3) { 'js', 'react', 'css' }
[ 'js', 'react', 'css' ]
```

`Set` 자체는 배열이 아니다. 배열 메서드를 쓰고 싶다면 스프레드 문법이나 `Array.from()`으로 배열로 바꾸면 된다.

## 값 추가와 확인

`add()`로 값을 추가하고, `has()`로 값이 있는지 확인한다. `delete()`는 값을 제거하고, `size`는 저장된 값의 개수를 알려준다.

```js
const selectedIds = new Set();

selectedIds.add(1);
selectedIds.add(2);
selectedIds.add(2);

console.log(selectedIds.size);
console.log(selectedIds.has(1));

selectedIds.delete(1);
console.log(selectedIds.has(1));
```

실행 결과:

```text
2
true
false
```

중복 추가가 자동으로 무시되기 때문에 선택된 항목 ID, 이미 처리한 값, 권한 목록처럼 중복이 의미 없는 데이터에 잘 맞는다.

## 배열과 Set의 차이

배열은 순서가 중요하고 같은 값이 여러 번 나올 수 있는 목록에 적합하다. `Set`은 값의 존재 여부와 중복 제거가 중요할 때 더 의도가 분명하다.

```js
const blockedUsers = ['kim', 'lee', 'park'];

console.log(blockedUsers.includes('lee'));

const blockedUserSet = new Set(blockedUsers);
console.log(blockedUserSet.has('lee'));
```

실행 결과:

```text
true
true
```

데이터가 적을 때는 둘의 차이가 크게 느껴지지 않는다. 하지만 코드 의미만 놓고 보면 `has()`는 "포함되어 있는가"라는 의도를 더 직접적으로 보여준다.

## Set 순회

`Set`은 저장된 순서를 유지하며 순회할 수 있다.

```js
const roles = new Set(['admin', 'editor', 'viewer']);

for (const role of roles) {
  console.log(role);
}
```

실행 결과:

```text
admin
editor
viewer
```

`Set`은 순서가 유지되지만, 인덱스로 접근하는 구조는 아니다. `roles[0]`처럼 쓰는 코드는 동작하지 않는다.

## Map 기본

`Map`은 키와 값을 함께 저장한다. 객체와 비슷해 보이지만, 키로 문자열뿐 아니라 객체, 함수, 숫자 같은 값도 사용할 수 있다.

```js
const userScores = new Map();

userScores.set('kim', 90);
userScores.set('lee', 85);

console.log(userScores.get('kim'));
console.log(userScores.has('park'));
```

실행 결과:

```text
90
false
```

값을 읽을 때는 `get()`, 저장할 때는 `set()`, 존재 여부를 확인할 때는 `has()`를 사용한다.

## 객체를 키로 쓰기

일반 객체의 키는 대부분 문자열이나 심벌로 다뤄진다. 반면 `Map`은 객체 자체를 키로 사용할 수 있다.

```js
const userA = { id: 1, name: 'Kim' };
const userB = { id: 2, name: 'Lee' };

const visitCount = new Map();
visitCount.set(userA, 3);
visitCount.set(userB, 1);

console.log(visitCount.get(userA));
console.log(visitCount.get({ id: 1, name: 'Kim' }));
```

실행 결과:

```text
3
undefined
```

마지막 결과가 `undefined`인 이유는 `{ id: 1, name: 'Kim' }`이 `userA`와 내용은 같아 보여도 다른 객체이기 때문이다. `Map`에서 객체 키는 객체의 모양이 아니라 같은 참조인지로 구분된다.

## Map 순회

`Map`은 저장된 순서를 유지한다. `for...of`로 순회하면 `[key, value]` 형태의 배열을 얻는다.

```js
const settings = new Map([
  ['theme', 'dark'],
  ['fontSize', 14],
]);

for (const [key, value] of settings) {
  console.log(`${key}: ${value}`);
}
```

실행 결과:

```text
theme: dark
fontSize: 14
```

키만 필요하면 `keys()`, 값만 필요하면 `values()`, 둘 다 필요하면 `entries()`를 사용할 수 있다.

## 객체와 Map 중 무엇을 쓸까?

설정값처럼 키가 고정되어 있고 JSON으로 저장하거나 전송해야 한다면 일반 객체가 더 자연스럽다.

```js
const config = {
  theme: 'dark',
  pageSize: 20,
};

console.log(config.theme);
```

실행 결과:

```text
dark
```

반대로 실행 중에 키가 자주 추가되고 삭제되거나, 키가 문자열로 제한되지 않아야 한다면 `Map`이 더 적합하다.

```js
const cache = new Map();

function saveResult(input, result) {
  cache.set(input, result);
}

const params = { page: 1 };
saveResult(params, ['post-1', 'post-2']);

console.log(cache.get(params));
```

실행 결과:

```text
[ 'post-1', 'post-2' ]
```

객체는 데이터의 형태를 표현할 때 좋고, `Map`은 컬렉션으로 값을 관리할 때 좋다.

## WeakSet

`WeakSet`은 객체만 저장할 수 있는 컬렉션이다. 원시값은 넣을 수 없다.

```js
const openedPanels = new WeakSet();
const panel = { id: 'menu' };

openedPanels.add(panel);

console.log(openedPanels.has(panel));
```

실행 결과:

```text
true
```

`WeakSet`은 순회할 수 없다. `size`도 없다. 그래서 "현재 무엇이 들어 있는지 목록으로 보여줘" 같은 용도에는 맞지 않는다.

```js
const items = new WeakSet();

items.add({ id: 1 });

console.log(typeof items.size);
console.log(typeof items.keys);
```

실행 결과:

```text
undefined
undefined
```

이 제약은 의도된 것이다. `WeakSet`은 객체가 다른 곳에서 더 이상 사용되지 않으면 가비지 컬렉션 대상이 될 수 있게 설계되어 있다.

## WeakMap

`WeakMap`은 객체를 키로만 사용할 수 있는 `Map`이다. 키가 되는 객체가 사라질 수 있다는 점을 전제로 만든 컬렉션이다.

```js
const metadata = new WeakMap();
const button = { type: 'button' };

metadata.set(button, {
  clicked: false,
});

console.log(metadata.get(button));
```

실행 결과:

```text
{ clicked: false }
```

`WeakMap`은 DOM 요소나 객체 인스턴스에 부가 정보를 붙이고 싶지만, 원본 객체를 직접 수정하고 싶지 않을 때 사용할 수 있다.

## WeakMap이 순회되지 않는 이유

`WeakMap`은 `for...of`로 순회할 수 없고, 키 목록도 꺼낼 수 없다.

```js
const store = new WeakMap();
const user = { id: 1 };

store.set(user, 'private data');

console.log(typeof store.keys);
console.log(typeof store.entries);
```

실행 결과:

```text
undefined
undefined
```

키 목록을 꺼낼 수 있다면 어떤 객체가 아직 살아 있는지 코드에서 관찰할 수 있게 된다. 그러면 가비지 컬렉션과 충돌한다. 그래서 `WeakMap`은 값을 저장하고 조회하는 기능에 집중한다.

## 심화 내용

`Set`과 `Map`은 코드를 더 짧게 만들기 위한 문법이 아니라, 데이터의 성격을 더 분명하게 표현하는 도구다.

```js
const users = [
  { id: 1, name: 'Kim' },
  { id: 2, name: 'Lee' },
  { id: 1, name: 'Kim' },
];

const seenIds = new Set();
const uniqueUsers = [];

for (const user of users) {
  if (seenIds.has(user.id)) continue;

  seenIds.add(user.id);
  uniqueUsers.push(user);
}

console.log(uniqueUsers);
```

실행 결과:

```text
[ { id: 1, name: 'Kim' }, { id: 2, name: 'Lee' } ]
```

여기서 `seenIds`는 "이미 본 ID"라는 역할을 가진다. 배열 하나로도 구현할 수 있지만, `Set`을 쓰면 중복 체크용 컬렉션이라는 의도가 바로 드러난다.

## 객체지향으로 확장해 보기

JavaScript의 객체지향은 Java나 C#처럼 클래스가 먼저 있고 객체가 그 틀을 따르는 방식으로만 이해하면 헷갈린다. JavaScript의 핵심은 객체와 프로토타입이고, `class`는 그 위에 올라간 문법이다.

객체지향을 깊게 볼 때는 네 가지 질문을 나눠서 생각하면 좋다.

- 상속: 공통 동작을 어디에서 물려받을 것인가?
- 다형성: 같은 메서드 이름으로 서로 다른 객체를 어떻게 다룰 것인가?
- 믹스인: 상속 관계가 아닌 기능 조합을 어떻게 만들 것인가?
- 인터페이스: 어떤 메서드를 반드시 제공해야 한다는 약속을 어떻게 표현할 것인가?

## 상속, `extends`는 프로토타입 연결이다

`class A extends B`는 `A`가 `B`의 코드를 복사한다는 뜻이 아니다. `A.prototype`이 `B.prototype`을 따라가도록 프로토타입 체인을 만든다. 그래서 하위 클래스 인스턴스는 자기 객체에 없는 메서드를 부모 프로토타입에서 찾아 실행할 수 있다.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog('Max');

console.log(dog.speak());
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);
```

실행 결과:

```text
Max barks
true
true
```

`Dog`는 `Animal`을 상속하지만, `speak()`를 다시 정의했다. 이때 부모 메서드는 사라진 것이 아니라 하위 클래스 메서드가 먼저 발견될 뿐이다. 필요하면 `super`로 부모 구현을 호출할 수 있다.

```js
class AuditDog extends Dog {
  speak() {
    return `[audit] ${super.speak()}`;
  }
}

const dog = new AuditDog('Max');

console.log(dog.speak());
```

실행 결과:

```text
[audit] Max barks
```

상속은 "A는 B의 한 종류다"라고 자연스럽게 말할 수 있을 때 어울린다. `Dog is an Animal`은 자연스럽다. 하지만 `UserService is a Logger`처럼 억지 관계를 만들면 상속보다 조합이 낫다.

## 다형성, 같은 메시지에 다르게 반응하기

다형성은 어려운 말처럼 보이지만 핵심은 단순하다. 호출하는 쪽은 같은 이름의 메서드를 부르고, 실제 객체가 자기 방식으로 응답하는 것이다.

```js
class CardPayment {
  pay(amount) {
    return `card paid ${amount}`;
  }
}

class AccountTransfer {
  pay(amount) {
    return `transfer paid ${amount}`;
  }
}

function checkout(paymentMethod, amount) {
  return paymentMethod.pay(amount);
}

console.log(checkout(new CardPayment(), 1000));
console.log(checkout(new AccountTransfer(), 1000));
```

실행 결과:

```text
card paid 1000
transfer paid 1000
```

`checkout()`은 카드인지 계좌이체인지 알 필요가 없다. `pay()`를 가진 객체면 된다. JavaScript에서는 이런 방식을 덕 타이핑이라고도 부른다. 오리가 꽥꽥 울고 오리처럼 걷는다면 오리로 취급하자는 관점이다.

다형성의 장점은 조건문을 줄이는 데 있다.

```js
function checkoutByType(type, amount) {
  if (type === 'card') return `card paid ${amount}`;
  if (type === 'transfer') return `transfer paid ${amount}`;
  throw new Error('unsupported payment type');
}
```

위 코드는 결제 방식이 늘어날 때마다 `checkoutByType()`을 고쳐야 한다. 반면 다형성을 쓰면 새로운 결제 클래스를 추가하고 `pay()`만 맞추면 된다. 호출하는 쪽의 변경이 줄어든다.

## 믹스인, 상속보다 작은 기능 조합

상속은 한 방향의 계층을 만든다. 하지만 실무에서는 "로그를 남길 수 있음", "이벤트를 발행할 수 있음", "권한을 검사할 수 있음"처럼 여러 객체에 섞어 넣고 싶은 기능이 많다. 이럴 때 믹스인을 사용할 수 있다.

```js
const Loggable = (Base) =>
  class extends Base {
    log(message) {
      return `[${this.constructor.name}] ${message}`;
    }
  };

class Service {
  execute() {
    return 'execute service';
  }
}

class UserService extends Loggable(Service) {}

const service = new UserService();

console.log(service.execute());
console.log(service.log('created user'));
```

실행 결과:

```text
execute service
[UserService] created user
```

여기서 `Loggable`은 클래스를 받아 새 클래스를 반환한다. `UserService`는 `Service`의 동작을 가지면서 `log()` 기능도 가진다. 믹스인은 기능을 작은 단위로 조합할 수 있게 해주지만, 너무 많이 쓰면 클래스가 어디서 어떤 메서드를 얻었는지 추적하기 어려워진다.

객체 합성으로 더 단순하게 처리할 수도 있다.

```js
const logger = {
  log(message) {
    return `[log] ${message}`;
  },
};

const userService = {
  createUser(name) {
    return `created ${name}`;
  },
};

const service = {
  ...userService,
  ...logger,
};

console.log(service.createUser('Kim'));
console.log(service.log('done'));
```

실행 결과:

```text
created Kim
[log] done
```

이 방식은 간단하지만, 같은 이름의 메서드가 있으면 뒤에 펼친 객체가 앞의 값을 덮어쓴다. 믹스인과 객체 합성 모두 "상속 관계를 만들지 않고 기능을 붙인다"는 점에서는 비슷하지만, 코드 규모가 커질수록 이름 충돌과 출처 추적을 조심해야 한다.

## 인터페이스, JavaScript에서는 약속으로 표현한다

JavaScript 자체에는 `interface` 문법이 없다. TypeScript에는 있지만, 순수 JavaScript 런타임에는 없다. 그래서 JavaScript에서 인터페이스는 보통 세 가지 방식으로 표현한다.

첫째, 문서와 이름으로 약속한다.

```js
// PaymentMethod 역할:
// - pay(amount) 메서드를 제공해야 한다.
// - pay(amount)는 결제 결과 문자열을 반환한다.
```

둘째, 실행 전에 필요한 메서드가 있는지 검사한다.

```js
function assertPaymentMethod(value) {
  if (!value || typeof value.pay !== 'function') {
    throw new TypeError('payment method must implement pay(amount)');
  }
}

function checkout(paymentMethod, amount) {
  assertPaymentMethod(paymentMethod);
  return paymentMethod.pay(amount);
}

console.log(checkout({ pay: (amount) => `paid ${amount}` }, 500));
```

실행 결과:

```text
paid 500
```

셋째, 추상 클래스처럼 기본 클래스를 만들어 하위 클래스가 반드시 구현하도록 강제한다.

```js
class PaymentMethod {
  pay() {
    throw new Error('pay(amount) must be implemented');
  }
}

class CardPayment extends PaymentMethod {
  pay(amount) {
    return `card paid ${amount}`;
  }
}

const payment = new CardPayment();

console.log(payment.pay(1000));
```

실행 결과:

```text
card paid 1000
```

이 방식은 완전한 인터페이스는 아니다. 하위 클래스가 `pay()`를 구현하지 않아도 객체 생성 자체는 가능하고, 호출하는 순간 에러가 난다. 그래도 "이 계열의 객체는 이 메서드를 가져야 한다"는 의도를 코드로 남길 수 있다.

## `Map`과 `WeakMap`을 객체지향 설계에 쓰기

객체지향 코드에서도 `Map`과 `WeakMap`은 유용하다. 특히 외부에서 객체를 직접 수정하지 않고 부가 상태를 관리할 때 좋다.

```js
const privateState = new WeakMap();

class Counter {
  constructor() {
    privateState.set(this, { count: 0 });
  }

  increase() {
    const state = privateState.get(this);
    state.count += 1;
    return state.count;
  }
}

const counter = new Counter();

console.log(counter.increase());
console.log(counter.increase());
console.log(counter.count);
```

실행 결과:

```text
1
2
undefined
```

`privateState`는 인스턴스를 키로 삼아 내부 상태를 보관한다. 객체가 더 이상 사용되지 않으면 `WeakMap`의 키도 가비지 컬렉션 대상이 될 수 있다. 최신 JavaScript에서는 `#count` 같은 private field를 더 자주 쓰지만, `WeakMap`은 여러 객체의 외부 메타데이터를 관리할 때 여전히 이해할 가치가 있다.

## 객체지향 개념 선택 기준

- 단순히 객체를 만들고 메서드를 공유하려면 `class`를 사용한다.
- "A는 B의 한 종류다"가 자연스러우면 상속을 고려한다.
- 호출하는 쪽이 구체 클래스를 몰라도 되게 하려면 다형성을 사용한다.
- 여러 클래스에 작은 기능을 섞고 싶으면 믹스인이나 객체 합성을 고려한다.
- 반드시 지켜야 할 메서드 계약이 있으면 런타임 검사, 추상 클래스 패턴, TypeScript 인터페이스 중 하나로 표현한다.
- 객체 외부에 부가 상태를 붙이고 싶으면 `Map`이나 `WeakMap`을 고려한다.

## 선택 기준 정리

- 순서 있는 목록이 필요하면 배열을 사용한다.
- 중복 없는 값의 모음이 필요하면 `Set`을 사용한다.
- 고정된 데이터 형태를 표현하면 객체를 사용한다.
- 실행 중 변하는 키-값 컬렉션이 필요하면 `Map`을 사용한다.
- 객체의 생명주기에 묶인 부가 정보가 필요하면 `WeakMap`을 고려한다.
- 순회가 필요하면 `WeakSet`과 `WeakMap`은 피한다.

## 정리

`Set`은 중복 없는 값의 모음이고, `Map`은 키와 값을 저장하는 컬렉션이다. 배열과 객체로도 비슷한 코드를 만들 수 있지만, `Set`과 `Map`을 사용하면 데이터의 의도가 더 분명해진다.

`WeakSet`과 `WeakMap`은 더 제한적이지만, 객체가 사라질 수 있다는 점을 고려한 컬렉션이다. 순회가 필요한 일반 데이터에는 맞지 않고, 객체에 부가 상태를 연결하는 특수한 상황에서 사용한다.

다음 글에서는 형식화 배열과 이진 데이터를 다룬다.

# Set·Map·WeakSet·WeakMap

배열과 객체만으로도 많은 데이터를 다룰 수 있다. 하지만 중복을 없애거나, 값의 존재 여부를 빠르게 확인하거나, 객체를 키로 사용해야 할 때는 `Set`과 `Map`이 더 잘 맞는다.

`WeakSet`과 `WeakMap`은 조금 더 특수하다. 순회할 수 없고 사용할 수 있는 값도 제한되지만, 객체의 생명주기와 함께 데이터를 다뤄야 할 때 유용하다.

## 이 글의 위치

1부에서는 객체와 배열을 기본 자료구조로 다뤘다. 2부에서는 JavaScript가 제공하는 표준 객체를 더 넓게 살펴본다. 이번 글은 그 시작으로 컬렉션을 정리한다.

## 먼저 잡을 핵심

- `Set`은 중복 없는 값의 모음이다.
- `Map`은 키와 값을 연결해서 저장하는 컬렉션이다.
- `WeakSet`과 `WeakMap`은 객체만 다루며 순회할 수 없다.
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

# 정규 표현식과 패턴 매칭

문자열을 다루다 보면 "이 값이 이메일 형식인가?", "문장에서 숫자만 뽑을 수 있는가?", "특정 패턴을 다른 문자열로 바꿀 수 있는가?" 같은 질문을 자주 만나게 된다. 정규 표현식은 이런 패턴 기반 문자열 처리를 위한 표준 도구다.

정규 표현식은 처음 보면 암호처럼 보이지만, 작은 규칙을 조합하는 언어라고 생각하면 이해하기 쉽다.

## 이 글의 위치

앞 글에서는 이진 데이터를 다루는 표준 객체를 봤다. 이번 글에서는 문자열 안에서 규칙을 찾고, 검증하고, 추출하고, 바꾸는 방법을 다룬다.

## 먼저 잡을 핵심

- 정규 표현식은 문자열 패턴을 표현하는 객체다.
- `test()`는 패턴에 맞는지 확인하고, `match()`는 매칭 결과를 가져온다.
- `replace()`와 함께 쓰면 패턴 기반 치환을 할 수 있다.
- `g`, `i`, `m`, `u`, `s`, `y` 같은 플래그가 검색 방식에 영향을 준다.
- 복잡한 정규식은 짧아 보여도 읽기 어려울 수 있으므로 이름과 주석으로 의도를 보완해야 한다.

## 정규 표현식 만들기

정규 표현식은 리터럴 문법이나 `RegExp` 생성자로 만들 수 있다.

```js
const literal = /hello/;
const created = new RegExp('hello');

console.log(literal.test('hello js'));
console.log(created.test('hello js'));
```

실행 결과:

```text
true
true
```

패턴이 코드에 고정되어 있으면 리터럴을 많이 쓴다. 사용자가 입력한 문자열처럼 실행 중에 패턴을 만들어야 하면 `RegExp` 생성자를 사용한다.

## `test()`로 검증하기

`test()`는 문자열이 패턴에 맞는지 `true` 또는 `false`로 알려준다.

```js
const onlyNumber = /^\d+$/;

console.log(onlyNumber.test('123'));
console.log(onlyNumber.test('12a'));
```

실행 결과:

```text
true
false
```

`^`는 문자열의 시작, `$`는 문자열의 끝을 의미한다. `\d+`는 숫자가 하나 이상 이어진다는 뜻이다. 그래서 `/^\d+$/`는 "처음부터 끝까지 숫자로만 이루어진 문자열"을 표현한다.

## 자주 쓰는 기본 기호

정규식에서 자주 만나는 기호는 다음과 같다.

- `.`: 줄바꿈을 제외한 임의의 한 문자
- `\d`: 숫자
- `\w`: 영문자, 숫자, 밑줄
- `\s`: 공백 문자
- `+`: 하나 이상
- `*`: 0개 이상
- `?`: 0개 또는 1개
- `{n}`: 정확히 n개
- `{n,m}`: n개 이상 m개 이하

```js
const phoneLike = /^\d{2,3}-\d{3,4}-\d{4}$/;

console.log(phoneLike.test('02-123-4567'));
console.log(phoneLike.test('010-1234-5678'));
console.log(phoneLike.test('010-12-5678'));
```

실행 결과:

```text
true
true
false
```

## `match()`로 추출하기

`match()`는 패턴에 맞는 값을 찾는다.

```js
const text = 'order: A-100, B-200';

console.log(text.match(/[A-Z]-\d+/));
console.log(text.match(/[A-Z]-\d+/g));
```

실행 결과:

```text
[ 'A-100', index: 7, input: 'order: A-100, B-200', groups: undefined ]
[ 'A-100', 'B-200' ]
```

`g` 플래그를 붙이면 전체에서 여러 개를 찾는다. `g`가 없으면 첫 번째 매칭과 위치 정보가 함께 반환된다.

## 그룹으로 필요한 부분만 뽑기

괄호 `()`를 사용하면 매칭된 부분 중 일부를 그룹으로 잡을 수 있다.

```js
const filename = 'report-2026-05.pdf';
const match = filename.match(/^(.+)-(\d{4})-(\d{2})\.pdf$/);

console.log(match[1]);
console.log(match[2]);
console.log(match[3]);
```

실행 결과:

```text
report
2026
05
```

그룹이 많아지면 번호만으로 의미를 알기 어렵다. 이럴 때는 이름 있는 캡처 그룹을 사용할 수 있다.

```js
const filename = 'report-2026-05.pdf';
const match = filename.match(/^(?<name>.+)-(?<year>\d{4})-(?<month>\d{2})\.pdf$/);

console.log(match.groups.name);
console.log(match.groups.year);
console.log(match.groups.month);
```

실행 결과:

```text
report
2026
05
```

## `replace()`로 치환하기

정규식은 문자열 치환에서도 강력하다.

```js
const phone = '010-1234-5678';
const masked = phone.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-****-$3');

console.log(masked);
```

실행 결과:

```text
010-****-5678
```

치환 문자열의 `$1`, `$2`, `$3`는 캡처 그룹을 의미한다. 더 복잡한 로직이 필요하면 콜백 함수를 넘길 수 있다.

```js
const text = 'apple banana cherry';
const upper = text.replace(/\b\w/g, (char) => char.toUpperCase());

console.log(upper);
```

실행 결과:

```text
Apple Banana Cherry
```

## 플래그

정규식 뒤의 플래그는 검색 방식을 바꾼다.

```js
const text = 'JavaScript\njavascript';

console.log(text.match(/javascript/));
console.log(text.match(/javascript/i));
console.log(text.match(/^javascript/im));
```

실행 결과:

```text
null
[ 'JavaScript', index: 0, input: 'JavaScript\njavascript', groups: undefined ]
[ 'JavaScript', index: 0, input: 'JavaScript\njavascript', groups: undefined ]
```

자주 쓰는 플래그는 다음과 같다.

- `g`: 전체 검색
- `i`: 대소문자 무시
- `m`: 여러 줄 모드에서 `^`, `$`를 줄 단위로 적용
- `u`: 유니코드 모드
- `s`: `.`이 줄바꿈도 포함하도록 처리

## 탐욕적 매칭과 비탐욕적 매칭

기본 수량자는 가능한 많이 매칭한다. 이를 탐욕적 매칭이라고 한다.

```js
const html = '<b>one</b><b>two</b>';

console.log(html.match(/<b>.*<\/b>/)[0]);
console.log(html.match(/<b>.*?<\/b>/)[0]);
```

실행 결과:

```text
<b>one</b><b>two</b>
<b>one</b>
```

`.*`는 가능한 많이 잡고, `.*?`는 가능한 적게 잡는다. HTML을 정규식으로 완전히 파싱하는 것은 위험하지만, 탐욕적 매칭과 비탐욕적 매칭 차이를 보여주기에는 좋은 예다.

## 실무에서 조심할 점

정규식은 짧지만 너무 많은 의미를 압축할 수 있다. 그래서 복잡한 정규식은 변수명으로 의도를 드러내고, 필요하면 여러 단계로 나누는 편이 좋다.

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmailLike(value) {
  return emailPattern.test(value);
}

console.log(isEmailLike('user@example.com'));
console.log(isEmailLike('user-example.com'));
```

실행 결과:

```text
true
false
```

위 정규식은 "이메일처럼 보이는지"를 보는 정도다. 실제 이메일 표준 전체를 검증하려고 정규식을 과도하게 복잡하게 만들면 유지보수가 어려워진다. 입력 검증은 서비스 요구사항에 맞는 수준으로 정해야 한다.

## 선택 기준 정리

- 단순 포함 여부는 `includes()`를 먼저 고려한다.
- 일정한 패턴 검증은 `test()`를 사용한다.
- 문자열에서 패턴을 추출하려면 `match()` 또는 `matchAll()`을 사용한다.
- 패턴 기반 치환은 `replace()`를 사용한다.
- 정규식이 너무 복잡해지면 여러 단계의 문자열 처리로 나누는 편이 낫다.

## 정리

정규 표현식은 문자열 안에서 규칙을 찾는 도구다. 처음에는 `test()`, `match()`, `replace()`만 익혀도 실무의 많은 문제를 해결할 수 있다.

중요한 것은 정규식을 짧게 쓰는 것이 아니라, 읽을 수 있게 쓰는 것이다. 패턴이 복잡해질수록 변수명, 함수명, 테스트 코드가 더 중요해진다.

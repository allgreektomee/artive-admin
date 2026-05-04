# 형식화 배열과 이진 데이터

JavaScript에서 보통 숫자 목록은 배열로 다룬다. 하지만 이미지, 오디오, 파일, 네트워크 패킷처럼 바이트 단위 데이터가 필요할 때는 일반 배열보다 이진 데이터를 직접 다루는 도구가 필요하다.

이때 사용하는 것이 `ArrayBuffer`, 형식화 배열(TypedArray), `DataView`다. 처음에는 낯설지만 역할을 나누어 보면 어렵지 않다.

## 이 글의 위치

앞 글에서는 `Set`과 `Map`처럼 데이터의 성격을 더 분명하게 표현하는 컬렉션을 다뤘다. 이번 글에서는 숫자를 바이트 단위로 저장하고 해석하는 표준 객체를 정리한다.

## 먼저 잡을 핵심

- `ArrayBuffer`는 원시 이진 데이터를 담는 고정 길이 메모리 공간이다.
- 형식화 배열은 `ArrayBuffer`를 숫자 배열처럼 읽고 쓰는 뷰다.
- `Uint8Array`, `Int16Array`, `Float32Array`처럼 타입에 따라 읽는 단위와 해석 방식이 달라진다.
- `DataView`는 바이트 위치와 엔디언을 직접 지정해야 할 때 사용한다.
- 일반 서비스 코드에서는 자주 쓰지 않지만, 파일·이미지·암호화·네트워크·Web API를 다룰 때 중요하다.

## 일반 배열과 다른 점

일반 배열은 여러 타입의 값을 섞어 담을 수 있고 길이도 자유롭게 바뀐다.

```js
const values = [10, '20', true];

values.push({ count: 30 });

console.log(values);
```

실행 결과:

```text
[ 10, '20', true, { count: 30 } ]
```

형식화 배열은 정해진 숫자 타입만 담는다. 길이도 처음 만들어진 뒤에는 바뀌지 않는다.

```js
const bytes = new Uint8Array(3);

bytes[0] = 10;
bytes[1] = 20;
bytes[2] = 300;

console.log(bytes);
console.log(bytes.length);
```

실행 결과:

```text
Uint8Array(3) [ 10, 20, 44 ]
3
```

`Uint8Array`는 0부터 255까지의 정수를 저장한다. `300`을 넣으면 1바이트 범위에 맞게 값이 잘려 `44`가 된다. 이런 동작은 일반 배열과 크게 다르다.

## ArrayBuffer

`ArrayBuffer`는 바이트를 담는 메모리 공간이다. 직접 값을 읽고 쓰기보다는, 형식화 배열 같은 뷰를 통해 접근한다.

```js
const buffer = new ArrayBuffer(4);

console.log(buffer.byteLength);
```

실행 결과:

```text
4
```

위 코드는 4바이트짜리 공간을 만든다. 하지만 `buffer[0] = 10`처럼 바로 값을 넣는 방식은 사용하지 않는다.

```js
const buffer = new ArrayBuffer(4);
const view = new Uint8Array(buffer);

view[0] = 10;
view[1] = 20;

console.log(view);
console.log(buffer.byteLength);
```

실행 결과:

```text
Uint8Array(4) [ 10, 20, 0, 0 ]
4
```

`ArrayBuffer`는 공간이고, `Uint8Array`는 그 공간을 1바이트 단위 숫자 배열처럼 보는 뷰다.

## 형식화 배열 종류

형식화 배열은 어떤 숫자 타입으로 읽고 쓸지에 따라 종류가 나뉜다.

```js
const buffer = new ArrayBuffer(8);

const bytes = new Uint8Array(buffer);
const numbers = new Uint16Array(buffer);

bytes[0] = 1;
bytes[1] = 2;
bytes[2] = 3;
bytes[3] = 4;

console.log(bytes);
console.log(numbers);
```

실행 결과:

```text
Uint8Array(8) [
  1, 2, 3, 4,
  0, 0, 0, 0
]
Uint16Array(4) [ 513, 1027, 0, 0 ]
```

같은 `ArrayBuffer`라도 어떤 뷰로 보느냐에 따라 값이 다르게 해석된다. `Uint8Array`는 1바이트씩 보고, `Uint16Array`는 2바이트씩 묶어서 본다.

## 자주 쓰는 형식화 배열

- `Int8Array`: 1바이트 부호 있는 정수
- `Uint8Array`: 1바이트 부호 없는 정수
- `Uint8ClampedArray`: 0부터 255 범위로 값을 고정하는 정수
- `Int16Array`, `Uint16Array`: 2바이트 정수
- `Int32Array`, `Uint32Array`: 4바이트 정수
- `Float32Array`: 4바이트 부동소수점
- `Float64Array`: 8바이트 부동소수점

이미지 픽셀처럼 0부터 255 사이 값이 필요하면 `Uint8ClampedArray`가 자주 쓰인다.

```js
const colors = new Uint8ClampedArray(3);

colors[0] = -20;
colors[1] = 120;
colors[2] = 300;

console.log(colors);
```

실행 결과:

```text
Uint8ClampedArray(3) [ 0, 120, 255 ]
```

범위를 벗어난 값이 0 또는 255로 고정된다.

## 배열처럼 다루기

형식화 배열은 일반 배열과 완전히 같지는 않지만, 많은 배열 메서드를 사용할 수 있다.

```js
const scores = new Uint8Array([10, 20, 30]);

const doubled = scores.map((score) => score * 2);

console.log(doubled);
console.log(doubled instanceof Uint8Array);
```

실행 결과:

```text
Uint8Array(3) [ 20, 40, 60 ]
true
```

`map()` 결과도 같은 종류의 형식화 배열이다. 이 점은 일반 배열과 다르게 느껴질 수 있다.

```js
const scores = new Uint8Array([100, 150, 200]);
const overLimit = scores.map((score) => score * 2);

console.log(overLimit);
```

실행 결과:

```text
Uint8Array(3) [ 200, 44, 144 ]
```

`Uint8Array`의 범위를 넘는 값은 다시 1바이트 범위로 맞춰진다. 숫자 계산 결과를 보존해야 한다면 타입 선택을 먼저 확인해야 한다.

## slice와 subarray

`slice()`는 데이터를 복사한 새 뷰를 만든다. `subarray()`는 같은 버퍼를 바라보는 뷰를 만든다.

```js
const source = new Uint8Array([1, 2, 3, 4]);

const copied = source.slice(0, 2);
const shared = source.subarray(0, 2);

source[0] = 99;

console.log(copied);
console.log(shared);
```

실행 결과:

```text
Uint8Array(2) [ 1, 2 ]
Uint8Array(2) [ 99, 2 ]
```

복사가 필요한지, 같은 메모리를 공유해도 되는지에 따라 선택이 달라진다. 큰 바이너리 데이터를 다룰 때는 이 차이가 성능과 버그에 영향을 줄 수 있다.

## DataView

`DataView`는 같은 버퍼에서 원하는 위치의 값을 직접 읽고 쓸 수 있는 뷰다. 특히 여러 타입이 섞여 있거나 바이트 순서를 지정해야 할 때 사용한다.

```js
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

view.setUint8(0, 255);
view.setUint16(1, 300, true);

console.log(view.getUint8(0));
console.log(view.getUint16(1, true));
```

실행 결과:

```text
255
300
```

`setUint16(1, 300, true)`에서 마지막 인자 `true`는 리틀 엔디언으로 저장하겠다는 뜻이다. 엔디언은 여러 바이트로 된 숫자를 어떤 순서로 저장할지 정하는 방식이다.

## 엔디언 감각 잡기

같은 숫자라도 바이트 순서에 따라 저장 모습이 달라진다.

```js
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

view.setUint16(0, 256, false);
console.log(new Uint8Array(buffer));

view.setUint16(0, 256, true);
console.log(new Uint8Array(buffer));
```

실행 결과:

```text
Uint8Array(2) [ 1, 0 ]
Uint8Array(2) [ 0, 1 ]
```

`false`는 빅 엔디언, `true`는 리틀 엔디언이다. 웹 개발에서 매일 마주치는 개념은 아니지만, 파일 포맷이나 네트워크 프로토콜을 직접 다룰 때 중요해진다.

## 실제로 언제 필요할까?

형식화 배열은 화면 UI를 만드는 일반 코드보다는 브라우저와 낮은 수준의 데이터를 연결하는 지점에서 자주 만난다.

```js
const text = 'hello';
const encoded = new TextEncoder().encode(text);

console.log(encoded);

const decoded = new TextDecoder().decode(encoded);
console.log(decoded);
```

실행 결과:

```text
Uint8Array(5) [ 104, 101, 108, 108, 111 ]
hello
```

`TextEncoder`는 문자열을 UTF-8 바이트 배열로 바꾼다. 결과가 `Uint8Array`인 이유는 문자열도 결국 저장하거나 전송할 때 바이트로 표현되기 때문이다.

## 심화 내용

형식화 배열은 "숫자를 담는 배열"이라기보다 "메모리를 특정 숫자 타입으로 해석하는 뷰"에 가깝다. 이 관점을 잡으면 `ArrayBuffer`와 여러 뷰의 관계가 더 자연스럽다.

```js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);
const view = new DataView(buffer);

view.setUint32(0, 0x12345678, false);

console.log(bytes);
console.log(view.getUint16(0, false).toString(16));
console.log(view.getUint16(2, false).toString(16));
```

실행 결과:

```text
Uint8Array(4) [ 18, 52, 86, 120 ]
1234
5678
```

하나의 버퍼를 `Uint8Array`로 보면 바이트 목록이고, `DataView`로 보면 특정 위치에서 여러 바이트를 묶어 읽을 수 있다.

## 선택 기준 정리

- 일반 숫자 목록이면 배열을 사용한다.
- 바이트 단위 데이터가 필요하면 `ArrayBuffer`와 형식화 배열을 사용한다.
- 0부터 255 사이의 바이트 목록은 `Uint8Array`가 기본 선택지다.
- 이미지 픽셀처럼 값이 범위를 넘지 않게 고정되어야 하면 `Uint8ClampedArray`를 고려한다.
- 여러 숫자 타입이 섞인 바이너리 포맷을 읽고 쓰면 `DataView`를 사용한다.
- `slice()`는 복사, `subarray()`는 공유라는 차이를 기억한다.

## 정리

`ArrayBuffer`는 이진 데이터를 담는 공간이고, 형식화 배열은 그 공간을 특정 숫자 타입의 배열처럼 다루는 뷰다. `DataView`는 바이트 위치와 엔디언을 직접 제어해야 할 때 사용한다.

일반 웹 화면을 만들 때 매일 쓰는 도구는 아니지만, 파일, 이미지, 문자열 인코딩, 암호화, 네트워크 데이터를 다룰 때는 반드시 만나게 된다. 핵심은 데이터를 "값 목록"으로 볼지, "바이트 배열"로 볼지 구분하는 것이다.

다음 글에서는 정규 표현식과 패턴 매칭을 정리한다.

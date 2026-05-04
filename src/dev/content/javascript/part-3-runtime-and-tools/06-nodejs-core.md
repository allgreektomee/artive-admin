# Node.js 핵심

Node.js는 브라우저 밖에서 JavaScript를 실행하는 런타임이다. 브라우저가 DOM과 화면 API를 제공한다면, Node.js는 파일 시스템, 네트워크, 프로세스 같은 서버 환경 API를 제공한다.

## 이 글의 위치

앞 글까지는 브라우저 API를 중심으로 다뤘다. 이번 글부터는 Node.js에서 JavaScript가 어떻게 실행되고, 어떤 기본 도구를 제공하는지 정리한다.

## 먼저 잡을 핵심

- Node.js는 JavaScript 런타임이다.
- 브라우저의 `window`, `document` 대신 Node.js 전용 API를 사용한다.
- Node.js는 이벤트 루프 기반 비동기 I/O를 사용한다.
- `Buffer`는 이진 데이터를 다루는 Node.js 객체다.
- `EventEmitter`와 Stream은 Node.js에서 자주 만나는 흐름 제어 도구다.

## Node.js란?

Node.js는 Chrome V8 엔진을 기반으로 만든 JavaScript 실행 환경이다. 서버, CLI 도구, 빌드 도구, 자동화 스크립트에서 자주 사용된다.

```js
console.log(process.version);
console.log(process.platform);
```

실행 결과:

```text
v20.x.x
darwin
```

실행 결과는 설치된 Node.js 버전과 운영체제에 따라 달라진다.

## 브라우저와 다른 점

Node.js에는 기본적으로 DOM이 없다.

```js
console.log(typeof window);
console.log(typeof document);
console.log(typeof process);
```

Node.js 실행 결과:

```text
undefined
undefined
object
```

브라우저 코드를 Node.js에서 그대로 실행할 수 없는 이유가 여기에 있다. 실행 환경이 제공하는 API가 다르다.

## 비동기 I/O

Node.js는 파일 읽기, 네트워크 요청 같은 I/O 작업을 비동기로 처리하는 데 강하다.

```js
import { readFile } from 'node:fs/promises';

const text = await readFile('./package.json', 'utf-8');

console.log(text.length);
```

파일을 읽는 동안 JavaScript 전체가 멈추는 방식이 아니라, 작업이 끝나면 Promise가 완료된다.

## Buffer

`Buffer`는 Node.js에서 이진 데이터를 다루는 객체다.

```js
const buffer = Buffer.from('hello');

console.log(buffer);
console.log(buffer.toString('utf-8'));
```

실행 결과:

```text
<Buffer 68 65 6c 6c 6f>
hello
```

파일, 네트워크, 암호화 작업에서 문자열이 아니라 바이트 데이터가 필요할 때 사용한다.

## EventEmitter

`EventEmitter`는 이벤트를 등록하고 발생시키는 Node.js의 기본 패턴이다.

```js
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

emitter.on('login', (name) => {
  console.log(`${name} logged in`);
});

emitter.emit('login', 'Kim');
```

실행 결과:

```text
Kim logged in
```

Node.js의 여러 객체는 이벤트 기반으로 동작한다. 서버 요청, 스트림 데이터, 프로세스 이벤트 등에서 이 패턴을 만난다.

## Stream

Stream은 데이터를 한 번에 모두 읽지 않고 조각으로 나누어 처리하는 흐름이다.

```js
import { createReadStream } from 'node:fs';

const stream = createReadStream('./package.json', {
  encoding: 'utf-8',
});

stream.on('data', (chunk) => {
  console.log(chunk.length);
});

stream.on('end', () => {
  console.log('done');
});
```

큰 파일이나 네트워크 응답을 처리할 때 메모리를 아끼는 데 유용하다.

## 모듈 방식

Node.js에서는 ES 모듈과 CommonJS를 모두 만날 수 있다.

```js
// ES Module
import { readFile } from 'node:fs/promises';

// CommonJS
// const fs = require('node:fs');
```

프로젝트의 `package.json`에서 `"type": "module"`을 사용하면 `.js` 파일을 ES 모듈로 해석한다.

## 선택 기준 정리

- 브라우저 API가 필요한 코드는 브라우저에서 실행한다.
- 파일, 프로세스, 서버 작업은 Node.js API를 사용한다.
- 이진 데이터는 `Buffer`로 다룬다.
- 이벤트 기반 흐름은 `EventEmitter`를 이해하면 읽기 쉽다.
- 큰 데이터는 Stream으로 나누어 처리하는 것을 고려한다.

## 정리

Node.js는 JavaScript를 서버와 도구 환경으로 확장한다. 문법은 같은 JavaScript지만, 실행 환경이 제공하는 API가 브라우저와 다르다.

Node.js를 이해할 때는 런타임, 비동기 I/O, Buffer, EventEmitter, Stream을 먼저 잡으면 이후 서버 개발과 도구 사용이 쉬워진다.

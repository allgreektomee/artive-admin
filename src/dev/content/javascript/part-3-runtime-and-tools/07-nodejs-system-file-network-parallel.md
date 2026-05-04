# Node.js 시스템·파일·네트워크·병렬

Node.js는 서버와 도구를 만들기 위해 운영체제와 가까운 API를 제공한다. 프로세스 정보, 파일 읽고 쓰기, HTTP 서버, TCP 통신, 자식 프로세스, Worker Threads 같은 기능이 여기에 포함된다.

## 이 글의 위치

앞 글에서는 Node.js의 핵심 개념을 봤다. 이번 글에서는 Node.js가 운영체제와 네트워크를 다루는 방법을 넓게 훑는다.

## 먼저 잡을 핵심

- `process`는 현재 Node.js 프로세스 정보를 제공한다.
- `os` 모듈은 운영체제와 CPU, 메모리 정보를 제공한다.
- `fs` 모듈은 파일 시스템을 다룬다.
- `http` 모듈만으로도 간단한 서버를 만들 수 있다.
- CPU 작업이 무거우면 Worker Threads나 자식 프로세스를 고려한다.

## process

`process`는 현재 실행 중인 Node.js 프로세스를 나타내는 전역 객체다.

```js
console.log(process.cwd());
console.log(process.argv);
console.log(process.env.NODE_ENV);
```

현재 작업 디렉터리, 실행 인자, 환경변수 등을 확인할 수 있다.

## os 모듈

`os` 모듈은 운영체제 정보를 제공한다.

```js
import os from 'node:os';

console.log(os.platform());
console.log(os.cpus().length);
console.log(os.totalmem());
```

서버 상태 출력, CLI 도구, 진단 로그에서 사용할 수 있다.

## 파일 읽고 쓰기

Promise 기반 파일 API는 `node:fs/promises`에서 가져온다.

```js
import { readFile, writeFile } from 'node:fs/promises';

await writeFile('./hello.txt', 'hello node', 'utf-8');

const text = await readFile('./hello.txt', 'utf-8');

console.log(text);
```

실행 결과:

```text
hello node
```

작은 파일은 한 번에 읽어도 되지만, 큰 파일은 Stream을 고려한다.

## 경로 다루기

파일 경로는 문자열로 직접 붙이기보다 `path` 모듈을 사용한다.

```js
import path from 'node:path';

const filePath = path.join(process.cwd(), 'logs', 'app.log');

console.log(filePath);
console.log(path.extname(filePath));
```

운영체제마다 경로 구분자가 다를 수 있으므로 `path.join()`을 쓰는 습관이 좋다.

## HTTP 서버

Node.js 기본 `http` 모듈만으로 간단한 서버를 만들 수 있다.

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('hello node');
});

server.listen(3000, () => {
  console.log('server started');
});
```

실무에서는 Express, Fastify, NestJS 같은 프레임워크를 쓰는 경우가 많지만, 기본 서버 구조를 이해하면 프레임워크 동작도 읽기 쉬워진다.

## TCP 서버 맛보기

HTTP보다 낮은 수준의 TCP 서버도 만들 수 있다.

```js
import net from 'node:net';

const server = net.createServer((socket) => {
  socket.write('hello tcp\n');

  socket.on('data', (data) => {
    console.log(data.toString());
  });
});

server.listen(4000);
```

일반 웹 개발에서는 직접 쓸 일이 많지 않지만, 네트워크 프로그램의 기반을 이해하는 데 도움이 된다.

## 자식 프로세스

Node.js에서 외부 명령을 실행해야 할 때는 `child_process`를 사용할 수 있다.

```js
import { execFile } from 'node:child_process';

execFile('node', ['--version'], (error, stdout) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(stdout.trim());
});
```

사용자 입력을 그대로 셸 명령에 넣으면 보안 문제가 생길 수 있다. 가능한 경우 `exec()`보다 `execFile()`처럼 인자를 분리하는 API가 안전하다.

## Worker Threads

Node.js는 기본적으로 이벤트 루프 기반으로 동작하지만, CPU 계산이 너무 무거우면 이벤트 루프가 막힐 수 있다. 이때 Worker Threads를 사용할 수 있다.

```js
import { Worker } from 'node:worker_threads';

const worker = new Worker('./worker.js');

worker.postMessage({ count: 1000 });

worker.on('message', (message) => {
  console.log(message);
});
```

Worker는 별도 스레드에서 JavaScript를 실행한다. 큰 계산, 이미지 처리, 압축 같은 CPU 작업에 적합하다.

## 선택 기준 정리

- 실행 환경 정보는 `process`와 `os`로 확인한다.
- 파일 경로는 `path` 모듈로 조합한다.
- 작은 파일은 `fs/promises`, 큰 파일은 Stream을 고려한다.
- HTTP 서버 구조를 이해하려면 기본 `http` 모듈을 살펴본다.
- 외부 명령 실행은 보안 위험을 고려한다.
- CPU 작업이 무거우면 Worker Threads나 별도 프로세스를 고려한다.

## 정리

Node.js는 JavaScript로 운영체제와 네트워크를 다룰 수 있게 해준다. 이 API들은 서버 개발뿐 아니라 CLI 도구, 배치 작업, 빌드 도구에서도 자주 등장한다.

실무에서는 프레임워크가 많은 부분을 감싸지만, 기본 모듈을 이해하면 문제가 생겼을 때 훨씬 빠르게 원인을 좁힐 수 있다.

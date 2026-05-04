# 15장. WebSocket과 실시간 UI

HTTP 요청은 **한 번 보내고 응답**을 받는 패턴이 기본이다. 채팅·알림·실시간 대시보드는 **연결을 유지**한 채 서버가 **push** 해 주는 편이 낫다. **WebSocket**은 양방향 채널이다.

## WebSocket 기본

```jsx
const socket = new WebSocket("wss://example.com/chat");
socket.onopen = () => { /* 연결됨 */ };
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // 상태 갱신
};
socket.onerror = () => { /* 로깅 */ };
socket.onclose = () => { /* 재연결 여부 */ };
socket.send(JSON.stringify({ type: "msg", body: "hello" }));
```

실제 URL·프로토콜·인증(쿼리 토큰, 첫 메시지에 토큰)은 백엔드와 맞춘다.

## React에서 `useRef`로 소켓 보관

렌더마다 새 `WebSocket`을 만들면 안 되므로, **연결 인스턴스**는 `useRef`에 넣고 **`useEffect`에서 한 번** 연결하는 패턴이 흔하다.

```jsx
const socketRef = useRef(null);

useEffect(() => {
  const ws = new WebSocket(url);
  socketRef.current = ws;
  ws.onmessage = (e) => { /* setMessages 등 */ };
  return () => {
    ws.close();
    socketRef.current = null;
  };
}, [url]);
```

## 메시지 목록 state

`onmessage`에서 **`setMessages((prev) => [...prev, incoming])`** 처럼 functional update를 쓰면 stale closure를 피하기 쉽다.

## 연결 종료·재연결

- **의도적 언마운트** — cleanup에서 `close()`.
- **네트워크 끊김** — `onclose`에서 지수 백오프로 재연결, 최대 시도 횟수 제한.
- **중복 연결** 방지: 재연결 전 이전 소켓 정리.

## 채팅 UI

- **메시지 리스트** 스크롤: 새 메시지 시 `scrollIntoView` 또는 ref.
- **입력 + 전송**: 전송 중 플래그, 빈 문자열 차단.
- **낙관적 업데이트**(선택): 먼저 로컬에 그리고 실패 시 롤백.

## 이 프로젝트 참고

`useChatWebSocket`, `AdminChatPage`, 채팅 타입 정의 파일을 읽으며 **메시지 타입**과 **상태 흐름**을 맞춰 본다.

## 요약

- WebSocket은 **지속 연결 + push**에 적합하다.
- 인스턴스는 **`useRef` + `useEffect`**, 정리는 **cleanup**.
- 메시지는 **state 배열**로 쌓고 functional update를 활용한다.
- **재연결·중복 방지**를 설계에 포함한다.

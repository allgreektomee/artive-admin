# reactTestProject (JavaScript, 아트워크 위주)

`src/etc`와 같은 **폴더 역할**(`api`, `hooks`, `components/artwork`, `chat`)을 두고, **작품(아트워크) CRUD·이미지 업로드·DnD 정렬**에 쓰는 코드만 JavaScript로 옮긴 참고 트리입니다.

## 포함 범위

| 경로 | 설명 |
|------|------|
| `api/client.js` | axios 인스턴스, Bearer, 401 처리 |
| `api/commonApi.js` | `/images/upload` (썸네일·갤러리 업로드) |
| `api/artworkApi.js` | `/artworks` CRUD |
| `hooks/useArtwork.js` | 목록·상세·저장·삭제 (등 타입스크립트 훅 JS 포트) |
| `hooks/useImageUpload.js` | 압축 + 업로드 |
| `components/artwork/SortableItem.js` | `@dnd-kit` 정렬 행 |
| `pages/ArtworkListPage.js` | 작품 목록 (JavaScript) |
| `pages/ArtworkDetailPage.js` | 작품 상세 (JavaScript) |
| `chat/chatWsTypes.js` · `hooks/useChatWebSocket.js` | admin 채팅과 동일 패턴 (작품과 무관, 구조 유지용) |

## 의존성

본 모노레포(artive-admin) 기준: `axios`, `antd`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `browser-image-compression`.

## 환경 변수

- API 베이스: `VITE_API_BASE_URL` (미설정 시 `https://api.artivefor.me/api/v1`)
- 채팅: `VITE_CHAT_WS_URL`, `VITE_CHAT_WS_AUTH` (`etc`와 동일)

이 디렉터리는 **단독 빌드 대상이 아니라** 복사·참조·연재용으로 두었습니다.

## 앱에서 열기 (목록·상세)

로그인 후 `accessToken`이 있으면 운영 API와 동일하게 동작합니다.

- 목록: [`/dev/react-test/artworks`](/dev/react-test/artworks)
- 상세: `/dev/react-test/artworks/:id`

**수정·삭제·새 작품 등록** 버튼은 실제 API/라우트를 호출하지 않고 `window.alert` 만 띄웁니다. (실제 코드는 주석으로 남김)

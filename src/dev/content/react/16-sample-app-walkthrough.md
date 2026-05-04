# 16장. 샘플 예제 분석 (reactTestProject)

1~15장까지는 **개념·Live 예제** 위주로 잡고, 여기서는 저장소 안의 **`src/dev/reactTestProject`** 한 덩어리를 **어떻게 돌아가는지** 파일 단위로 정리한다. 아래 본문을 읽은 뒤, 화면 하단의 **파일 트리**에서 같은 경로를 눌러 **원문 전체**를 열어 보면 된다.

## 이 샘플이 하는 일

- **라우팅**: 목록 `/dev/react-test/artworks`, 상세 `/dev/react-test/artworks/:id` (`App.jsx`).
- **데이터**: `hooks/useArtwork.js` 가 목록·상세·저장·삭제 요청을 묶는다(일부 버튼은 안내용 `alert`).
- **HTTP**: `api/client.js` 인스턴스 + `api/artworkApi.js`, `api/commonApi.js` 에 함수만 모은다.
- **UI**: 목록·상세는 `pages/` JSX, 정렬 행은 `components/artwork/SortableItem.jsx` (`@dnd-kit`).
- **이미지**: `hooks/useImageUpload.js` 에서 압축 후 업로드.

모노레포 실제 진입은 `src/App.tsx` 에 같은 경로가 붙어 있다. 이 폴더만 복사해 쓸 때는 루트의 `App.jsx` 가 그 역할이다.

## 읽는 순서 제안

1. `App.jsx` — 경로와 어떤 페이지가 붙는지.
2. `pages/ArtworkListPage.jsx` → `pages/ArtworkDetailPage.jsx` — 화면·이벤트·state.
3. `hooks/useArtwork.js` — API 호출 시점·`useEffect`·반환 값.
4. `api/client.js` → `api/artworkApi.js` — 요청이 어떻게 만들어지는지.
5. `hooks/useImageUpload.js`, `components/artwork/SortableItem.jsx` — 업로드·정렬.
6. `types/artwork.js`, `README.md` — 필드 모양·폴더 규칙.

## 본문 아래: 전체 소스 보기

화면 **맨 아래**에 폴더 트리와 구문 강조된 원문 뷰가 붙는다. 트리에서 파일을 고르면 **한 번에 한 파일**만 펼쳐 본다.

**데모**: [`/dev/react-test/artworks`](/dev/react-test/artworks)

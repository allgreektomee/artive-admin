# 14장. 이미지 업로드와 정렬

관리자에서 **다중 이미지**를 올리고 **순서**를 정해 저장하는 흐름은 흔하다. 브라우저는 **file input**과 **Blob URL**로 미리보기를 만들고, 서버는 **multipart** 또는 별도 업로드 API를 둔다.

## file input

```jsx
<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
    const files = Array.from(e.target.files ?? []);
    // 처리
  }}
/>
```

보안상 **경로 문자열**이 아니라 **`File` 객체**만 얻는다.

## 미리보기 URL

`URL.createObjectURL(file)`로 **임시 blob URL**을 만들고 `<img src={url} />`에 쓴다. 목록에서 항목을 제거할 때 **`URL.revokeObjectURL(url)`** 로 메모리를 돌려줘야 한다. 리스트가 길면 누수에 주의.

## `FormData` 업로드

서버가 기대하는 필드명에 맞춰 `append` 후 `POST`. 진행률은 `axios` onUploadProgress 또는 `XMLHttpRequest`로 확장할 수 있다.

## 업로드 결과를 state에

- **임시 id** 또는 **서버가 준 fileId/url**을 배열 state로 관리.
- **순서**는 배열 순서 그대로를 payload에 실어 “대표 이미지는 첫 번째” 같은 규칙을 백엔드와 맞춘다.

## 이미지 삭제

- 아직 서버에 없는 미리보기만이면 state에서 제거 + `revokeObjectURL`.
- 이미 업로드된 파일이면 **삭제 API** 호출 여부는 백엔드 계약에 따른다.

## 드래그 앤 드롭 정렬

이 프로젝트는 **`@dnd-kit`** 계열로 순서를 바꾼다. 핵심은:

- **SortableContext**와 각 아이템의 **useSortable**,
- 드래그 종료 시 **배열 순서를 바꾼 새 배열**로 `setState`.

구체 API는 라이브러리 문서와 `SortableItem` 컴포넌트를 참고한다.

## 저장 payload

등록·수정 API에 **`imageIds: string[]`** 또는 `images: [{ id, order }]` 형태로 넣는다. **클라이언트에서 정한 순서**가 곧 비즈니스 규칙이므로 서버와 스키마를 명확히 한다.

## 요약

- **File → Blob URL** 미리보기, 끝나면 **revoke**.
- 업로드는 **FormData** 또는 전용 엔드포인트.
- **순서는 state 배열**로 관리하고 DnD로 재배열.
- 최종 저장 시 **순서가 포함된 payload**를 보낸다.

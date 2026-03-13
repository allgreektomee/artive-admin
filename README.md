# Artive Admin Client Architecture

이 프로젝트는 **MVVM + Clean Architecture (Layered Architecture)** 패턴을 따릅니다.
유지보수성과 확장성을 위해 각 계층(Layer)의 역할이 엄격히 분리되어 있으며, **폴더명 앞의 번호 순서**는 의존성의 방향과 작업 흐름을 나타냅니다.

## 📂 폴더 구조 및 역할 (Directory Structure)

### `00.core/` (시스템 기반)

> **역할**: 프로젝트 전체를 지탱하는 뼈대이자, 기술적인 설정이 모인 곳입니다.
> **하위 폴더**:
>
> - `di/`: 의존성 주입(Dependency Injection) 컨테이너 (`ServiceLocator.ts`)
> - `api/`: Axios/Fetch 인스턴스 설정 및 인터셉터
> - `utils/`: 전역 공통 유틸리티 (Keychain, Formatter 등)

### `01.domain/` (핵심 비즈니스 로직)

> **역할**: "무엇을 할 것인가"를 정의하는 곳. 외부 기술(React, API 등)에 의존하지 않는 **가장 순수한 영역**입니다.
> **하위 폴더**:
>
> - `models/`: 데이터 객체 타입 정의 (Interface, Type)
> - `repositories/`: 데이터 저장소 인터페이스 (Interface only)
>   **⚠️ 규칙**: 이곳에는 절대 API 호출 코드나 UI 관련 코드가 포함되면 안 됩니다.

### `02.data/` (데이터 구현체)

> **역할**: "어떻게 가져올 것인가"를 구현하는 곳. 실제 백엔드(WordPress, Spring)와 통신합니다.
> **하위 폴더**:
>
> - `api/`: 실제 외부 API 호출 함수 (Endpoint 정의)
> - `mappers/`: API 응답(Raw Data)을 깨끗한 Domain Model로 변환하는 변역기
> - `repositories/`: Domain의 Repository 인터페이스를 실제로 구현한 클래스 (Implementation)

### `03.presentation/` (화면 및 UI)

> **역할**: "어떻게 보여줄 것인가"를 담당하는 곳. 사용자와 직접 상호작용합니다.
> **하위 폴더**:
>
> - `hooks/`: **ViewModel** 역할. 비즈니스 로직을 수행하고 상태(Loading, Error)를 관리
> - `pages/`: 라우팅되는 페이지 단위 컴포넌트 (**View**)
> - `components/`: 재사용 가능한 UI 컴포넌트
> - `styles/`: 스타일 시트

---

## 🚀 새로운 기능 추가 가이드 (Workflow)

예를 들어 **'전시회(Exhibition)'** 기능을 새로 만든다면, 아래 **폴더 번호 순서대로** 작업하세요.

### 1단계: [01.domain] 설계하기

가장 먼저 데이터의 형태와 기능을 정의합니다.

- `models/Exhibition.ts`: 전시회 데이터 모델(타입) 정의
- `repositories/IExhibitionRepository.ts`: "전시회 목록을 가져온다"는 인터페이스 정의

### 2단계: [02.data] 구현하기

설계도에 맞춰 데이터를 가져오는 코드를 짭니다.

- `api/exhibitionApi.ts`: 서버 API 호출 함수 작성
- `mappers/ExhibitionMapper.ts`: 지저분한 서버 데이터를 깔끔한 모델로 변환
- `repositories/ExhibitionRepositoryImpl.ts`: 인터페이스를 구현하고 매퍼 연결

### 3단계: [00.core] 연결하기

만들어진 구현체를 시스템에 등록합니다.

- `di/ServiceLocator.ts`: `ExhibitionRepositoryImpl` 등록

### 4단계: [03.presentation] 화면 그리기

데이터를 받아와서 화면에 뿌려줍니다.

- `hooks/useExhibitionVM.ts`: 데이터를 가져오는 훅(ViewModel) 작성
- `pages/ExhibitionPage.tsx`: UI 컴포넌트 작성 및 Hook 연결

---

## ⚠️ 아키텍처 원칙 (Rules)

1. **의존성 방향**: `03.presentation` -> `01.domain` <- `02.data`
   - Presentation과 Data는 서로를 몰라야 하며, 둘 다 **Domain**을 바라봐야 합니다.
2. **순수성**: `01.domain`에는 `react`, `axios` 같은 라이브러리를 import 하지 않습니다.
3. **교체 용이성**: 나중에 `02.data`의 백엔드가 바뀌어도, `01.domain`과 `03.presentation`은 수정할 필요가 없어야 합니다.

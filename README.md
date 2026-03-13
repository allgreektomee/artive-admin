# 🎨 Artive Archive (Systematic Architecture)

아티스트의 서사를 기록하고 관리하는 **시스템 아카이브** 프로젝트입니다.
기존의 감각적인 매거진 레이아웃을 보존하면서, 향후 다국어 확장 및 백엔드 이관을 위해 **클린 아키텍처(MVVM)**를 도입하여 재구축 중입니다.

## 🏗️ Architecture Design

본 프로젝트는 데이터 소스의 변화에 유연하게 대응하기 위해 4개의 핵심 계층으로 분리되어 있습니다.

### 1. Domain Layer (`src/domain`)

- **역할**: 서비스의 가장 순수한 비즈니스 규칙 및 데이터 규격 정의.
- **주요 파일**:
  - `BaseEntry.ts`: 모든 기록물(Artwork, Insight, Log)의 최상위 추상 모델.
  - `IBaseRepository.ts`: 데이터 접근 행위를 정의한 인터페이스.

### 2. Data Layer (`src/data`)

- **역할**: 외부 API(WordPress, Spring Boot)와 통신 및 데이터 가공.
- **주요 파일**:
  - `BaseRepositoryImpl.ts`: 실제 API 호출 및 도메인 모델로의 매핑(Mapper) 수행.

### 3. Core Layer (`src/core`)

- **역할**: 앱 전체의 인프라 및 의존성 주입(DI) 관리.
- **주요 파일**:
  - `di/ServiceLocator.ts`: 리포지토리 인스턴스를 싱글톤으로 관리 및 주입.
  - `utils/LanguageManager.ts`: Keychain 방식의 다국어 설정 관리.

### 4. Presentation Layer (`src/presentation`)

- **역할**: 사용자 인터페이스(UI) 및 뷰 상태 관리.
- **주요 파일**:
  - `hooks/useBaseVM.ts`: 비즈니스 로직을 담당하는 ViewModel (Custom Hook).
  - `pages/`: 실제 렌더링을 담당하는 View (기존 MagazineHome 포함).

---

## 📔 Architecture Log (작업 일지)

### [2026-03-13] 프로젝트 구조 설계 및 Base 모델 도입

- **추상화 작업**: `Artwork`, `Insight`, `Log` 섹션의 공통 필드를 추출하여 `BaseEntry`로 통합.
- **인프라 구축**: `ServiceLocator`를 통한 의존성 주입 구조 완성.
- **데이터 연동**: WordPress API 연동을 위한 Repository 구현체 작성.

---

## 🌐 Roadmap

- [x] Base 추상화 모델 설계 (Artwork, Insight, Log 통합)
- [x] 계층별 폴더 구조 생성 및 이관
- [ ] Keychain 기반 다국어 처리 구현 (KO, EN)
- [ ] 상세 페이지(History Detail) 아키텍처 적용
- [ ] Spring Boot 백엔드 데이터 마이그레이션

---

© 2026 Artive for me. All rights reserved.

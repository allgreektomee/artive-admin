# Artive 풀스택 JIT 커리큘럼 목차

Artive 로드맵(Spring Boot · Next.js · 모바일 · 64GB 서버)을 **레벨 → 장 → 절**로 익히기 위한 진행 순서다.  
책(스프링 부트 4 입문~블로그~배포)과 병행할 때는 타임리프(서버 렌더링) 대신 **Next.js(App Router)** 로 공개면을 치환하면 된다.

---

## [레벨 0] 도구·환경·흐름 잡기

### 00장 개발 환경·저장소

- _0.1_ JDK / IDE / Gradle(또는 Maven) · 프로젝트 뼈대
- _0.2_ Git · 브랜치 · 커밋 단위 (Artive 레포 전략)
- _0.3_ Postman·HTTPie · 로컬 DB(PostgreSQL) · Docker(선택)
- _0.4_ “이번 주 Artifact” 정의하기 (예: 백엔드 JAR 로컬 실행까지)

---

## [레벨 1] Spring Boot 백엔드 입문 → `artive-backend-core`

### 01장 백엔드가 하는 일 (짧게)

- _1.1_ 서버·클라이언트 · HTTP · JSON
- _1.2_ RDB · SQL vs JPA가 해주는 일
- _1.3_ 스프링 개념: IoC/DI, 빈, AOP(필요할 때만)

### 02장 Spring Boot 4 프로젝트 뼈대

- _2.1_ 부트 스타터 · 자동구성 · 실행까지
- _2.2_ 패키지 구조: presentation · service · persistence
- _2.3_ 요청→응답 한 사이클 추적하기

### 03장 테스트 습관

- _3.1_ JUnit 기본 · `@SpringBootTest` · MockMvc 맛보기

### 04장 JPA로 도메인 붙이기 (Artive 스키마로 연결)

- _4.1_ 엔티티 · 리포지토리 · N+1 인지하기
- _4.2_ (선택) QueryDSL · 복잡 조회는 다음 단계로 미루기

**▸ 레벨 1 결과물 (Artifact)**  
`artive-backend-core` — DB 연결, 핵심 엔티티·리포지토리, 기본 API 스켈레톤

---

## [레벨 2] REST API + 블로그/CMS 도메인 → `artive-backend-api`

### 05장 REST 설계 · 글(Article) CRUD

- _5.1_ 리소스·상태코드·DTO
- _5.2_ 생성·목록·단건·수정·삭제 API
- _5.3_ 테스트로 API 고정하기

### 06장 인증·인가 (세션 또는 JWT 중 하나 먼저)

- _6.1_ Spring Security 개요
- _6.2_ 회원(또는 관리자) 도메인 최소 버전
- _6.3_ JWT(실서비스·모바일·Next 연동에 맞으면 여기서 고정)

### 07장 배치·스케줄·외부 입력

- _7.1_ Spring Batch 또는 `@Scheduled` 맛보기
- _7.2_ 이후 n8n Webhook을 받을 엔드포인트만 자리 설계

**▸ 레벨 2 결과물 (Artifact)**  
`artive-backend-api` — CMS용 CRUD + 인증 + (선택) 배치 한 덩어리

---

## [레벨 3] 외부·AI 연동 → `artive-backend-integration`

### 08장 HTTP 클라이언트 · Webhook

- _8.1_ WebClient / RestClient
- _8.2_ n8n → Spring Webhook 수신 · 멱등성·재시도 생각하기

### 09장 LLM·이미지 파이프 (로컬 우선)

- _9.1_ Ollama 연동(텍스트 요약·태그 등)
- _9.2_ (선택) Spring AI 또는 직접 HTTP — 교재 Spring AI 장과 병행 가능

**▸ 레벨 3 결과물 (Artifact)**  
`artive-backend-integration` — Ollama·Comfy 연결 모듈 + Webhook

---

## [레벨 4] Next.js(React) 프론트 레이어

### 10장 Next.js App Router · 레이아웃

- _10.1_ Server vs Client Component 경계
- _10.2_ 라우트: 공개 글 목록·상세 · (관리자는 추후)

### 11장 백엔드와 통신

- _11.1_ TanStack Query · 에러·재시도
- _11.2_ JWT 보관(메모리/쿠키 전략) · API 클라이언트 한 곳에 모으기

### 12장 SEO·메타 (공개 블로그면)

- _12.1_ metadata · OG · sitemap은 이후 스프린트

**▸ 레벨 4 결과물 (Artifact)**  
`artive-web-app` → `artive-web-data` (기본 UI·하이브리드·데이터 연동까지 로드맵과 동일 축)

### (선택) 하이브리드 전용 장

- Deep Link · Universal Link · 모바일 WebView와 맞추는 라우팅

---

## [레벨 5] 모바일 + 하이브리드 (필요 시)

### 13장 iOS(SwiftUI) / Android(Compose) 최소 기능

- _13.1_ 탭 · WebView로 Artive 웹 로드
- _13.2_ Bridge · 딥링크 · 세션 공유

**▸ 결과물 (Artifact)**  
`Artive-iOS` / `Artive-Android` + 브릿지

---

## [레벨 6] 배포·운영 → 64GB 서버

### 14장 Docker · Compose

- _14.1_ 백엔드·DB·(프론트) 컨테이너

### 15장 CI/CD

- _15.1_ GitHub Actions 또는 Jenkins(사내 가이드와 통합)
- _15.2_ 클라우드(AWS EB 등)는 옵션; 본진이 self-hosted면 Compose 배포로 치환

### 16장 관측

- _16.1_ 헬스체크 · 로그 · (선택) Prometheus/Grafana

**▸ 결과물 (Artifact)**  
`artive-docker-compose` + workflow + 모니터링 초안

---

## CMS·테크블로그에 쓰는 메타 목차 (시리즈)

| 항목 | 예시 |
| :--- | :--- |
| 시리즈명 | `Artive 구축기` |
| 태그 | `level-1-backend`, `level-2-api`, `nextjs`, `devops` |
| 매 글 말미 | **Artifact 이름** + 다음 장 한 줄 예고 |

---

## 책 목차와의 대략적인 대응

| 이 문서 | 교재 축 |
| :--- | :--- |
| 레벨 0~1 | 00~05장 (환경·개념·부트·구조·테스트·ORM) |
| 레벨 2 | 06~07·09~10장 (블로그 API·화면·시큐리티·JWT·OAuth) — **07장 타임리프는 Next로 대체** |
| 레벨 3 | 08장 Spring AI 등 (선택·병행) |
| 레벨 6 | 12~13장 AWS·GitHub Actions (배포 대상만 환경에 맞게) |

---

## 1차 스코프 제안

처음에는 **레벨 0~4**만 끝내고, **레벨 5(모바일)·레벨 6(운영)** 은 2차 스프린트로 미루면 부담이 줄어든다.

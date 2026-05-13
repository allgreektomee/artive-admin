# Redis Enterprise 설치·설정 참고

RHEL 9.x · 폐쇄망 환경 기준으로 진행한 **Redis Enterprise Software(RES)** 설치·초기 설정 내용을 정리한 문서다.  
배포물 예: `redislabs-7.22.2-116-rhel9-x86_64` (ZIP → `install.sh`).

### 이 문서에서 쓰는 **예시 포트** (명령어·방화벽 설명 통일)

| 역할 | 예시 포트 | 비고 |
| :--- | :--- | :--- |
| **관리 웹 UI (HTTPS)** | **1111** | 제품 기본은 보통 **8443** 등. 사내에서 리버스 프록시·방화벽으로 **1111** 만 열었다면 `https://호스트:1111` 형태로 대입. |
| **앱·WAS → Redis DB 엔드포인트** | **2222** | UI에서 생성한 DB의 포트; 제품은 자주 **10000~19999** 대역. 여기서는 설명용으로 **2222** 로 통일. |

**실 서버**에서는 `ss`·Redis UI에 나온 **실제 번호**를 쓰면 된다.

---

## 1. 용도·전제

- **용도**: 세션·캐시 위주. 당장 **멀티 노드 클러스터 HA** 는 하지 않음.
- **제품**: Redis **Enterprise** (OSS 단독과 다름). **라이선스/평가 기간** 정책은 Redis 측 안내에 따름.
- **OS**: **RHEL 9 계열 x86_64** 전용 배포물을 사용한다. Ubuntu 등과 혼동하지 않는다.

---

## 2. 세션·캐시만일 때의 선택

- **단일 노드**로 시작해도 됨. UI에서 클러스터를 만든다는 표현은 “노드 1개짜리”로 두는 경우가 많음.
- 애플리케이션은 관리 포트가 아니라 **UI에서 만든 Redis DB의 엔드포인트**(호스트 + 포트 + 비밀번호)로 연결한다.
- 세션·캐시만이면 특수 모듈 없이 일반 Redis DB로 시작 가능.

---

## 3. 압축 해제 및 설치 명령 (ZIP)

```bash
sudo dnf install -y unzip   # 필요 시

mkdir -p /opt/redis-install
unzip "받은파일이름.zip" -d /opt/redis-install

cd /opt/redis-install/redislabs-7.22.2-116-rhel9-x86_64   # 실제 풀린 경로에 맞게
chmod +x install.sh

# 질문에 하나씩 응답
sudo ./install.sh

# 확인 질문 자동 승인(무인에 가깝게)
sudo ./install.sh -y

# 답변 파일 사용 시 (제품 가이드에 맞춤)
sudo ./install.sh -y -c /path/to/answer-file
```

설치 로그 예시 위치: `/tmp/install.log`

---

## 4. systemd·동작 확인

서비스 유닛 이름은 환경에 따라 `redislabs` 가 아닐 수 있음. 아래로 찾은 뒤 `status` 를 본다.

```bash
systemctl list-units --type=service | grep -i redis
sudo systemctl status '<확인한유닛이름>' --no-pager
```

성공 시 `active (running)` 이어야 한다.

추가 점검:

```bash
sudo tail -80 /tmp/install.log
journalctl -xe --no-pager | tail -80
journalctl -u '<유닛이름>' -n 120 --no-pager
```

리스너 확인 (관리 HTTPS·DB 엔드포인트 후보):

```bash
# 예시 포트(1111 관리, 2222 DB) + 제품 기본 후보도 함께 볼 때
sudo ss -lntp | grep -E '1111|2222|8443|9443|redis|1000'
```

---

## 5. 포트 개념

| 구분 | 설명 (예시 포트: **1111** / **2222**) |
| :--- | :--- |
| **관리 웹 UI** | **`https://<호스트>:1111`** (예시). 제품 기본은 흔히 **8443**; 사내는 프록시 후 **1111** 일 수 있음. |
| **`0.0.0.0:1111`** | 관리 UI가 모든 인터페이스에서 **1111** 로 떠 있다면 외부 접속 전제는 충족. 방화벽·라우팅은 별도. |
| **앱(WAS 등) → Redis DB** | **`호스트:2222`** (예시). UI에서 부여한 엔드포인트; **관리 포트(1111)와 다름.** 실제는 **10000~19999** 등 UI 표기를 따른다. |
| **`:53`** | DNS. Redis 앱 포트와 무관한 경우가 많음. `ss`/`lsof`로 실제 프로세스 확인. |

**HTTP로 관리 포트(예: 1111)에 접속하면** HTTPS 전용이면 `empty reply` 등이 날 수 있음. 브라우저·`curl` 은 **`https://`** 사용.

---

## 6. 관리 UI 접속 트러블슈팅

서버 **로컬**에서 확인 (예시 **관리 포트 1111**):

```bash
curl -vk --http1.1 --connect-timeout 5 https://127.0.0.1:1111/ 2>&1 | head -40
openssl s_client -connect 127.0.0.1:1111 -servername 127.0.0.1 </dev/null 2>&1 | head -40
```

- 서버에서는 되는데 PC에서 안 되면: **방화벽(호스트·중간 장비)·사내 보안 정책**.
- 초기 부팅 직후에는 응답이 늦거나 불안정할 수 있어, 잠시 후 **`https://<서버IP>:1111`** 재시도.

RHEL **`firewalld`** 예시 (예시 포트 기준):

```bash
sudo firewall-cmd --list-all
sudo firewall-cmd --permanent --add-port=1111/tcp   # 관리 UI(HTTPS 예시)
sudo firewall-cmd --permanent --add-port=2222/tcp   # 앱 Redis DB 엔드포인트(예시)
sudo firewall-cmd --reload
```

실제 포트가 8443·10001 등이면 위 숫자만 **관리/UI·DB에 표시된 값**으로 바꾼다.

앱 서버에서 Redis DB까지 붙이려면 **2222**(또는 UI의 실제 DB 포트)도 WAS 쪽 방화벽에서 허용한다.

DB 생성 후 연결 확인 예 (포트 **2222**, 비밀번호·TLS 여부는 환경에 맞게):

```bash
redis-cli -h 127.0.0.1 -p 2222 ping
```

---

## 7. 9090 포트만 열렸을 때 오해 금지

문서 다른 부분에서 **9090** 은 종종 **Jenkins HTTP** 예시로 쓰이며, Redis Enterprise 가 자동으로 “데이터까지 9090” 으로 바꿔 주지 않는다.

바깥에서 **오직 9090만 허용**이라면 Redis 매니저(내부 8443·또는 **1111**)나 DB(**2222** 등)까지 쓰려면 **리버스 프록시**(예: `nginx` 로 `9090` → 내부 **`https://127.0.0.1:1111`** 또는 DB **2222**) 같은 **별도 네트워크 설계**가 필요하다.

---

## 8. 초기 마법사·DB 생성 메모

- **Create cluster**: 제품 초기 설정 단계로 이해하면 됨. 외부에 열려 있는 포트 번호와 1:1로 바뀌는 옵션은 아니다.
- **라이선스**: 평가/한시적 정책에 따름. 진행 순서는 제품/UI 안내 우선.
- **Enable public endpoint support**: 클러스터 **바깥(공인망·다른 존 LB 등)** 에서 접속 경로까지 쓰는 시나리오에 가깝다. 사내 WAS만 사설망으로 붙일 거면 보통 **끄거나 보수적으로 두는 편**.
- **FQDN**: Fully Qualified Domain Name. 예 `redis01.도메인.회사.co.kr` 같은 **풀 도메인**. 인증서·클러스터 이름에 맞게 사내 명명 규칙을 적는다.
- **DB 생성 (싱글 머신·세션·캐시)**  
  - **single-region** 선택, **멀티 리전 Active-Active 는 당분간 미선택.**  
  - **샤드 1개**로 시작 가능. 노드 한 대면 **replica 불가 또는 0** 인 경우가 일반적.  
  - 생성 후 노출되는 **엔드포인트**(호스트·포트·계정). 본 문서 예시에서는 앱 연결 **`호스트:2222`** 로 생각하면 됨 · Spring/WAS `spring.data.redis` 등에 반영.

---

## 9. root `umask 0027`

root 로 로그인 시 `umask 0027` 로 보일 수 있다. RHEL 계열에서 흔한 **보안 기본값**(새 파일·디렉터리의 other 접근 최소화)이며 설치 성공 여부와 직결되지 않는 경우가 많다.

---

## 10. 참고 경로·연계

- 회사 폴더에 둔 설치 패키지 예시: `[EOS 서버설정]/redislabs-7.22.2-116-rhel9-x86_64/`
- 본 레포 내 CI 요약과 병행할 때: 같은 망에서는 **실제 허용 포트·방화벽 정책**을 우선한다.

---



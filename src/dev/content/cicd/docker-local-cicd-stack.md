# Docker 로컬 CI/CD 스택 (GitLab · Jenkins · Nexus)

Mac 등 로컬에 **Docker Desktop**과 `docker compose`로 GitLab CE, Jenkins LTS, Nexus 3를 띄워 두고, 서로 연동해 보는 절차를 정리합니다. 실제 비밀번호·토큰·초기 비밀번호는 **문서에 적지 말고** 비밀관리 도구나 로컬 전용 메모에만 보관하세요. 이 저장소에는 자리표시자만 둡니다.

**Docker Desktop만 설치해 두는 것과 별개로, GitLab·Jenkins·Nexus는 자동으로 깔리지 않습니다.** Docker는 컨테이너 실행 **엔진**만 제공합니다. 세 서비스는 **`docker-compose.yml`에 정의한 뒤 `docker compose up`**(또는 서비스마다 `docker run`)으로 이미지를 받아 올려야 처음 생깁니다. 절차는 **§1은 Docker만**, **§2부터 세 컨테이너 정의·기동**입니다.

## 0. 구성 요약

| 서비스 | 대표 이미지 | 호스트에서 접근 예 (compose 기본 가정) |
|--------|------------|----------------------------------------|
| GitLab CE | `gitlab/gitlab-ce` | HTTP `http://localhost` (컨테이너 80 매핑), SSH `localhost:2222` |
| Jenkins LTS | `jenkins/jenkins:lts` | UI `http://localhost:8080`, 에이전트 `50000` |
| Nexus 3 | `sonatype/nexus3` | UI `http://localhost:8081` |

Docker Desktop **Containers** 화면에서는 같은 프로젝트 아래 `gitlab`, `jenkins`, `nexus3`가 함께 보이는 형태가 일반적입니다.

## 1. 사전 준비: Docker Desktop 설치 (Mac 기준)

1. [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) 에서 **Apple Silicon / Intel**에 맞는 설치 패키지를 받습니다.
2. `Docker.dmg`를 열고 **응용 프로그램** 폴더로 드래그해 넣습니다.
3. **응용 프로그램**에서 Docker를 실행하고, 안내에 따라 권한·약관을 완료합니다. 메뉴 막대에 고래 아이콘이 떠 있고 **Docker Desktop is running** 상태여야 합니다.
4. 터미널에서 CLI가 보이는지 확인합니다.

```bash
docker version
docker compose version
```

5. **리소스**(Settings → Resources): GitLab CE는 메모리를 많이 씁니다. 가능하면 **RAM 6~8GB 이상**을 Docker에 할당해 두는 것을 권장합니다.

여기까지 끝나면 **GitLab·Jenkins·Nexus 컨테이너는 아직 없습니다.** `docker ps`에 아무것도 안 보이거나 Docker 기본 시스템만 있는 것이 정상입니다. 다음 **§2**에서 compose 파일을 두고 `docker compose up` 할 때 비로소 세 서비스가 **내려받기·생성**됩니다.

## 2. GitLab · Jenkins · Nexus를 docker compose로 설치

같은 Docker **네트워크**에 세 서비스를 두면 컨테이너끼리 `gitlab`, `jenkins`, `nexus3` 같은 **서비스 이름**으로 통신할 수 있습니다. 네트워크 이름은 보통 **`<compose 프로젝트명>_cicd`** 이고, 프로젝트명은 기본값이 **compose 파일이 있는 폴더 이름**입니다(예: `~/docker-cicd` → `docker-cicd_cicd`).

### 2.0 설치 순서 (처음부터 끝까지)

**한 줄 요약:** 폴더를 만든 뒤 **`docker-compose.yml`을 만들고**, 아래 **「docker-compose.yml 파일 만들기」→「넣어야 할 내용」**에 있는 **YAML 전체를 파일에 복사**해 저장한다 → **같은 폴더에서** `docker compose pull` / `docker compose up -d` 로 이미지를 받고 컨테이너를 띄운다. (`pull` 은 생략하고 `up -d` 만 해도 됩니다.)

1. **폴더를 만들고 그 안으로 이동**합니다. (이 폴더가 앞으로 “이 스택 전용” 작업 위치입니다.)
2. **그 폴더에 `docker-compose.yml` 파일을 새로 만듭니다.** 편집기/`touch`/`vim`/`nano` 등 방법은 **아래「docker-compose.yml 파일 만들기」** 절을 따릅니다.
3. 그 파일에 넣을 내용은 **한 가지뿐입니다.** 아래「docker-compose.yml 파일 만들기」안의 **「넣어야 할 내용」** 에 있는 **`services:`부터 `bridge`까지 YAML 전체**를 복사해 붙여 넣고 저장합니다. (들여쓰기가 깨지면 `docker compose config` 에서 에러가 납니다.)
4. YAML 안 **`services` → 각 항목의 `image:`** 가 Docker가 **어떤 이미지를 어디서 받을지**를 정합니다.
5. 터미널에서 **반드시 그 폴더로 `cd` 한 뒤** `docker compose` 명령을 칩니다.  
   - 다른 디렉터리에 있다면 compose는 **엉뚱한 위치의 파일을 찾거나 “파일 없음”**이 날 수 있습니다.
6. **`docker compose pull`**(선택)과 **`docker compose up -d`** 가 실제 **설치(이미지 다운로드 + 컨테이너 생성·기동)** 입니다. `up -d` 만 실행해도 없는 이미지는 그때 받습니다.

```bash
mkdir -p ~/docker-cicd
cd ~/docker-cicd

# 「docker-compose.yml 파일 만들기」에서 YAML 저장까지 한 뒤
ls -la docker-compose.yml

# (선택) 문법·경로 확인 — 에러 없어야 함
docker compose config

# 이미지 다운로드 (docker-compose.yml의 image: 목록 기준)
docker compose pull

# 설치 마무리: 컨테이너 생성·백그라운드 기동 (네트워크·볼륨 포함)
docker compose up -d

# 확인
docker compose ps
docker ps
```

### docker-compose.yml 파일 만들기

`docker-compose.yml` 은 **일반 텍스트 파일**입니다. 이름은 정확히 **`docker-compose.yml`** (하이픈 포함, 소문자 권장) 또는 **`compose.yaml`** 이어야 합니다. Word `.docx` 나 한글 `.hwpx` 로 저장하면 안 됩니다.

**저장 위치:** 앞으로 쓸 폴더 **안**에 둡니다. 예: `~/docker-cicd/docker-compose.yml`  
경로에 한글이나 공백이 있어도 되지만, 처음에는 `~/docker-cicd` 같이 단순한 경로를 권장합니다.

#### 넣어야 할 내용 — 아래 블록을 통째로 복사해서 파일 안에만 두면 됨

**이게 곧 `docker-compose.yml`의 본문입니다.** 빈 파일이면 안 되고, **아래부터 `bridge`까지 전부**가 한 파일에 들어가면 됩니다.

- **`services:`** — 세 덩어리: **`gitlab`**, **`jenkins`**, **`nexus3`** (이 이름이 컨테이너끼리 부르는 호스트명).
- **`image:`** — 각각 Docker Hub에서 받을 이미지.
- **`ports:`** — **맥(호스트) 포트:컨테이너 포트**. 예: `"8080:8080"` 이면 브라우저 `http://localhost:8080` 이 Jenkins.
- **`volumes:`** / **`networks:`** — 데이터 보존용 볼륨, 세 서비스가 같이 쓰는 내부 네트워크 `cicd`.

```yaml
services:
  gitlab:
    image: gitlab/gitlab-ce:latest
    container_name: gitlab
    hostname: gitlab
    shm_size: "256m"
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://localhost'
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
    ports:
      - "80:80"
      - "443:443"
      - "2222:22"
    volumes:
      - gitlab_config:/etc/gitlab
      - gitlab_logs:/var/log/gitlab
      - gitlab_data:/var/opt/gitlab
    networks:
      - cicd

  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
    networks:
      - cicd

  nexus3:
    image: sonatype/nexus3:latest
    container_name: nexus3
    ports:
      - "8081:8081"
    volumes:
      - nexus_data:/nexus-data
    networks:
      - cicd

volumes:
  gitlab_config:
  gitlab_logs:
  gitlab_data:
  jenkins_home:
  nexus_data:

networks:
  cicd:
    driver: bridge
```

위를 저장한 뒤 **같은 폴더에서** `docker compose config` → `docker compose up -d` 를 실행합니다.


새 파일을 열고 **위 YAML 전체**를 붙여 넣은 뒤 저장(Cmd+S)합니다.

**방법 B — 터미널에서 vim**

```bash
cd ~/docker-cicd
vim docker-compose.yml
```

- `i` 로 입력 모드 → **위 YAML 전체** 붙여 넣기 → `Esc` → `:wq` Enter

**방법 C — 터미널에서 nano**

```bash
cd ~/docker-cicd
nano docker-compose.yml
```

- **위 YAML 전체** 붙여 넣기 → **Ctrl+O**, Enter → **Ctrl+X**

**방법 D — 빈 파일만 먼저 만들기**

```bash
mkdir -p ~/docker-cicd
cd ~/docker-cicd
touch docker-compose.yml
open -e docker-compose.yml
```

**포맷 → 일반 텍스트 만들기**로 두고, **위 YAML 전체**를 넣고 저장합니다.

**만든 뒤 확인**

```bash
ls -la ~/docker-cicd/docker-compose.yml
head -n 8 ~/docker-cicd/docker-compose.yml
```

첫 줄이 `services:` 여야 합니다.

**이제 설치(compose 명령):** **파일을 저장한 상태에서** 같은 디렉터리에서:

```bash
cd ~/docker-cicd
docker compose config
docker compose pull
docker compose up -d
```

이것이 **“compose로 GitLab·Jenkins·Nexus 설치(컨테이너 기동)”** 입니다.

### 2.1 `pull` / `up`은 “GitLab Git”이 아니라 “Docker 이미지”를 받는다

`docker compose pull` / `up` 은 **소스 Git 저장소**가 아니라, `docker-compose.yml` 안의 **`image:`** 에 적힌 이름으로 **Docker 이미지**를 내려받습니다.

- `docker compose`는 **현재 디렉터리의 `docker-compose.yml`**을 열고, 그 안의 **`image: 저장소이름/이미지이름:태그`** 를 읽습니다.
- `저장소이름/` 앞에 **레지스트리 주소가 없으면** 기본으로 **Docker Hub** (`docker.io`)에서 받습니다.
- 예: `image: gitlab/gitlab-ce:latest` → Docker Hub의 **`gitlab/gitlab-ce`** 이미지, 태그 `latest`  
  브라우저에서 확인: `https://hub.docker.com/r/gitlab/gitlab-ce`

이 문서 예시 기준으로 대응 관계는 다음과 같습니다.

| `docker-compose.yml` 안 `image:` | 보통 내려받는 위치 (Docker Hub) |
|-----------------------------------|----------------------------------|
| `gitlab/gitlab-ce:latest` | [gitlab/gitlab-ce](https://hub.docker.com/r/gitlab/gitlab-ce) |
| `jenkins/jenkins:lts` | [jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins) |
| `sonatype/nexus3:latest` | [sonatype/nexus3](https://hub.docker.com/r/sonatype/nexus3) |

회사에서 **사내 레지스트리**를 쓰면 `image:` 가 `my-registry.corp/gitlab/gitlab-ce:16.x` 처럼 **앞에 호스트가 붙습니다.** 그때는 그 주소에서 받습니다.

**파일이 다른 경로에 있을 때**는 `-f`로 위치를 지정합니다.

```bash
docker compose -f /원하는/경로/docker-compose.yml pull
docker compose -f /원하는/경로/docker-compose.yml up -d
```

### 2.2 네트워크 검증 (선택)

`docker compose up -d` 로 컨테이너가 뜬 **이후**에 보면 됩니다.

기동 후 같은 compose 네트워크에 붙었는지 보려면:

```bash
docker network ls
docker network inspect docker-cicd_cicd
```

폴더 이름이 `docker-cicd`가 아니면 `inspect` 대상 이름이 달라집니다. `docker network ls`에서 `_cicd` 로 끝나는 항목을 찾으면 됩니다.

Jenkins 컨테이너에서 GitLab·Nexus로 HTTP가 되는지 빠른 확인:

```bash
docker compose exec jenkins curl -sI --max-time 10 http://gitlab
docker compose exec jenkins curl -sI --max-time 10 http://nexus3:8081
```

### 2.3 이 설정을 손볼 때 (포트 충돌·버전)

실제로 **`docker-compose.yml`에 넣을 본문**은 위 **「docker-compose.yml 파일 만들기」→「넣어야 할 내용」** 블록 **그대로**입니다. 여기서는 자주 바꾸는 부분만 짚습니다.

- **맥에서 이미 80, 8080, 8081을 쓰는 경우**  
  해당 `ports:` 에서 **앞쪽 숫자(호스트 포트)** 만 바꿉니다. 예: Jenkins를 8088로 쓰려면 `- "8088:8080"` → 브라우저는 `http://localhost:8088`.
- **Nexus 이미지 버전 고정** (이미지가 오는 곳은 §2.1 표):

```yaml
  nexus3:
    image: sonatype/nexus3:3.54.1
```

- GitLab **첫 기동은 수 분** 걸릴 수 있습니다. `docker compose logs -f gitlab`.
- Jenkins에 **`user: root`** 가 필요하면 팀 정책에 따라 `jenkins` 서비스에 추가할 수 있으나, 기본값(non-root)을 권장합니다.

### 2.4 기동 후 추가 확인

위 **§2.0**에서 `up -d` 까지 끝냈다면, 상태만 다시 볼 수 있습니다.

```bash
cd ~/docker-cicd
docker ps
# 또는 compose 프로젝트 기준
docker compose ps
```

- `gitlab`, `jenkins`, `nexus3` 모두 **Up** 인지 확인합니다.
- `jenkins`만 오류일 때 로그:

```bash
docker compose logs -f jenkins
```

## 3. Jenkins UI 접속 불가할 때

1. **컨테이너가 살아 있는지** (`docker ps`에서 `Up`).
2. **재시작**  
   `docker compose restart jenkins`
3. **호스트 8080 충돌**  
   Mac 다른 프로세스가 8080을 쓰면 브라우저에서 열리지 않을 수 있습니다. `compose`의 **호스트 포트만** 바꿉니다.

```yaml
# 예: 호스트 8088 → 컨테이너 8080
ports:
  - "8088:8080"
```

변경 후 `docker compose up -d` 다시 하고, 브라우저는 `http://localhost:8088` 등 **바꾼 포트**로 접속합니다.

4. **최초 잠금 해제**  
   Jenkins 최초 기동 시 컨테이너 안의 `secrets/initialAdminPassword`에 있는 문자열로 잠금 해제합니다.

```bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

이후 관리자 계정을 만들면, 그 **로그인 ID/비밀번호**로 이후 접속합니다. (값은 문서/깃에 쓰지 말 것.)

## 4. GitLab 최초 접속

- 브라우저에서 `http://localhost`(매핑에 따라 다름)로 접속해 **root 비밀번호**를 설정합니다.
- SSH로 저장소를 클론할 때는 호스트에 연 `2222` 등 **매핑된 포트**를 사용합니다.

내부 URL 예 (같은 compose 네트워크의 Jenkins에서 Git HTTP로 볼 때):

```text
http://gitlab/<namespace>/<project>.git
```

실패하면 호스트 IP와 노출된 HTTP 포트로 시도해 볼 수 있습니다.

```text
http://<호_IP>:<gitlab_HTTP_호스트포트>/<namespace>/<project>.git
```

## 5. Nexus 3 최초 접속

- `http://localhost:8081` 등 매핑된 주소로 접속합니다.
- 최초 **admin 비밀번호**는 컨테이너 데이터 디렉터리의 `admin.password` 파일에 있습니다(이미지/버전에 따라 경로 문서 확인).

```bash
docker exec -it nexus3 cat /nexus-data/admin.password
```

로그인 후 비밀번호를 변경하고, Maven(`maven-public`)·npm 프록시 등은 UI에서 설정합니다.

## 6. Jenkins ↔ GitLab (Git over HTTP) 연동 순서

1. **Jenkins**에서 `Manage Jenkins` → `Credentials` → (global) → **Add Credentials**.
   - Kind: **Username with password**
   - Username: GitLab 사용자 (예: `root` 또는 본인 계정)
   - Password: 해당 계정 비밀번호 (또는 Personal Access Token을 password 칸에 넣는 방식도 가능)
   - ID: 예) `gitlab-ci-user` — Job에서 선택하기 쉬운 ID
2. **Pipeline / Freestyle Job** → **Source Code Management** → **Git**
   - Repository URL: `http://gitlab/<namespace>/<repo>.git` (동일 compose 네트워크 권장)
   - Credentials: 위에서 만든 항목 선택
3. **Multibranch / Jenkinsfile**에서 `checkout scm`을 쓰면, Job에 설정한 원격·크레덴션이 그대로 사용됩니다.
4. GitLab에서 **Webhook / CI 트리거**를 쓸 때는 Jenkins 쪽 URL이 GitLab 컨테이너에서 도달 가능한지(호스트명·포트)까지 맞춰야 합니다.

## 7. GitLab Personal Access Token (선택)

API·일부 연동에서는 **PAT**가 필요합니다. GitLab → User Settings → Access Tokens에서 발급합니다. 토큰 문자열은 **한 번만 표시**되므로 복사해 안전한 곳에만 보관합니다. Jenkins 크레덴셜에 넣을 때는 Kind/필드 선택을 팀 규칙에 맞춥니다.

## 8. 보안·운영 메모

- 채팅·스크린샷·저장소에 **실제 패스워드·PAT·Jenkins 초기 비밀번호**를 남기지 마세요. 유출 시 **즉시 회전(재발급·변경)** 합니다.
- 로컬 전용이어도 GitLab root·Jenkins admin·Nexus admin은 **강한 비밀번호**와 권한 최소화를 권장합니다.
- 운영 서버 배포용 compose·인증서·레지스트리 주소는 이 로컬 스택과 **분리**해서 관리합니다.

## 9. 자리표시자 (개인 메모용)

아래는 본인만 채우는 칸입니다. **깃에 커밋하지 마세요.**

```text
Jenkins URL:        http://localhost:<호스트포트>
Jenkins 로그인:     <ID> / <비밀번호>
GitLab URL:         http://localhost:<포트>
GitLab 로그인:      <ID> / <비밀번호>
Nexus URL:          http://localhost:<포트>
Nexus admin:        admin / <설정한 비밀번호>
GitLab PAT (참고):  <발급 시에만 보관>
```

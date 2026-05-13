# Jenkins · GitLab · Nexus 연동 요약 가이드

본 문서는 회사 내 CI 환경(RHEL 9.x, 폐쇄망) 기준으로 Jenkins 설치·운영, GitLab 연동, Nexus 개념을 한곳에 정리한 참고 자료입니다.

---

## 1. 아키텍처 역할

| 구성 요소 | 역할 |
|-----------|------|
| **GitLab** | 소스 저장소(clone/pull), 웹훅(선택). 예: HTTPS `8443`. |
| **Nexus** | Maven/Gradle 등 **의존성 라이브러리 프록시·그룹**. 예: `6515`. 필요 시 Gradle `repositories` 에 그룹 URL 적용. |
| **Jenkins** | GitLab에서 코드 받아 **빌드·테스트**(Gradle 등). HTTP 예: `9090`(방화벽 허용 포트에 맞출 것). |

- **당장 필수 순서**: GitLab ↔ Jenkins만 연결해도 빌드 가능(Maven Central 직접 허용 시 Nexus 생략 가능).

---

## 2. Jenkins 설치 요약 (WAR + JDK 21)

### 2.1 Java 버전

- 최신 LTS Jenkins는 **컨트롤러 JDK 21 이상** 요구되는 경우가 많음.
- 빌드 대상(Java 17 등)은 Job/Tool 설정으로 분리 가능.

### 2.2 디렉터리 예시 (`/app`)

```
/app/jdk21/              JDK 21 (Temurin 등)
/app/jenkins/jenkins.war
/app/jenkins_home/       JENKINS_HOME (plugins, jobs, 설정)
```

- **젠킨스 프로세스만** `jenkins` 사용자로 실행 (`root` 동시 실행 지양).

### 2.3 디렉터리 권한

- 상위 디렉터리 `/app`, `/app/jdk21` 에 **다른 사용자(jenkins)의 실행 권한(traverse)** 이 없으면 `Permission denied` 발생 → `chmod` 로 조정.

### 2.4 systemd (예시)

`/etc/systemd/system/jenkins.service`:

```ini
[Unit]
Description=Jenkins (WAR)
After=network.target

[Service]
Type=simple
User=jenkins
Environment=JENKINS_HOME=/app/jenkins_home
ExecStart=/app/jdk21/bin/java -jar /app/jenkins/jenkins.war --httpPort=9090
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now jenkins
```

### 2.5 포트·방화벽

- GitLab/Nexus만 열려 있고 Jenkins `8080` 차단되는 경우 많음 → **허용된 포트(예: 9090)** 또는 리버스 프록시 검토.
- 호스트 방화벽 예: `firewalld` 에 `9090/tcp` 허용.

---

## 3. 접속 이슈 (403, 리다이렉트, 브라우저 vs 서버)

| 증상 | 참고 조치 |
|------|-----------|
| 로컬 `curl 127.0.0.1` OK, PC만 실패 | 사내 방화벽/WAF, 포트 미개방 |
| 브라우저 리다이렉트 반복 | `jenkins.model.JenkinsLocationConfiguration.xml` 에 `jenkinsUrl` 을 **실제 접속 URL**(스킴·호스트·포트) 과 일치시키기 |
| `Fully up and running` + `updates.jenkins.io` 오류 | **업데이트 센터 실패**(폐쇄망 정상). 본체 기동과 별개로 자주 발생 |

---

## 4. 오프라인 플러그인 설치

### 4.1 업데이트 사이트

- 폐쇄망에서는 `updates.jenkins.io` 접근 불가 → **`Available`** 탭이 비어 보이는 경우 정상이 많음.
- 플러그인 설치 여부는 **`Installed`** 와 디스크 `plugins/*.jpi` 확인.

### 4.2 인터넷 PC에서 일괄 받기 (`jenkins-plugin-manager`)

- 예: `jenkins-plugin-manager-2.14.x.jar` (**`--download` 옵션 없음**. `-d` 만 지정.)
- **`--jenkins-version`** 은 서버 Jenkins 코어 버전과 동일하게.

```bash
java -jar jenkins-plugin-manager-*.jar \
  --jenkins-version 2.555.1 \
  --plugin-file plugins.txt \
  --plugin-download-directory ./out \
  --verbose
```

### 4.3 ZIP 패키징 주의 (매우 중요)

- 플러그인은 **`$JENKINS_HOME/plugins/` 바로 아래** `*.jpi` 여야 로드됨.
- **`plugins/out2/`** 같은 하위 폴더에 두면 Jenkins가 **무시**.
- Finder 압축 시 `__MACOSX` 및 중첩 폴더가 생길 수 있음 → **터미널에서 디렉터리 안 파일만 ZIP**:

```bash
cd ./out
zip -r ../plugins-flat.zip *.jpi
```

### 4.4 서버 적용

```bash
sudo systemctl stop jenkins
sudo unzip -o /tmp/plugins-flat.zip -d /app/jenkins_home/plugins/
sudo rm -rf /app/jenkins_home/plugins/__MACOSX /app/jenkins_home/plugins/out2
sudo chown jenkins:jenkins /app/jenkins_home/plugins/*.jpi
sudo systemctl start jenkins
```

### 4.5 의존 실패 로그

- `Failed Loading plugin` / `Plugin is missing:` → **`plugins.txt` 에 ID 추가** 후 재다운로드 또는 도구 재실행.

---

## 5. GitLab ↔ Jenkins 연동

### 5.1 토큰 종류

- **`Project access token`** 또는 **Personal access token**.
- **`Impersonation token`(가장 사용자용)** 은 Jenkins용 아님.

### 5.2 Jenkins Credential

- **Manage Jenkins →** (메뉴 없으면) **Pipeline Job 설정 → Git → Add**

| 항목 | 내용 |
|------|------|
| Kind | Username with password |
| Username | 시도 순서: **`oauth2`**, 또는 GitLab 가이드·토큰 발급 화면 기준 사용자명 |
| Password | 발급한 토큰 문자열 |

### 5.3 Pipeline Job (예: `backend` 레포에 `test/` 만 Gradle)

- **Pipeline script from SCM**
- Git URL: `http(s)://gitlab.../그룹/backend.git`
- Branch: `*/main` 또는 `*/master`
- **Script Path**: `test/Jenkinsfile`

### 5.4 `test/Jenkinsfile` 예시 개요

- `checkout scm`
- `dir('test') { sh './gradlew ...' }`
- 서버 JDK 경로: `JAVA_HOME`(예: `/app/jdk21`)

### 5.5 Git 레포 중첩 `.git`

- 서브폴더 **`test/` 안에 또 `.git`** 두면 상위 레포에 **내용이 안 올라감** → `test/.git` 제거 후 한 레포만 사용.

---

## 6. Nexus (Spring Boot / Gradle 관점)

### 6.1 레포 타입 의미

| 타입 | 용도 |
|------|------|
| **proxy** | Maven Central 등 외부 미러링 |
| **hosted** | 사내 배포(아티팩트 업로드) |
| **group** | 여러 레포를 **단일 URL로 묶음** → Gradle/Maven에는 보통 **이 주소만** 설정 |

NuGet/npm 등은 Java 빌드와 무관하게 같이 보일 수 있음 → **Maven group** 만 맞추면 됨.

### 6.2 Gradle 적용 시점

- 폐쇄망·정책 요구 시 `build.gradle`·`settings.gradle`(pluginManagement) 에 **그룹 URL**(및 필요 시 Credential) 추가.
- 당장 Central 직접 가능이면 **Jenkins–GitLab 연동 후**에 넣어도 됨.

---

## 7. 운영 체크리스트

- [ ] `systemctl status jenkins` / `curl -sI http://127.0.0.1:9090/login`
- [ ] `ls $JENKINS_HOME/plugins/*.jpi | wc -l`
- [ ] 브라우저 **Installed** 플러그인 확인
- [ ] GitLab **Project token** 만료·권한(`read_repository` 등)
- [ ] 필요 시 Nexust Maven **group URL** 문서화
- [ ] 로그 폐쇄망 업데이트 오류 알림 무시 또는 사내 업데이트 미러

---

## 8. 버전·경로 변수 (본인 환경에 맞게 수정)

| 항목 | 예시 값 |
|------|---------|
| GitLab | `http://10.x.x.x:8443/...` |
| Nexus | `http://...:6515/repository/<group>/` |
| Jenkins 포트 | `9090` |
| JENKINS_HOME | `/app/jenkins_home` |
| JDK | `/app/jdk21` |

---



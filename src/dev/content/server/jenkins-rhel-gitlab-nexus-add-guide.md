# GitLab·Nexus 가 깔린 서버에 Jenkins 추가 설치 (RHEL 계열)

같은 서버(또는 같은 네트워크)에 **이미 GitLab·Nexus 가 동작 중**인 상태에서 **Jenkins LTS** 를 얹을 때 참고하는 절차입니다. 호스트명·IP·포트·토큰은 문서에 넣지 않고 자리표시자만 둡니다.

연동 개념·컨테이너로 로컬에서 연습하는 절차는 **[Docker 로컬 CI/CD 스택](./docker-local-cicd-stack.md)** 과 목적이 다릅니다. 여기서는 **OS 패키지(systemd)** 기준입니다.

```text
<JENKINS_HTTP_PORT>      # 예: 8080 (기본). 다른 서비스와 겹치면 변경.
<JENKINS_AGENT_PORT>   # 예: 50000 (에이전트 TCP).
<GITLAB_EXT_URL>       # Jenkins/Git 에서 접근할 GitLab 베이스 URL (예: https://gitlab.example.com).
<NEXUS_EXT_URL>        # 예: https://nexus.example.com/repository/maven-public/
```

---

## 1. 같은 서버에 둘 때 먼저 확인할 것

### 1.1 포트·메모리

| 서비스 | 자주 쓰는 포트 | 비고 |
|--------|----------------|------|
| GitLab(Omnibus) | **80, 443**, 22(SSH Git) 등 | 환경마다 다름. **`ss -tlnp`** 로 확인. |
| Nexus 3 | UI **8081** 등 | 설정에 따라 변경 가능. |
| Jenkins | 기본 HTTP **8080**, 에이전트 **50000** | **`8080` 이 비어 있는지** 반드시 확인. |

```bash
ss -tlnp | sort
free -h
```

GitLab 과 Jenkins 를 **한 장비**에 두면 RAM 부족으로 둘 다 불안정해질 수 있습니다. 최소 여유 메모리·디스크를 운영 기준에 맞춰 확보합니다.

### 1.2 역방향 프록시(Nginx 등)

이미 **443 에 GitLab 또는 통합 리버스 프록시**가 있다면, Jenkins 는 **로컬에서만 `127.0.0.1:<포트>` 로 Listen** 하게 두고, **`jenkins.<도메인>`** 같은 호스트로 HTTPS 종료하는 방식이 흔합니다. 방화벽에는 외부에 Jenkins 포트를 직접 열지 않을 수 있습니다.

---

## 2. Java (Jenkins 2.4xx 계열은 Java 17 이상)

RHEL 9 계열 예:

```bash
dnf install -y java-17-openjdk java-17-openjdk-devel
java -version
```

조직 표준이 **다른 JDK**(예: Eclipse Temurin 패키지)이면 그에 맞춥니다. Jenkins 버전별 요구 JDK 는 [공식 문서](https://www.jenkins.io/doc/administration/requirements/java/)를 확인합니다.

---

## 3. Jenkins 패키지 저장소 등록 및 설치

인터넷 되는 서버에서 공식 안정(stable) 레포를 씁니다.

```bash
curl -fsSL -o /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key
dnf clean all
dnf install -y jenkins
```

폐쇄망이면 위 **`jenkins.repo`** 와 **`jenkins` RPM**(및 의존 패키지)·키 파일을 내려받아 전송한 뒤 **`dnf install ./jenkins-*.rpm`** 형태로 설치합니다.

### 3.1 Jenkins HTTP 포트 변경(8080 충돌 시)

설치 후·최초 기동 전에 **`/usr/lib/systemd/system/jenkins.service`** 또는 **`/etc/sysconfig/jenkins`** 가 있는 환경에서는 배포판마다 다릅니다. RHEL 패키지 최근 버전은 **`/etc/default/jenkins`** 또는 **`Environment="JENKINS_PORT=8080"`** 형태의 drop-in 을 씁니다.

```bash
systemctl cat jenkins
```

출력에 나오는 **`Environment=`** 에 맞춰 포트를 바꾼 뒤:

```bash
systemctl daemon-reload
```

문서에는 구체 키 이름 대신 **패키지가 제공하는 변수만 수정**한다고만 적습니다. 실제 키 이름은 `systemctl cat jenkins` 로 확인합니다.

---

## 4. 방화벽·SELinux

Jenkins UI 포트와 에이전트 포트를 열어야 하는 경우(외부에서 직접 접속할 때만):

```bash
firewall-cmd --permanent --add-port=<JENKINS_HTTP_PORT>/tcp
firewall-cmd --permanent --add-port=<JENKINS_AGENT_PORT>/tcp
firewall-cmd --reload
```

SELinux 사용 시 포트 라벨이 필요하면 환경에 맞게 `semanage port` 로 허용합니다.

---

## 5. 기동·초기 잠금 해제

```bash
systemctl enable jenkins
systemctl start jenkins
systemctl status jenkins -l --no-pager
```

초기 관리자 비밀번호:

```bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```

브라우저에서 **`http://<서버>:<JENKINS_HTTP_PORT>`** 로 접속해 마법사를 진행합니다. 플러그인 설치·관리 계정은 조직 정책에 따릅니다.

---

## 6. GitLab·Nexus 와의 관계 (설치 직후 체크리스트)

- **GitLab**
  - Jenkins Job 에서 Git 저장소 URL 은 **`GITLAB_EXT_URL`** 기준으로 설정합니다(내부 DNS·HTTPS 권장).
  - 인증은 **Deploy Token / PAT / SSH 키** 중 하나를 Jenkins Credentials 에 등록합니다.
  - Webhook 으로 빌드 트리거할 때는 Jenkins URL 이 GitLab 서버에서 HTTP(S) 로 도달 가능해야 합니다(방화벽·인증서 포함).

- **Nexus**
  - Maven/Gradle/npm 등 **저장소 URL** 은 **`NEXUS_EXT_URL`** 과 프로젝트 정의에 맞게 Jenkins 에 넘깁니다.
  - Nexus 로 업로드 시 **전용 계정·토큰**을 Credentials 로 두고 파이프라인에서만 참조합니다.

세부 UI 메뉴 경로는 **[Docker 로컬 CI/CD 스택](./docker-local-cicd-stack.md)** 의 Jenkins ↔ GitLab / Nexus 절을 참고하되, 호스트명은 **실제 서버 주소**로 바꿉니다.

---

## 7. 장애 시

```bash
journalctl -u jenkins -e --no-pager
tail -n 200 /var/log/jenkins/jenkins.log
```

포트 충돌·Java 버전·디스크 부족·플러그인 오류가 로그에 자주 남습니다.

---

**보안:** 초기 비밀번호·PAT·저장소 비밀번호는 문서·스크린샷에 남기지 않고, 회사 비밀관리 정책에 따릅니다.

# Redis 설치 및 설정 가이드

RHEL 계열 Redis 서버에 Redis 설치 파일을 업로드해서 설치하고, 애플리케이션에서 사용할 Redis 포트를 설정하는 절차입니다. Redis를 사용하지 않는 구성이면 이 문서는 적용하지 않아도 됩니다. 실제 IP와 포트 번호는 문서에 적지 않고 아래 자리표시자로 표기합니다.

```text
<REDIS_SERVER_IP>
<WAS_SERVER_IP>
<REDIS_PORT>
<REDIS_PASSWORD>
```

## 1. 설치 방식 선택

RHEL repository를 사용할 수 있으면 `dnf` 설치를 권장합니다.

애플리케이션에서 Redis 버전을 별도로 지정하지 않았다면 RHEL repository에서 제공하는 기본 Redis 버전을 사용합니다. 폐쇄망 반입용 rpm도 인터넷이 되는 같은 RHEL 계열 서버에서 내려받아야 운영 서버와 의존성이 맞습니다.

설치 가능한 Redis 버전 확인:

```bash
dnf info redis
dnf --showduplicates list redis
```

특정 버전이 필요하면 애플리케이션 요구사항을 먼저 확인한 뒤, 같은 major 버전의 Redis 패키지를 준비합니다.

```bash
dnf install redis -y
systemctl enable --now redis
systemctl status redis -l --no-pager
```

폐쇄망이면 인터넷이 되는 같은 RHEL 계열 서버에서 Redis rpm과 의존성을 먼저 내려받은 뒤 Redis 서버에 업로드합니다. RHEL 패키지 설치 기준에서는 웹에서 단일 파일만 받기보다 같은 OS 계열에서 의존성까지 묶어서 받는 방식을 권장합니다.

참고용 공식 Redis 다운로드 경로:

```text
https://redis.io/download/
```

폐쇄망 반입용 rpm 묶음 생성:

```bash
dnf install dnf-plugins-core -y
mkdir -p /root/redis-rpms
dnf download --resolve --destdir /root/redis-rpms redis
```

로컬 PC 또는 다운로드 서버에서 Redis 서버로 업로드합니다.

```bash
scp -r ./redis-rpms root@<REDIS_SERVER_IP>:/root/
```

Redis 서버에서 설치합니다.

```bash
cd /root/redis-rpms
dnf install ./*.rpm -y
systemctl enable --now redis
systemctl status redis -l --no-pager
```

## 2. Redis 포트 및 접속 설정

Redis 설정 파일을 수정합니다.

```bash
vi /etc/redis/redis.conf
```

WAS 서버에서 Redis 서버로 접속해야 하는 경우 예시:

```conf
bind 0.0.0.0
port <REDIS_PORT>
protected-mode yes
requirepass <REDIS_PASSWORD>
```

`port` 값은 애플리케이션에서 사용하는 Redis 포트와 동일해야 합니다. Redis 기본 포트를 그대로 쓸 수도 있고, 운영 정책에 따라 다른 포트로 변경할 수도 있습니다.

## 3. 재시작 및 확인

```bash
systemctl restart redis
systemctl status redis -l --no-pager
ss -lntp | grep redis
```

Redis 서버 로컬에서 인증 확인:

```bash
redis-cli -p <REDIS_PORT> -a '<REDIS_PASSWORD>' ping
```

정상 응답:

```text
PONG
```

WAS 서버에서 Redis 서버로 접근 확인:

```bash
redis-cli -h <REDIS_SERVER_IP> -p <REDIS_PORT> -a '<REDIS_PASSWORD>' ping
```

## 4. 접근 제어 기준

Redis는 외부 사용자나 WEB 서버에서 직접 접근하지 않도록 합니다. 애플리케이션에서 Redis를 사용하는 경우에만 WAS 서버에서 Redis 서버의 Redis 포트로 접근을 허용합니다.

방화벽 또는 보안장비 신청 기준:

```text
출발지: <WAS_SERVER_IP>
목적지: <REDIS_SERVER_IP>
목적지 포트: <REDIS_PORT>/tcp
```

Redis를 사용하지 않는 구성이면 Redis 서버 설치와 Redis 포트 신청은 필요 없습니다.

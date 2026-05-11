# Nginx `/app/nginx` 전체 설치 및 SSL·WAS 프록시 가이드

RHEL 계열 WEB 서버에 **Nginx 실행 파일·모듈·설정·로그·임시 디렉터리까지 모두 `/app/nginx` 아래** 두고, SSL 종료 후 Tomcat WAS 로 프록시하는 절차입니다. IP·도메인·포트는 자리표시자로만 적습니다.

**이 문서와 다른 방식의 차이**

- 공식 **RPM** 은 바이너리가 **`/usr/sbin/nginx`**, 설정이 **`/etc/nginx`** 로 깔립니다.
- **설치 경로 전체를 `/app/nginx` 로 통일**하려면 공식 소스 tarball 을 **`--prefix=/app/nginx`** 로 빌드·설치하거나, 동일 방식으로 만든 **`/app/nginx` 트리를 tar 로 묶어 배포**해야 합니다.

**설치 후 디렉터리 요약**

| 구분 | 경로 |
|------|------|
| 실행 파일 | `/app/nginx/sbin/nginx` |
| 메인 설정 | `/app/nginx/conf/nginx.conf` |
| 동적 모듈(빌드 시) | `/app/nginx/modules` |
| 사이트별 설정 | `/app/nginx/conf.d/*.conf` |
| SSL | `/app/nginx/ssl` |
| 로그·PID·lock | `/app/nginx/logs` |
| 프록시·업로드 임시 | `/app/nginx/tmp/...` |

기동은 **`systemctl`** 을 쓰며, 유닛 파일만 **`/etc/systemd/system/nginx.service`** 에 둡니다(Nginx 본체 설정과는 별개).

```text
<WEB_SERVER_IP>
<WAS_SERVER_IP>
<DOMAIN>
<HTTP_PORT>
<HTTPS_PORT>
<TOMCAT_HTTP_PORT>
<NGINX_SITE_CONF>
```

`<NGINX_SITE_CONF>` 는 파일명만 적습니다. 예: `pnmbiz.conf` → 편집 경로 **`/app/nginx/conf.d/pnmbiz.conf`**

---

## 1. 소스 tarball 준비

폐쇄망이면 인터넷 되는 환경에서 받아 WEB 서버로 복사합니다.

```text
https://nginx.org/download/nginx-<VERSION>.tar.gz
```

예: `nginx-1.28.3.tar.gz`

```bash
scp nginx-<VERSION>.tar.gz root@<WEB_SERVER_IP>:/root/
```

---

## 2. 기존 nginx 제거 및 `/app/nginx` 비우기

`root` 로 접속합니다.

### 2.1 패키지 nginx 제거

RPM/DNF 로 깔린 nginx 가 있으면 제거합니다.

```bash
systemctl stop nginx 2>/dev/null || true
systemctl disable nginx 2>/dev/null || true
cp -a /etc/nginx /root/nginx-etc-backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
dnf remove 'nginx*' -y 2>/dev/null || yum remove 'nginx*' -y 2>/dev/null || true
```

예전에 **`/app/nginx`** 에 깔아 둔 트리가 있으면 백업 후 제거합니다.

```bash
mv /app/nginx /app/nginx-backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
```

또는 재설치만 할 때(백업 불필요·주의):

```bash
rm -rf /app/nginx
```

패키지용 **`/etc/systemd/system/nginx.service`** 드롭인을 손댄 적이 있으면, 아래로 없애 두었다가 5절에서 **`/app/nginx` 용**으로 새로 만듭니다.

```bash
rm -f /etc/systemd/system/nginx.service
systemctl daemon-reload
```

---

## 3. 빌드 의존 패키지

```bash
dnf install -y gcc make pcre-devel zlib-devel openssl-devel
```

운영 서버에 컴파일러를 두지 않으면 **동일 OS·동일 아키텍처 빌드 서버**에서 4절까지 수행한 뒤 **`/app/nginx` 전체를 압축해** WEB 서버에 풀고, 5절(systemd)·설정 검증만 수행합니다.

---

## 4. 소스 빌드 및 `/app/nginx` 에 설치

```bash
cd /root
tar xf nginx-<VERSION>.tar.gz
cd nginx-<VERSION>
```

```bash
./configure \
  --prefix=/app/nginx \
  --sbin-path=/app/nginx/sbin/nginx \
  --modules-path=/app/nginx/modules \
  --conf-path=/app/nginx/conf/nginx.conf \
  --error-log-path=/app/nginx/logs/error.log \
  --pid-path=/app/nginx/logs/nginx.pid \
  --lock-path=/app/nginx/logs/nginx.lock \
  --http-log-path=/app/nginx/logs/access.log \
  --http-client-body-temp-path=/app/nginx/tmp/client_body \
  --http-proxy-temp-path=/app/nginx/tmp/proxy \
  --with-http_ssl_module \
  --with-http_realip_module \
  --with-http_gzip_static_module
make -j"$(nproc)"
make install
```

설치 확인:

```bash
test -x /app/nginx/sbin/nginx && echo "OK: /app/nginx/sbin/nginx"
/app/nginx/sbin/nginx -V 2>&1
```

출력에 **`--prefix=/app/nginx`**, **`--conf-path=/app/nginx/conf/nginx.conf`** 가 포함되어야 합니다.

회사용 추가 디렉터리·권한:

```bash
mkdir -p /app/nginx/conf.d /app/nginx/ssl /app/nginx/logs \
  /app/nginx/tmp/client_body /app/nginx/tmp/proxy
chown -R root:root /app/nginx
chmod 750 /app/nginx/ssl
chmod 755 /app/nginx/conf.d /app/nginx/logs \
  /app/nginx/tmp /app/nginx/tmp/client_body /app/nginx/tmp/proxy
```

### 4.1 메인 설정 `/app/nginx/conf/nginx.conf`

파일을 열어 다음을 반영합니다.

1. **`user`**: 시스템에 `nginx` 사용자가 있으면 `user nginx;`. 없으면 `useradd -r -s /sbin/nologin nginx` 후 `user nginx;`, 또는 `user nobody;`.
2. **`http { ... }` 안**에 사이트 설정 포함:

```nginx
include /app/nginx/conf.d/*.conf;
```

(선택) 에러 로그 고정:

```nginx
error_log /app/nginx/logs/error.log warn;
```

검사:

```bash
/app/nginx/sbin/nginx -t -c /app/nginx/conf/nginx.conf
```

---

## 5. systemd 유닛

`/etc/systemd/system/nginx.service` 예시:

```ini
[Unit]
Description=nginx (installation prefix /app/nginx)
After=network-online.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/app/nginx/logs/nginx.pid
ExecStartPre=/app/nginx/sbin/nginx -t -c /app/nginx/conf/nginx.conf
ExecStart=/app/nginx/sbin/nginx -c /app/nginx/conf/nginx.conf
ExecReload=/app/nginx/sbin/nginx -s reload -c /app/nginx/conf/nginx.conf
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=mixed

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable nginx
```

SELinux enforcing 예시:

```bash
semanage fcontext -a -t bin_t "/app/nginx/sbin/nginx"
semanage fcontext -a -t httpd_log_t "/app/nginx/logs(/.*)?"
semanage fcontext -a -t httpd_config_t "/app/nginx/conf(/.*)?"
semanage fcontext -a -t httpd_config_t "/app/nginx/conf\.d(/.*)?"
restorecon -Rv /app/nginx
```

환경에 따라 컨텍스트 타입은 조정합니다.

---

## 6. IPv6 비활성 시 listen 조치

IPv6 가 꺼져 있으면 `Address family not supported by protocol` 이 날 수 있습니다.

```bash
vi /app/nginx/conf/nginx.conf
```

IPv6 `listen` 을 주석 처리합니다.

```nginx
# listen [::]:<HTTP_PORT>;
```

**`/app/nginx/conf.d/<NGINX_SITE_CONF>`** 에서도 동일합니다.

```nginx
listen <HTTPS_PORT> ssl;
# listen [::]:<HTTPS_PORT> ssl;
```

---

## 7. 기동 확인

```bash
systemctl start nginx
systemctl status nginx -l --no-pager
curl -I http://localhost:<HTTP_PORT>
```

---

## 8. SSL 인증서 배치 (`/app/nginx/ssl`)

```text
<DOMAIN>.pem
<DOMAIN>.key
<DOMAIN>.chain.pem
```

```bash
mkdir -p /app/nginx/ssl
chmod 750 /app/nginx/ssl
```

로컬에서 업로드:

```bash
scp <DOMAIN>.pem root@<WEB_SERVER_IP>:/app/nginx/ssl/
scp <DOMAIN>.key root@<WEB_SERVER_IP>:/app/nginx/ssl/
scp <DOMAIN>.chain.pem root@<WEB_SERVER_IP>:/app/nginx/ssl/
```

WEB 서버:

```bash
chmod 640 /app/nginx/ssl/<DOMAIN>.pem
chmod 600 /app/nginx/ssl/<DOMAIN>.key
chmod 640 /app/nginx/ssl/<DOMAIN>.chain.pem
chown root:nginx /app/nginx/ssl/* 2>/dev/null || true
```

체인 합치기:

```bash
cd /app/nginx/ssl
cp <DOMAIN>.pem fullchain.crt
cat <DOMAIN>.chain.pem >> fullchain.crt
chmod 644 fullchain.crt
```

---

## 9. SSL 임시 응답 (WAS 연동 전)

```bash
vi /app/nginx/conf.d/<NGINX_SITE_CONF>
```

```nginx
server {
    listen <HTTP_PORT>;
    server_name <DOMAIN>;
    return 301 https://$host$request_uri;
}

server {
    listen <HTTPS_PORT> ssl;
    http2 on;
    server_name <DOMAIN>;

    ssl_certificate /app/nginx/ssl/fullchain.crt;
    ssl_certificate_key /app/nginx/ssl/<DOMAIN>.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers off;

    location / {
        default_type text/plain;
        return 200 "nginx ssl ok\n";
    }
}
```

```bash
/app/nginx/sbin/nginx -t -c /app/nginx/conf/nginx.conf
systemctl reload nginx
curl -Ik https://localhost:<HTTPS_PORT>
```

---

## 10. WAS(Tomcat) 프록시

같은 파일 **`/app/nginx/conf.d/<NGINX_SITE_CONF>`** 의 HTTPS `server` 블록에서 위 임시 `location /` 를 아래로 교체합니다.

```nginx
location / {
    proxy_pass http://<WAS_SERVER_IP>:<TOMCAT_HTTP_PORT>;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
}
```

```bash
/app/nginx/sbin/nginx -t -c /app/nginx/conf/nginx.conf
systemctl reload nginx
```

---

## 11. 연동 확인

```bash
curl -I http://<WAS_SERVER_IP>:<TOMCAT_HTTP_PORT>
curl -Ik https://localhost:<HTTPS_PORT>
curl -Ik https://<DOMAIN>:<HTTPS_PORT>
```

`502 Bad Gateway` 이면 WEB→WAS 포트·Tomcat 기동·네트워크를 확인합니다.

SELinux 때문에 업스트림 연결이 막히면:

```bash
setsebool -P httpd_can_network_connect 1
```

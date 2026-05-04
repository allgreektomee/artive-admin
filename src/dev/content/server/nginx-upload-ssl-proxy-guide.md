# Nginx 설치 및 SSL 프록시 설정 가이드

RHEL 계열 WEB 서버에 Nginx 설치 파일과 SSL 인증서를 업로드한 뒤, Tomcat WAS로 프록시하는 설정 절차입니다. 실제 IP, 도메인, 포트 번호는 문서에 적지 않고 아래 자리표시자로 표기합니다.

```text
<WEB_SERVER_IP>
<WAS_SERVER_IP>
<DOMAIN>
<HTTP_PORT>
<HTTPS_PORT>
<TOMCAT_HTTP_PORT>
```

## 1. 설치 파일 준비

폐쇄망 서버에 직접 다운로드할 수 없으면 인터넷이 되는 로컬 PC 또는 다운로드 서버에서 아래 공식 경로로 접속해 RHEL용 `rpm` 파일과 서명키를 먼저 받습니다.

```text
Nginx RHEL rpm:
https://nginx.org/packages/rhel/

Nginx 서명키:
https://nginx.org/keys/nginx_signing.key
```

Nginx는 RHEL용 공식 `rpm` 파일과 서명키를 준비합니다.

```text
nginx-*.el*.ngx.x86_64.rpm
nginx_signing.key
```

WEB 서버로 업로드합니다.

```bash
scp nginx-*.rpm root@<WEB_SERVER_IP>:/root/
scp nginx_signing.key root@<WEB_SERVER_IP>:/root/
```

## 2. Nginx 설치

WEB 서버에 `root`로 접속해서 실행합니다.

```bash
cp -a /etc/nginx /root/nginx-backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
rpm --import /root/nginx_signing.key
dnf install /root/nginx-*.rpm -y
nginx -v
nginx -t
```

기존 repository 버전과 충돌하면 중지 후 제거하고 다시 설치합니다.

```bash
systemctl stop nginx
dnf remove nginx -y
dnf install /root/nginx-*.rpm -y
nginx -v
nginx -t
```

## 3. IPv6 listen 오류 조치

서버에서 IPv6가 비활성화되어 있으면 Nginx 시작 시 `Address family not supported by protocol` 오류가 날 수 있습니다.

```bash
vi /etc/nginx/nginx.conf
```

IPv6 listen 줄이 있으면 주석 처리합니다.

```nginx
# listen [::]:<HTTP_PORT>;
```

SSL 설정 파일에도 IPv6 listen 줄이 있으면 주석 처리합니다.

```nginx
listen <HTTPS_PORT> ssl;
# listen [::]:<HTTPS_PORT> ssl;
```

## 4. 기본 기동 확인

```bash
systemctl start nginx
systemctl enable nginx
systemctl status nginx -l --no-pager
curl -I http://localhost:<HTTP_PORT>
```

서버 로컬 방화벽을 사용하지 않는 환경이면 `firewall-cmd` 설정은 하지 않고 회사 방화벽 또는 보안장비에서 필요한 접근만 허용합니다.

## 5. SSL 인증서 업로드

회사 또는 기관에서 받은 인증서 파일을 WEB 서버에 업로드합니다.

```text
<DOMAIN>.pem
<DOMAIN>.key
<DOMAIN>.chain.pem
```

WEB 서버에서 인증서 디렉터리를 만듭니다.

```bash
mkdir -p /etc/nginx/ssl
chmod 700 /etc/nginx/ssl
```

로컬 PC에서 업로드합니다.

```bash
scp <DOMAIN>.pem root@<WEB_SERVER_IP>:/etc/nginx/ssl/
scp <DOMAIN>.key root@<WEB_SERVER_IP>:/etc/nginx/ssl/
scp <DOMAIN>.chain.pem root@<WEB_SERVER_IP>:/etc/nginx/ssl/
```

WEB 서버에서 권한을 설정합니다.

```bash
chmod 644 /etc/nginx/ssl/<DOMAIN>.pem
chmod 600 /etc/nginx/ssl/<DOMAIN>.key
chmod 644 /etc/nginx/ssl/<DOMAIN>.chain.pem
```

중간 인증서가 있으면 서버 인증서와 합쳐 `fullchain.crt`를 만듭니다.

```bash
cd /etc/nginx/ssl
cp <DOMAIN>.pem fullchain.crt
cat <DOMAIN>.chain.pem >> fullchain.crt
chmod 644 fullchain.crt
```

## 6. SSL 임시 응답 설정

WAS 연동 전에는 Nginx SSL만 먼저 확인합니다.

```bash
vi /etc/nginx/conf.d/app.conf
```

내용:

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

    ssl_certificate /etc/nginx/ssl/fullchain.crt;
    ssl_certificate_key /etc/nginx/ssl/<DOMAIN>.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers off;

    location / {
        default_type text/plain;
        return 200 "nginx ssl ok\n";
    }
}
```

검사 및 반영:

```bash
nginx -t
systemctl reload nginx
curl -Ik https://localhost:<HTTPS_PORT>
```

## 7. WAS 프록시 설정

Tomcat 기동 확인 후 임시 응답을 WAS 프록시로 변경합니다.

```nginx
location / {
    proxy_pass http://<WAS_SERVER_IP>:<TOMCAT_HTTP_PORT>;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
}
```

반영합니다.

```bash
nginx -t
systemctl reload nginx
```

## 8. 연동 확인

WEB 서버에서 WAS 포트 접근을 먼저 확인합니다.

```bash
curl -I http://<WAS_SERVER_IP>:<TOMCAT_HTTP_PORT>
```

Nginx HTTPS 프록시를 확인합니다.

```bash
curl -Ik https://localhost:<HTTPS_PORT>
curl -Ik https://<DOMAIN>:<HTTPS_PORT>
```

응답 코드가 반환되면 Nginx에서 Tomcat까지 연결된 것입니다. `502 Bad Gateway`가 나오면 WEB 서버에서 WAS 서버의 Tomcat 포트로 접근 가능한지, Tomcat이 실행 중인지 확인합니다.

SELinux가 켜져 있고 Nginx에서 WAS로 프록시 연결이 막히면 WEB 서버에서 아래 설정을 추가합니다.

```bash
setsebool -P httpd_can_network_connect 1
```

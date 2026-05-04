# Tomcat 설치 및 설정 가이드

RHEL 계열 WAS 서버에 JDK와 Tomcat `tar.gz` 파일을 업로드해서 설치하는 절차입니다. 실제 IP, 도메인, 포트 번호는 문서에 적지 않고 아래 자리표시자로 표기합니다.

```text
<WAS_SERVER_IP>
<TOMCAT_HTTP_PORT>
<TOMCAT_REDIRECT_PORT>
```

## 1. 설치 파일 준비

폐쇄망 서버에 직접 다운로드할 수 없으면 인터넷이 되는 로컬 PC 또는 다운로드 서버에서 아래 공식 경로로 접속해 파일을 먼저 받습니다.

```text
JDK 21, Eclipse Temurin:
https://adoptium.net/temurin/releases/?version=21

Tomcat 10:
https://tomcat.apache.org/download-10.cgi
```

로컬 PC에서 아래 파일을 준비합니다.

```text
OpenJDK21U-jdk_x64_linux_hotspot_*.tar.gz
apache-tomcat-10.1.*.tar.gz
```

WAS 서버로 업로드합니다.

```bash
scp OpenJDK21U-jdk_x64_linux_hotspot_*.tar.gz root@<WAS_SERVER_IP>:/opt/
scp apache-tomcat-10.1.*.tar.gz root@<WAS_SERVER_IP>:/opt/
```

## 2. JDK 설치

WAS 서버에 `root`로 접속해서 실행합니다.

```bash
cd /opt
ls -lh OpenJDK21U-jdk_x64_linux_hotspot_*.tar.gz
tar -xzf OpenJDK21U-jdk_x64_linux_hotspot_*.tar.gz
mv jdk-21* jdk21
/opt/jdk21/bin/java -version
```

환경변수 파일을 생성합니다.

```bash
vi /etc/profile.d/java21.sh
```

내용:

```bash
export JAVA_HOME=/opt/jdk21
export PATH=$JAVA_HOME/bin:$PATH
```

적용 확인:

```bash
source /etc/profile.d/java21.sh
java -version
```

## 3. Tomcat 설치

```bash
cd /opt
ls -lh apache-tomcat-10.1.*.tar.gz
tar -xzf apache-tomcat-10.1.*.tar.gz
mv apache-tomcat-10.1.* tomcat10
```

Tomcat 실행 계정을 만들고 권한을 적용합니다.

```bash
useradd -r -m -U -d /opt/tomcat10 -s /bin/false tomcat
chown -R tomcat:tomcat /opt/tomcat10
chmod +x /opt/tomcat10/bin/*.sh
/opt/tomcat10/bin/version.sh
```

이미 계정이 있으면 `useradd`는 실패할 수 있습니다. 이 경우 권한 적용부터 다시 실행하면 됩니다.

## 4. Tomcat 포트 설정

Tomcat 기본 HTTP 포트를 그대로 쓰지 않고 별도 포트를 사용하려면 `server.xml`에서 변경합니다.

```bash
vi /opt/tomcat10/conf/server.xml
```

`Connector`의 `port` 값을 운영에서 사용할 값으로 변경합니다.

```xml
<Connector port="<TOMCAT_HTTP_PORT>" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="<TOMCAT_REDIRECT_PORT>" />
```

WAS 서버에서는 SSL을 설정하지 않습니다. SSL은 WEB/Nginx 서버에서 처리하고, WEB 서버에서 WAS 서버로는 내부 HTTP로 프록시합니다.

## 5. systemd 서비스 등록

```bash
vi /etc/systemd/system/tomcat.service
```

내용:

```ini
[Unit]
Description=Apache Tomcat 10
After=network.target

[Service]
Type=forking
User=tomcat
Group=tomcat

Environment="JAVA_HOME=/opt/jdk21"
Environment="CATALINA_HOME=/opt/tomcat10"
Environment="CATALINA_BASE=/opt/tomcat10"
Environment="CATALINA_PID=/opt/tomcat10/temp/tomcat.pid"

ExecStart=/opt/tomcat10/bin/startup.sh
ExecStop=/opt/tomcat10/bin/shutdown.sh
PIDFile=/opt/tomcat10/temp/tomcat.pid

Restart=on-failure

[Install]
WantedBy=multi-user.target
```

서비스를 시작합니다.

```bash
systemctl daemon-reload
systemctl enable --now tomcat
systemctl status tomcat -l --no-pager
```

## 6. 실행 확인

WAS 서버에서 확인합니다.

```bash
ss -lntp | grep java
curl -I http://localhost:<TOMCAT_HTTP_PORT>
```

WEB 서버에서 WAS 서버 접근을 확인합니다.

```bash
curl -I http://<WAS_SERVER_IP>:<TOMCAT_HTTP_PORT>
```

응답 코드가 반환되면 WEB 서버에서 WAS 서버까지 연결이 된 것입니다. 응답이 없으면 방화벽, 보안장비, Tomcat 기동 상태를 확인합니다.

## 7. 장애 확인

서비스 시작이 실패하면 아래 순서로 확인합니다.

```bash
systemctl status tomcat.service -l --no-pager
journalctl -xeu tomcat.service --no-pager
ls -ld /opt/jdk21 /opt/tomcat10 /opt/tomcat10/logs /opt/tomcat10/temp
/opt/jdk21/bin/java -version
runuser -u tomcat -- /opt/tomcat10/bin/catalina.sh run
```

권한 오류가 나오면 Tomcat 디렉터리 권한을 다시 적용합니다.

```bash
chown -R tomcat:tomcat /opt/tomcat10
chmod +x /opt/tomcat10/bin/*.sh
runuser -u tomcat -- /opt/tomcat10/bin/catalina.sh run
```

# Server 설치 가이드

RHEL 계열 서버에서 WEB/WAS/Redis·CI 도구를 구성할 때 참고하는 문서입니다. 실제 IP, 도메인, 포트 번호는 각 문서에서 자리표시자로 표기합니다.

## 문서 목록

- [Tomcat 설치 및 설정](./tomcat-tar-install-config-guide.md)
- [Nginx 설치 및 SSL 프록시 설정](./nginx-upload-ssl-proxy-guide.md) — RPM·패키지 기본 + `/app/nginx/conf.d`; 예시 **외부 443** / **내부 Tomcat 10001**
- [Nginx `/app/nginx` 전체 설치·SSL·WAS 프록시](./nginx-app-prefix-full-install-guide.md) — 바이너리·설정 모두 `/app/nginx`(소스 `--prefix` 등)
- [Redis 설치 및 설정](./redis-upload-config-guide.md)
- [GitLab·Nexus 있는 서버에 Jenkins 추가 (RHEL)](./jenkins-rhel-gitlab-nexus-add-guide.md) — 포트·Java·패키지 설치·연동 체크리스트
- [Docker 로컬 CI/CD 스택](./docker-local-cicd-stack.md) — 학습 정리 `/dev` Server 탭에서 함께 노출됩니다.

# AI 부트캠프 성과관리 웹사이트

산업AI 부트캠프 프로젝트 작품을 전시하는 정적 웹사이트입니다.

## 프로젝트 구조

```
project/
├── index.html              # 메인 페이지 (행사 목록)
├── projects.html           # 프로젝트 목록 페이지
├── project-detail.html     # 프로젝트 상세 페이지
├── css/
│   └── styles.css         # 스타일시트
├── js/
│   ├── main.js            # 메인 페이지 로직
│   ├── projects.js        # 프로젝트 목록 로직
│   └── project-detail.js  # 프로젝트 상세 로직
├── data/
│   ├── events.json        # 행사 정보
│   └── projects/
│       ├── hci-2025-2.json
│       ├── ai-project2-2025-2.json
│       └── hci-korea-2026.json
└── media/                  # 미디어 파일 (로컬 개발용)
    ├── hci-2025-2/
    │   ├── project-001/
    │   │   ├── thumbnail.jpg
    │   │   ├── poster.pdf
    │   │   └── video.mp4
    │   └── project-002/
    ├── ai-project2-2025-2/
    └── hci-korea-2026/
```

## 사용 방법

### 1. 신규 행사 추가

`data/events.json` 파일을 수정하여 새로운 행사를 추가합니다:

```json
{
  "id": "행사-아이디",
  "name": "행사명",
  "description": "행사 설명",
  "date": "2026년 1학기",
  "projectCount": 10,
  "color": "#4a90b8",
  "colorAlt": "#2c5f7f"
}
```

### 2. 프로젝트 추가

해당 행사의 JSON 파일(예: `data/projects/행사-아이디.json`)에 프로젝트를 추가합니다:

```json
{
  "id": "project-xxx",
  "title": "프로젝트 제목",
  "team": "팀명",
  "members": "팀원 이름",
  "date": "2026-01-15",
  "description": "프로젝트 설명",
  "thumbnail": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/행사명/프로젝트명/thumbnail.jpg",
  "poster": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/행사명/프로젝트명/poster.pdf",
  "video": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/행사명/프로젝트명/video.mp4",
  "paper": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/행사명/프로젝트명/paper.pdf"
}
```

### 3. 미디어 파일 업로드

#### 로컬 개발 시:
- `media/행사명/프로젝트명/` 폴더에 파일 저장
- JSON에서 `xxxLocal` 필드 사용

#### 프로덕션 배포 시:
- AWS S3에 파일 업로드: `https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/행사명/프로젝트명/`
- JSON에서 `thumbnail`, `poster`, `video`, `paper` 필드에 S3 URL 사용

### 4. 파일 형식

- **썸네일**: JPG, PNG (권장 크기: 280x200px)
- **포스터**: PDF 또는 JPG/PNG
- **영상**: MP4 (H.264 코덱 권장)
- **논문**: PDF

## AWS S3 연동

최종 배포 시 모든 미디어 파일은 AWS S3에 업로드됩니다:

```
https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/
  └── 행사명/
      └── 프로젝트명/
          ├── thumbnail.jpg
          ├── poster.pdf
          ├── video.mp4
          └── paper.pdf (선택사항)
```

## 기존 사이트 통합

이 웹사이트는 https://aibootcamp.hanyang.ac.kr 의 하위 메뉴로 추가됩니다.

메뉴 링크 예시:
```html
<a href="/showcase/">성과관리</a>
```

## 브라우저 지원

- Chrome, Firefox, Safari, Edge 최신 버전
- 모바일 반응형 디자인 지원

## 개발자 노트

- 순수 HTML/CSS/JavaScript로 작성
- 외부 라이브러리 의존성 없음
- JSON 기반 데이터 관리로 유지보수 용이
- S3 엔드포인트 URL 교체만으로 프로덕션 전환 가능

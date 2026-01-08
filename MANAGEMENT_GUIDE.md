# AI 부트캠프 성과관리 웹사이트 관리 가이드

## 📋 목차
1. [색상 변경하기](#색상-변경하기)
2. [행사 추가/수정하기](#행사-추가수정하기)
3. [프로젝트 추가하기](#프로젝트-추가하기)
4. [S3 업로드 가이드](#s3-업로드-가이드)

---

## 🎨 색상 변경하기

### 파일 위치
`css/styles.css` 파일의 **최상단 :root 섹션**

### 수정 방법
```css
:root {
  --primary-color: #00a9a5;        /* 메인 강조 색상 (버튼, 링크 등) */
  --primary-dark: #008c89;         /* 메인 색상 어두운 버전 (hover 효과) */
  --secondary-color: #4a90e2;      /* 보조 색상 */
  --background-light: #f8fafb;     /* 밝은 배경색 */
  --text-dark: #2c3e50;            /* 진한 텍스트 색상 */
  --text-muted: #6c757d;           /* 부드러운 텍스트 색상 */
  --border-color: #dee2e6;         /* 테두리 색상 */
  --shadow: rgba(0, 0, 0, 0.08);   /* 그림자 색상 */
  --hero-gradient-start: #e8f4f8;  /* 히어로 섹션 그라데이션 시작 */
  --hero-gradient-end: #d4e9f0;    /* 히어로 섹션 그라데이션 끝 */
}
```

### 색상 선택 팁
- **원하는 색상 찾기**: https://coolors.co/ 에서 색상 팔레트 생성
- **한양대 청록색 유지**: 현재 #00a9a5 계열 사용 중
- **일관성 유지**: primary-dark는 primary-color보다 약간 어둡게 설정

---

## 📂 행사 추가/수정하기

### 1단계: 교과형/몰입형 카테고리에 행사 추가

**파일 위치**: `data/events.json`

**예시 - 교과형에 행사 추가**:
```json
{
  "categories": [
    {
      "id": "course-based",
      "name": "교과형",
      "description": "정규 교과목 형태로 진행되는 프로그램",
      "events": [
        {
          "id": "hci-2025-2",
          "name": "2025-2 인간컴퓨터상호작용",
          "description": "학부 인간컴퓨터 상호작용 수업의 발표자료",
          "date": "2025년 2학기",
          "projectCount": 5
        },
        {
          "id": "ai-project2-2025-2",
          "name": "2025-2 인공지능 프로젝트 2",
          "description": "학부 인공지능 프로젝트 2 수업의 졸업 프로젝트",
          "date": "2025년 2학기",
          "projectCount": 8
        },
        // 새로운 행사 추가 (여기에 추가!)
        {
          "id": "new-event-2026-1",           // 고유 ID (영문, 숫자, 하이픈만)
          "name": "2026-1 새로운 행사",        // 화면에 표시될 이름
          "description": "새로운 행사 설명",    // 행사 설명
          "date": "2026년 1학기",              // 날짜
          "projectCount": 0                    // 프로젝트 개수 (나중에 업데이트)
        }
      ]
    }
  ]
}
```

### 2단계: 프로젝트 데이터 파일 생성

**파일 위치**: `data/projects/[행사ID].json` (예: `data/projects/new-event-2026-1.json`)

**파일 생성**:
```json
{
  "eventId": "new-event-2026-1",
  "eventName": "2026-1 새로운 행사",
  "projects": []
}
```

---

## 🎯 프로젝트 추가하기

### 파일 위치
해당 행사의 프로젝트 파일: `data/projects/[행사ID].json`

### 프로젝트 추가 예시

```json
{
  "eventId": "hci-2025-2",
  "eventName": "2025-2 인간컴퓨터상호작용",
  "projects": [
    {
      "id": "project-001",                    // 프로젝트 고유 ID
      "title": "AI 기반 스마트 홈 시스템",     // 프로젝트 제목
      "authors": "김철수, 이영희, 박민수",      // 참여자
      "description": "음성 인식과 AI를 활용한 스마트 홈 제어 시스템", // 설명
      
      // 썸네일 (로컬 개발용)
      "thumbnailLocal": "media/hci-2025-2/project-001/thumbnail.jpg",
      // 썸네일 (프로덕션 - S3 URL)
      "thumbnail": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/hci-2025-2/project-001/thumbnail.jpg",
      
      // 포스터 (선택사항)
      "posterLocal": "media/hci-2025-2/project-001/poster.pdf",
      "poster": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/hci-2025-2/project-001/poster.pdf",
      
      // 발표 영상
      "videoLocal": "media/hci-2025-2/project-001/presentation.mp4",
      "video": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/hci-2025-2/project-001/presentation.mp4",
      
      // 논문 (선택사항 - HCI Korea 등)
      "paperLocal": "media/hci-korea-2026/project-001/paper.pdf",
      "paper": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/hci-korea-2026/project-001/paper.pdf"
    }
  ]
}
```

### 필수 항목
- `id`: 프로젝트 고유 ID (중복 불가)
- `title`: 프로젝트 제목
- `authors`: 참여자
- `thumbnail` / `thumbnailLocal`: 썸네일 이미지
- `video` / `videoLocal`: 발표 영상

### 선택 항목
- `poster` / `posterLocal`: 포스터 파일
- `paper` / `paperLocal`: 논문 파일
- `description`: 프로젝트 설명

---

## ☁️ S3 업로드 가이드

### 폴더 구조
```
aibootcamp.hanyang.ac.kr/
└── media/
    ├── hci-2025-2/              # 행사별 폴더
    │   ├── project-001/         # 프로젝트별 폴더
    │   │   ├── thumbnail.jpg    # 썸네일
    │   │   ├── poster.pdf       # 포스터
    │   │   └── presentation.mp4 # 영상
    │   └── project-002/
    │       └── ...
    ├── ai-project2-2025-2/
    └── hci-korea-2026/
```

### S3 업로드 단계

#### 1단계: 로컬 폴더에 파일 정리
프로젝트 루트의 `media` 폴더에 다음과 같이 정리:
```
media/
├── hci-2025-2/
│   └── project-001/
│       ├── thumbnail.jpg
│       ├── poster.pdf
│       └── presentation.mp4
```

#### 2단계: AWS CLI로 S3 업로드
```bash
# AWS CLI 설치 확인
aws --version

# S3에 업로드 (폴더 전체)
aws s3 sync ./media/ s3://aibootcamp.hanyang.ac.kr/media/ --acl public-read

# 또는 개별 파일 업로드
aws s3 cp media/hci-2025-2/project-001/thumbnail.jpg \
  s3://aibootcamp.hanyang.ac.kr/media/hci-2025-2/project-001/thumbnail.jpg \
  --acl public-read
```

#### 3단계: JSON 파일 업데이트
S3 업로드 후, JSON 파일의 `thumbnail`, `video`, `poster`, `paper` 필드에 S3 URL 입력:

```json
{
  "thumbnail": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/hci-2025-2/project-001/thumbnail.jpg",
  "video": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/hci-2025-2/project-001/presentation.mp4"
}
```

### S3 URL 형식
```
https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/[행사ID]/[프로젝트ID]/[파일명]
```

---

## 🔄 개발 워크플로우

### 개발 단계 (로컬)
1. `media/` 폴더에 파일 저장
2. JSON에 `xxxLocal` 필드 사용
3. 로컬 서버에서 테스트 (`python -m http.server 8000`)

### 배포 단계 (프로덕션)
1. `media/` 폴더를 S3에 업로드
2. JSON의 `thumbnail`, `video`, `poster`, `paper` 필드에 S3 URL 입력
3. 웹사이트 배포

---

## 📝 체크리스트

### 새로운 행사 추가시
- [ ] `data/events.json`에 행사 정보 추가
- [ ] `data/projects/[행사ID].json` 파일 생성
- [ ] 프로젝트 개수 확인 및 `projectCount` 업데이트

### 새로운 프로젝트 추가시
- [ ] 프로젝트 파일(썸네일, 영상, 포스터 등) 준비
- [ ] `media/[행사ID]/[프로젝트ID]/` 폴더에 파일 저장
- [ ] `data/projects/[행사ID].json`에 프로젝트 정보 추가
- [ ] S3에 파일 업로드
- [ ] JSON의 S3 URL 업데이트
- [ ] `data/events.json`의 해당 행사 `projectCount` 업데이트

---

## ❓ 자주 묻는 질문

**Q: 로컬에서 테스트할 때 영상이 안 나와요**
A: 로컬 서버를 실행해야 합니다: `python -m http.server 8000` 또는 VS Code의 Live Server 확장 사용

**Q: S3 URL을 바꿨는데 변경이 안 보여요**
A: 브라우저 캐시를 삭제하거나 시크릿 모드에서 확인하세요 (Ctrl+Shift+N)

**Q: 행사 이름을 변경하려면?**
A: `data/events.json`의 `name` 필드만 수정하면 됩니다. `id`는 변경하지 마세요.

**Q: 프로젝트 순서를 바꾸려면?**
A: `data/projects/[행사ID].json`의 `projects` 배열 순서를 변경하세요.

**Q: 프로젝트에 s3링크를 연결하려면?**
A: data/projects/ai-project2-2025-2.json에 들어가서   

      "id": "project-004",
      "title": "Fine-grained and Adaptive Style Transfer in Training-free Diffusion Models",
      "team": " ",
      "members": " ",
      "date": "2026-01-08",
      "description": " ",
      "thumbnailLocal": "media/ai-project2-2025-2/project-004/thumbnail.jpg",
      "thumbnail": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/ai-project2-2025-2/project-004/thumbnail.jpg",
      "posterLocal": "media/ai-project2-2025-2/project-004/poster-004.pdf",
      "poster": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/ai-project2-2025-2/project-004/poster-004.pdf",
      "videoLocal": "media/ai-project2-2025-2/project-004/video.mp4",
      "video": "https://s3.ap-northeast-2.amazonaws.com/aibootcamp.hanyang.ac.kr/media/ai-project2-2025-2/project-004/video.mp4"

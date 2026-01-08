// Project detail page
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const categoryId = urlParams.get("category")
  const eventId = urlParams.get("event")
  const projectId = urlParams.get("project")

  if (!categoryId || !eventId || !projectId) {
    window.location.href = "index.html"
    return
  }

  try {
    // Load events configuration
    const eventsResponse = await fetch("data/events.json")
    const eventsData = await eventsResponse.json()

    const category = eventsData.categories.find((cat) => cat.id === categoryId)
    if (!category) {
      window.location.href = "index.html"
      return
    }

    const event = category.events.find((e) => e.id === eventId)
    if (!event) {
      window.location.href = "index.html"
      return
    }

    // Load projects for this event
    const projectsResponse = await fetch(`data/projects/${eventId}.json`)
    const projectsData = await projectsResponse.json()
    const project = projectsData.projects.find((p) => p.id === projectId)

    if (!project) {
      window.location.href = `projects.html?category=${categoryId}&event=${eventId}`
      return
    }

    document.getElementById("breadcrumbCategory").textContent = category.name
    document.getElementById("breadcrumbCategory").href = `events.html?category=${categoryId}`
    document.getElementById("breadcrumbEvent").textContent = event.name
    document.getElementById("breadcrumbEvent").href = `projects.html?category=${categoryId}&event=${eventId}`
    document.getElementById("breadcrumbProject").textContent = project.title
    document.title = `${project.title} - ${event.fullName}`

    // Display project details
    displayProjectDetail(project, categoryId, eventId)
  } catch (error) {
    console.error("Error loading project detail:", error)
    document.getElementById("projectDetail").innerHTML =
      '<p class="loading">프로젝트 정보를 불러오는데 실패했습니다.</p>'
  }
})

function displayProjectDetail(project, categoryId, eventId) {
  const projectDetail = document.getElementById("projectDetail")

  // Use S3 URLs if available, otherwise use local paths
  const posterSrc = project.poster || project.posterLocal || ""
  const videoSrc = project.video || project.videoLocal || ""
  const paperSrc = project.paper || project.paperLocal || ""

  let contentHTML = `
        <a href="projects.html?category=${categoryId}&event=${eventId}" class="back-button">← 목록으로 돌아가기</a>
        
        <div class="project-header">
            <h1 class="project-title">${project.title}</h1>
            <div class="project-meta">
                ${project.team ? `<div class="project-meta-item">👥 ${project.team}</div>` : ""}
                ${project.members ? `<div class="project-meta-item">👤 ${project.members}</div>` : ""}
                ${project.date ? `<div class="project-meta-item">📅 ${project.date}</div>` : ""}
            </div>
        </div>
        
        <div class="project-content">
    `

  if (project.description) {
    contentHTML += `
            <div class="project-section">
                <h2 class="project-section-title">프로젝트 소개</h2>
                <p class="project-description">${project.description}</p>
            </div>
        `
  }

  if (posterSrc) {
    const isPdf = posterSrc.toLowerCase().endsWith(".pdf")
    if (isPdf) {
      contentHTML += `
                <div class="project-section">
                    <h2 class="project-section-title">포스터</h2>
                    <a href="${posterSrc}" target="_blank" class="back-button">포스터 PDF 보기</a>
                </div>
            `
    } else {
      contentHTML += `
                <div class="project-section">
                    <h2 class="project-section-title">포스터</h2>
                    <img src="${posterSrc}" alt="${project.title} 포스터" class="project-poster" onerror="this.style.display='none'">
                </div>
            `
    }
  }

  if (videoSrc) {
    contentHTML += `
            <div class="project-section">
                <h2 class="project-section-title">발표 영상</h2>
                <video controls class="project-video">
                    <source src="${videoSrc}" type="video/mp4">
                    귀하의 브라우저는 비디오 태그를 지원하지 않습니다.
                </video>
            </div>
        `
  }

  if (paperSrc) {
    contentHTML += `
            <div class="project-section">
                <h2 class="project-section-title">논문</h2>
                <a href="${paperSrc}" target="_blank" class="back-button">논문 PDF 다운로드</a>
            </div>
        `
  }

  contentHTML += `</div>`

  projectDetail.innerHTML = contentHTML
}

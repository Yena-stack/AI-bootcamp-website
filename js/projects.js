// Projects page - Display projects for selected event
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const categoryId = urlParams.get("category")
  const eventId = urlParams.get("event")

  if (!categoryId || !eventId) {
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

    document.getElementById("eventTitle").textContent = event.fullName
    document.getElementById("eventName").textContent = event.name
    document.getElementById("categoryLink").textContent = category.name
    document.getElementById("categoryLink").href = `events.html?category=${categoryId}`
    document.title = `${event.fullName} - AI 부트캠프`

    displayEventTabs(category.events, categoryId, eventId)

    // Load projects for this event
    const projectsFilePath = `data/projects/${eventId}.json`
    const projectsResponse = await fetch(projectsFilePath)

    if (!projectsResponse.ok) {
      throw new Error(`Failed to load projects: ${projectsResponse.status}`)
    }

    const projectsData = await projectsResponse.json()

    if (projectsData.projects && projectsData.projects.length > 0) {
      displayProjects(projectsData.projects, categoryId, eventId)
    } else {
      document.getElementById("projectsGrid").innerHTML = '<p class="loading">등록된 프로젝트가 없습니다.</p>'
    }
  } catch (error) {
    console.error("Error loading projects:", error)
    document.getElementById("projectsGrid").innerHTML =
      '<p class="loading">프로젝트 정보를 불러오는데 실패했습니다.</p>'
  }
})

function displayEventTabs(events, categoryId, currentEventId) {
  const eventTabs = document.getElementById("eventTabs")
  eventTabs.innerHTML = ""

  events.forEach((event) => {
    const tab = document.createElement("a")
    tab.className = "event-tab"
    if (event.id === currentEventId) {
      tab.classList.add("active")
    }
    tab.href = `projects.html?category=${categoryId}&event=${event.id}`
    tab.textContent = event.name

    eventTabs.appendChild(tab)
  })
}

function displayProjects(projects, categoryId, eventId) {
  const projectsGrid = document.getElementById("projectsGrid")
  projectsGrid.innerHTML = ""

  projects.forEach((project) => {
    const projectCard = createProjectCard(project, categoryId, eventId)
    projectsGrid.appendChild(projectCard)
  })
}

function createProjectCard(project, categoryId, eventId) {
  const card = document.createElement("a")
  card.className = "project-card"
  card.href = `project-detail.html?category=${categoryId}&event=${eventId}&project=${project.id}`

  // Determine thumbnail source - use S3 URL if available, otherwise use local path
  const thumbnailSrc =
    project.thumbnail || project.thumbnailLocal || "https://via.placeholder.com/280x200?text=No+Image"

  card.innerHTML = `
        <img src="${thumbnailSrc}" alt="${project.title}" class="project-thumbnail" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
        <div class="project-card-content">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-team">${project.members || "멤버 미정"}</p>
        </div>
    `

  return card
}

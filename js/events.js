// Events list page - Display events for a category
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const categoryId = urlParams.get("category")

  if (!categoryId) {
    window.location.href = "index.html"
    return
  }

  const eventsList = document.getElementById("eventsList")
  const pageTitle = document.getElementById("pageTitle")
  const categoryName = document.getElementById("categoryName")

  try {
    eventsList.innerHTML = '<div class="loading">행사 정보를 불러오는 중입니다</div>'

    const response = await fetch("data/events.json")
    const data = await response.json()

    const category = data.categories.find((cat) => cat.id === categoryId)

    if (category) {
      pageTitle.textContent = category.name
      categoryName.textContent = category.name
      displayEvents(category.events, categoryId)
    } else {
      eventsList.innerHTML = '<p class="loading">해당 카테고리를 찾을 수 없습니다.</p>'
    }
  } catch (error) {
    console.error("Error loading events:", error)
    eventsList.innerHTML = '<p class="loading">행사 정보를 불러오는데 실패했습니다.</p>'
  }
})

function displayEvents(events, categoryId) {
  const eventsList = document.getElementById("eventsList")
  eventsList.innerHTML = ""

  events.forEach((event) => {
    const eventBox = createEventBox(event, categoryId)
    eventsList.appendChild(eventBox)
  })
}

function createEventBox(event, categoryId) {
  const box = document.createElement("a")
  box.className = "event-box"
  box.href = `projects.html?category=${categoryId}&event=${event.id}`

  box.innerHTML = `
        <h3 class="event-box-title">${event.name}</h3>
        <p class="event-box-subtitle">${event.fullName}</p>
    `

  return box
}

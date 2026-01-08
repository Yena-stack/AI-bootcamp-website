// Main page - Display categories
document.addEventListener("DOMContentLoaded", async () => {
  const categoriesGrid = document.getElementById("categoriesGrid")

  try {
    categoriesGrid.innerHTML = '<div class="loading">카테고리 정보를 불러오는 중입니다</div>'

    // Load events configuration
    const response = await fetch("data/events.json")
    const data = await response.json()

    if (data.categories && data.categories.length > 0) {
      displayCategories(data.categories)
    } else {
      categoriesGrid.innerHTML = '<p class="loading">등록된 카테고리가 없습니다.</p>'
    }
  } catch (error) {
    console.error("Error loading categories:", error)
    categoriesGrid.innerHTML = '<p class="loading">카테고리 정보를 불러오는데 실패했습니다.</p>'
  }
})

function displayCategories(categories) {
  const categoriesGrid = document.getElementById("categoriesGrid")
  categoriesGrid.innerHTML = ""

  categories.forEach((category) => {
    const categoryCard = createCategoryCard(category)
    categoriesGrid.appendChild(categoryCard)
  })
}

function createCategoryCard(category) {
  const card = document.createElement("a")
  card.className = "category-card"
  card.href = `events.html?category=${category.id}`

  const totalProjects = category.events.reduce((sum, event) => sum + event.projectCount, 0)

  card.innerHTML = `
        <div class="category-card-image" style="background: linear-gradient(135deg, ${category.color} 0%, ${adjustColor(category.color, -30)} 100%);">
        </div>
        <div class="category-card-content">
            <h3 class="category-card-title">${category.name}</h3>
            <p class="category-card-description">${category.description}</p>
            <div class="category-card-meta">
                <span>${category.events.length}개 행사</span>
                <span>${totalProjects}개 프로젝트</span>
            </div>
        </div>
    `

  return card
}

function adjustColor(color, amount) {
  const num = Number.parseInt(color.replace("#", ""), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount))
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
}

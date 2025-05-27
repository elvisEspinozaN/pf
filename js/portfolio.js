document.addEventListener("DOMContentLoaded", () => {
  const portfolioSection = document.querySelector("#portfolio-items");

  // Show loading state
  portfolioSection.innerHTML = `<div class="loading">Loading projects...</div>`;

  fetch("./assets/projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((projects) => {
      if (!projects || !projects.length) {
        throw new Error("No projects found in JSON file");
      }
      portfolioSection.innerHTML = projects
        .reverse()
        .map(createProjectCard)
        .join("");
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      portfolioSection.innerHTML = `
        <p class="error">Error loading projects: ${error.message}</p>
      `;
    });

  function createProjectCard(project) {
    return `
      <div class="portfolio-item card">
        <img src="${project.image}" alt="${project.title}" 
             class="project-image" loading="lazy">
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-stack">
            ${project.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
          <div class="project-links">
            <a href="${
              project.detailsUrl
            }" target="_blank" rel="noopener noreferrer" class="see-more">View Details</a>
            <a href="${project.demoUrl}" class="see-more" 
               target="_blank" rel="noopener noreferrer">Live Demo</a>
          </div>
        </div>
      </div>
    `;
  }
});

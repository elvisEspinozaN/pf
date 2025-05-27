document.addEventListener("DOMContentLoaded", () => {
  const latestWorkContainer = document.querySelector("#latest-work");
  const latestExperienceContainer =
    document.querySelector("#latest-experience");

  let projectIndex = 0;
  let experienceIndex = 0;
  let projects = [];
  let experiences = [];

  // Fetch projects
  fetch("./assets/projects.json")
    .then((res) => res.json())
    .then((data) => {
      projects = data.sort((a, b) => b.id - a.id);
      updateProjectCard();
      setInterval(updateProjectCard, 10000);
    });

  // Fetch experiences
  fetch("./assets/experience.json")
    .then((res) => res.json())
    .then((data) => {
      experiences = data.sort((a, b) => b.id - a.id);
      updateExperienceCard();
      setInterval(updateExperienceCard, 10000);
    });

  function updateProjectCard() {
    const project = projects[projectIndex];
    latestWorkContainer.innerHTML = `
      <div class="portfolio-item card">
        <h3>${project.title}</h3>
        <img src="${project.image}" alt="${project.title}" class="project-preview" />
        <p>${project.summary}</p>
        <a class="see-more" href="${project.demoUrl}" target="_blank">Live Demo</a>
      </div>
       <a href="./portfolio.html" class="see-more">View All Projects</a>
    `;
    projectIndex = (projectIndex + 1) % projects.length;
  }

  function updateExperienceCard() {
    const experience = experiences[experienceIndex];
    latestExperienceContainer.innerHTML = `
      <div class="experience-item card">
        <h3>${experience.position} @ ${experience.company}</h3>
        <p>${experience.dates} | ${experience.location}</p>
        <ul class="experience-bullets">
          ${experience.bullets
            .slice(0, 2)
            .map((b) => `<li>${b}</li>`)
            .join("")}
        </ul>
      </div>
       <a href="./experience.html" class="see-more">View Experience</a>
    `;
    experienceIndex = (experienceIndex + 1) % experiences.length;
  }
});

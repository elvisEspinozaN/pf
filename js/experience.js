document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.querySelector("#experience-items");

  experienceSection.innerHTML = `<div class="loading">Loading experience...</div>`;

  fetch("./assets/experience.json")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((experiences) => {
      if (!experiences?.length) throw new Error("No experience data found");
      experienceSection.innerHTML = experiences
        .map(createExperienceCard)
        .join("");
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      experienceSection.innerHTML = `
        <p class="error">Error loading experience: ${error.message}</p>
      `;
    });

  function createExperienceCard(experience) {
    return `
      <div class="experience-item card">
        <img src="${experience.logo}" alt="${experience.company} logo" 
             class="company-logo" loading="lazy">
        <div class="experience-content">
          <h3>${experience.position}</h3>
          <div class="experience-dates">${experience.dates}</div>
          <div class="experience-location">${experience.location}</div>
          <ul class="experience-bullets">
            ${experience.bullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>
          <div class="experience-skills">
            ${experience.skills
              .map(
                (skill) => `
              <span class="tech-tag">${skill}</span>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }
});

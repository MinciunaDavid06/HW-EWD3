const projectForm = document.getElementById("project-form");
const tableBody = document.getElementById("projects-table-body");
const formStatus = document.getElementById("form-status");

const fields = {
    name: document.getElementById("project-name"),
    description: document.getElementById("project-description"),
    url: document.getElementById("project-url"),
    tech: document.getElementById("project-tech"),
    date: document.getElementById("project-date"),
    image: document.getElementById("project-image")
};

const errors = {
    name: document.getElementById("project-name-error"),
    description: document.getElementById("project-description-error"),
    url: document.getElementById("project-url-error"),
    tech: document.getElementById("project-tech-error"),
    date: document.getElementById("project-date-error"),
    image: document.getElementById("project-image-error")
};

function setError(field, errorElement, message) {
    field.classList.add("input-error");
    field.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
}

function clearError(field, errorElement) {
    field.classList.remove("input-error");
    field.setAttribute("aria-invalid", "false");
    errorElement.textContent = "";
}

function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:";
    } catch {
        return false;
    }
}

function validateForm() {
    let isValid = true;

    Object.keys(fields).forEach((key) => {
        clearError(fields[key], errors[key]);
    });

    const name = fields.name.value.trim();
    const description = fields.description.value.trim();
    const url = fields.url.value.trim();
    const tech = fields.tech.value;
    const date = fields.date.value;
    const image = fields.image.value.trim();

    if (name.length < 3) {
        setError(fields.name, errors.name, "Project name must have at least 3 characters.");
        isValid = false;
    }

    if (description.length < 15) {
        setError(fields.description, errors.description, "Description must have at least 15 characters.");
        isValid = false;
    }

    if (!isValidUrl(url)) {
        setError(fields.url, errors.url, "Please enter a valid HTTPS URL.");
        isValid = false;
    }

    if (tech === "") {
        setError(fields.tech, errors.tech, "Please choose a technology.");
        isValid = false;
    }

    if (date === "") {
        setError(fields.date, errors.date, "Please choose a completion date.");
        isValid = false;
    }

    if (image !== "" && !isValidUrl(image)) {
        setError(fields.image, errors.image, "Image URL must be a valid HTTPS link.");
        isValid = false;
    }

    return isValid;
}

function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

function addProjectToTable(project) {
    const row = document.createElement("tr");

    const imageCell = document.createElement("td");
    const image = document.createElement("img");

    image.src = project.image || "https://via.placeholder.com/120x80/ff7a66/1d1216?text=Project";
    image.alt = `Thumbnail for ${project.name} project`;
    image.className = "project-thumb";
    image.loading = "lazy";
    image.width = 120;
    image.height = 80;

    imageCell.appendChild(image);

    const urlCell = document.createElement("td");
    const link = document.createElement("a");
    link.href = project.url;
    link.textContent = "View project";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    urlCell.appendChild(link);

    row.appendChild(imageCell);
    row.appendChild(createCell(project.name));
    row.appendChild(createCell(project.description));
    row.appendChild(urlCell);
    row.appendChild(createCell(project.tech));
    row.appendChild(createCell(project.date));

    const fragment = document.createDocumentFragment();
    fragment.appendChild(row);
    tableBody.appendChild(fragment);
}

projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        formStatus.textContent = "Please fix the errors before adding the project.";
        const firstError = projectForm.querySelector(".input-error");
        if (firstError) {
            firstError.focus();
        }
        return;
    }

    const project = {
        name: fields.name.value.trim(),
        description: fields.description.value.trim(),
        url: fields.url.value.trim(),
        tech: fields.tech.value,
        date: fields.date.value,
        image: fields.image.value.trim()
    };

    addProjectToTable(project);

    projectForm.reset();
    formStatus.textContent = "Project added successfully.";
});

projectForm.addEventListener("reset", function () {
    Object.keys(fields).forEach((key) => {
        clearError(fields[key], errors[key]);
    });

    formStatus.textContent = "Form was reset.";
});
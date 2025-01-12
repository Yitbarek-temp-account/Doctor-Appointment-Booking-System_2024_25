"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers();
            if (userToken) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch('http://localhost:3000/projects', { headers: headers });
            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    });
}
function fetchProjectById(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/projects/${projectId}`);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Failed to fetch project data: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Error fetching project data:', error);
            throw error;
        }
    });
}
function deleteProject(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers();
            if (userToken) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch(`http://localhost:3000/projects/${projectId}`, {
                method: 'DELETE',
                headers: headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to delete project: ${response.statusText}`);
            }
            console.log('Project deleted successfully!');
        }
        catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    });
}
function updateProject(projectId, updatedProject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers({
                'Content-Type': 'application/json',
            });
            if (userToken !== null) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch(`http://localhost:3000/projects/${projectId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedProject),
            });
            if (!response.ok) {
                throw new Error(`Failed to update project: ${response.statusText}`);
            }
            console.log('Project updated successfully!');
        }
        catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    });
}
function populateProjectTable(projects) {
    const tableBody = document.querySelector('.table tbody');
    projects.forEach((project) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td class="eachcol">${project._id}</td>
      <th scope="row">${project.title}</th>
      <td class="eachcol">${project.description}</td>
      <td class="eachcol">${project.manager}</td>
      <td class="eachcol">${project.employees}</td>
      <td class="eachcol">${project.startDate}</td>
      <td class="eachcol">${project.endDate}</td>
      <td class="eachcol">
        <button class="btn btn-primary btn-sm editButton">
          Edit
        </button>
      </td>
      <td class="eachcol">
        <button class="btn btn-danger btn-sm deleteButton">Delete</button>
      </td>
    `;
        tableBody.appendChild(row);
        // Add event listener to the Edit button
        const editButton = row.querySelector('.editButton');
        if (editButton) {
            editButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () { return yield handleProjectEditButtonClick(project); }));
        }
        // Add event listener to the Delete button
        const deleteButton = row.querySelector('.deleteButton');
        if (deleteButton) {
            deleteButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () { return yield handleProjectDeleteButtonClick(project._id); }));
        }
    });
}
function handleProjectEditButtonClick(project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch project data by ID
            const idInput = document.getElementById('id');
            const titleInput = document.getElementById('title');
            const descriptionInput = document.getElementById('description');
            const managerInput = document.getElementById('manager');
            const employeesInput = document.getElementById('Employees');
            const startDateInput = document.getElementById('startdate');
            const endDateInput = document.getElementById('enddate');
            // Fill the form fields with existing project data
            let employeesArray = project.employees.join(', ');
            idInput.value = project._id;
            titleInput.value = project.title;
            descriptionInput.value = project.description;
            managerInput.value = project.manager;
            employeesInput.value = employeesArray;
            startDateInput.value = project.startDate;
            endDateInput.value = project.endDate;
            // Show the modal
            const modal = document.getElementById('updateModal');
            modal.style.display = 'block';
            // Add event listener to close the modal
            const closeModalButton = document.getElementById('closeModal');
            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            // Add event listener to handle the form submission
            const updateForm = document.getElementById('updateForm');
            updateForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                yield handleUpdateProject(project._id, getProjectFormData(updateForm));
                modal.style.display = 'none';
            }));
        }
        catch (error) {
            console.error('Error filling form with project:', error);
        }
    });
}
// Helper function to extract form data
function getProjectFormData(form) {
    return {
        _id: form.querySelector('#id').value,
        title: form.querySelector('#title').value,
        description: form.querySelector('#description').value,
        manager: form.querySelector('#manager').value,
        employees: form.querySelector('#Employees').value.split(','),
        startDate: form.querySelector('#startdate').value,
        endDate: form.querySelector('#enddate').value,
    };
}
// Function to handle the update of the project
function handleUpdateProject(projectId, updatedProject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Implement the logic to update the project on the server
            yield updateProject(projectId, updatedProject);
            // Optionally, update the corresponding row in the table
            const rowToUpdate = document.querySelector(`tr[data-project-id="${projectId}"]`);
            if (rowToUpdate) {
                // Update the table row with the updated project data
                const cells = rowToUpdate.querySelectorAll('.eachcol');
                cells[0].textContent = updatedProject._id;
                cells[1].textContent = updatedProject.title;
                cells[2].textContent = updatedProject.description;
                cells[3].textContent = updatedProject.manager;
                cells[4].textContent = updatedProject.employees.join(', ');
                cells[5].textContent = updatedProject.startDate;
                cells[6].textContent = updatedProject.endDate;
            }
            console.log('Project updated successfully!');
        }
        catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    });
}
function handleProjectDeleteButtonClick(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Confirm deletion with the user (you may use window.confirm or a modal)
            const confirmDeletion = window.confirm('Are you sure you want to delete this project?');
            if (confirmDeletion) {
                // Delete the project
                yield deleteProject(projectId);
                // Optionally, you can remove the corresponding row from the table
                const rowToDelete = document.querySelector(`tr[data-project-id="${projectId}"]`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            }
        }
        catch (error) {
            console.error('Error handling Delete button click:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projects = yield fetchProjects();
            populateProjectTable(projects);
        }
        catch (error) {
            console.error('Error loading project data:', error);
        }
    });
});

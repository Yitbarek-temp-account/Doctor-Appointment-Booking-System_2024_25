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
function addProject(projectData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers({
                'Content-Type': 'application/json',
            });
            if (userToken !== null) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch('http://localhost:3000/projects', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(projectData),
            });
            if (!response.ok) {
                throw new Error(`Failed to add project: ${response.statusText}`);
            }
            console.log('Project added successfully!');
        }
        catch (error) {
            console.error('Error adding project:', error);
        }
    });
}
function handleAddProject() {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const managerInput = document.getElementById('manager');
    const startDateInput = document.getElementById('startdate');
    const endDateInput = document.getElementById('endingdate');
    const employeeInput = document.getElementById('employee');
    // Split the comma-separated employee names into an array
    const employeesArray = employeeInput.value
        .split(',')
        .map((employee) => employee.trim());
    const projectData = {
        title: titleInput.value,
        description: descriptionInput.value,
        manager: managerInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        employees: employeesArray,
    };
    addProject(projectData);
    // Clear the input fields after adding the project
    titleInput.value = '';
    descriptionInput.value = '';
    managerInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
    employeeInput.value = '';
}
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.querySelector('.submitbutton');
    addButton.addEventListener('click', handleAddProject);
});

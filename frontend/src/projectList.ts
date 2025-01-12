interface Project {
  _id: string;
  title: string;
  description: string;
  manager: string;
  employees: string[];
  startDate: string;
  endDate: string;
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('http://localhost:3000/projects');
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function fetchProjectById(projectId: string): Promise<Project> {
  try {
    const response = await fetch(`http://localhost:3000/projects/${projectId}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}

async function deleteProject(projectId: string): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/projects/${projectId}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }

    console.log('Project deleted successfully!');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

async function updateProject(
  projectId: string,
  updatedProject: Project,
): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/projects/${projectId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }

    console.log('Project updated successfully!');
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

function populateTable(projects: Project[]): void {
  const tableBody = document.querySelector(
    '.table tbody',
  ) as HTMLTableSectionElement;

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
        <button class="btn btn-primary btn-sm deleteButton">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);

    // Add event listener to the Edit button
    const editButton = row.querySelector('.editButton') as HTMLButtonElement;
    if (editButton) {
      editButton.addEventListener(
        'click',
        async () => await handleEditButtonClick(project),
      );
    }

    // Add event listener to the Delete button
    const deleteButton = row.querySelector(
      '.deleteButton',
    ) as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.addEventListener(
        'click',
        async () => await handleDeleteButtonClick(project._id),
      );
    }
  });
}

async function handleEditButtonClick(project: Project): Promise<void> {
  try {
    // Fetch project data by ID
    const idInput = document.getElementById('id') as HTMLInputElement;
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const descriptionInput = document.getElementById(
      'description',
    ) as HTMLInputElement;
    const managerInput = document.getElementById('manager') as HTMLInputElement;
    const employeesInput = document.getElementById(
      'Employees',
    ) as HTMLInputElement;
    const startDateInput = document.getElementById(
      'startdate',
    ) as HTMLInputElement;
    const endDateInput = document.getElementById('enddate') as HTMLInputElement;

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
    const modal = document.getElementById('updateModal') as HTMLBodyElement;
    modal.style.display = 'block';

    // Add event listener to close the modal
    const closeModalButton = document.getElementById(
      'closeModal',
    ) as HTMLButtonElement;
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Add event listener to handle the form submission
    const updateForm = document.getElementById('updateForm') as HTMLFormElement;
    updateForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleUpdateProject(project._id, getFormData(updateForm));
      modal.style.display = 'none';
    });
  } catch (error) {
    console.error('Error filling form with project:', error);
  }
}

// Helper function to extract form data
function getFormData(form: HTMLFormElement): Project {
  return {
    _id: (form.querySelector('#id') as HTMLInputElement).value,
    title: (form.querySelector('#title') as HTMLInputElement).value,
    description: (form.querySelector('#description') as HTMLInputElement).value,
    manager: (form.querySelector('#manager') as HTMLInputElement).value,
    employees: (
      form.querySelector('#Employees') as HTMLInputElement
    ).value.split(','),
    startDate: (form.querySelector('#startdate') as HTMLInputElement).value,
    endDate: (form.querySelector('#enddate') as HTMLInputElement).value,
  };
}

// Function to handle the update of the project
async function handleUpdateProject(
  projectId: string,
  updatedProject: Project,
): Promise<void> {
  try {
    // Implement the logic to update the project on the server
    await updateProject(projectId, updatedProject);
    // Optionally, update the corresponding row in the table
    const rowToUpdate = document.querySelector(
      `tr[data-project-id="${projectId}"]`,
    );
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
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

async function handleDeleteButtonClick(projectId: string): Promise<void> {
  try {
    // Confirm deletion with the user (you may use window.confirm or a modal)
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this project?',
    );

    if (confirmDeletion) {
      // Delete the project
      await deleteProject(projectId);

      // Optionally, you can remove the corresponding row from the table
      const rowToDelete = document.querySelector(
        `tr[data-project-id="${projectId}"]`,
      );
      if (rowToDelete) {
        rowToDelete.remove();
      }
    }
  } catch (error) {
    console.error('Error handling Delete button click:', error);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const projects = await fetchProjects();
    populateTable(projects);
  } catch (error) {
    console.error('Error loading project data:', error);
  }
});
export {};
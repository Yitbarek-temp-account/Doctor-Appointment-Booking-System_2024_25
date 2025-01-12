
interface ProjectData {
  title: string;
  description: string;
  manager: string;
  startDate: string;
  endDate: string;
  employees: string[]; 
}

async function addProject(projectData: ProjectData): Promise<void> {
  try {
    const userToken = localStorage.getItem('userToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (userToken !== null) {
      headers.append('Authorization', userToken);
    }
    const response = await fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add project: ${response.statusText}`);
    }

    console.log('Project added successfully!');
  } catch (error) {
    console.error('Error adding project:', error);
  }
}

function handleAddProject(): void {
  const titleInput = document.getElementById('title') as HTMLInputElement;
  const descriptionInput = document.getElementById(
    'description',
  ) as HTMLInputElement;
  const managerInput = document.getElementById('manager') as HTMLInputElement;
  const startDateInput = document.getElementById(
    'startdate',
  ) as HTMLInputElement;
  const endDateInput = document.getElementById(
    'endingdate',
  ) as HTMLInputElement;
  const employeeInput = document.getElementById('employee') as HTMLInputElement;

  // Split the comma-separated employee names into an array
  const employeesArray = employeeInput.value
    .split(',')
    .map((employee) => employee.trim());

  const projectData: ProjectData = {
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
  const addButton = document.querySelector(
    '.submitbutton',
  ) as HTMLButtonElement;
  addButton.addEventListener('click', handleAddProject);
});

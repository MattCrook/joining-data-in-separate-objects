const apiManager = {
  async getEmployee() {
    const employeeResponse = await fetch("http://localhost:8088/employees");
    return await employeeResponse.json();
  },
  async getDepartment() {
    const departmentResponse = await fetch("http://localhost:8088/departments");
    return await departmentResponse.json();
  },
  async getComputer() {
    const computerResponse = await fetch("http://localhost:8088/computers");
    return await computerResponse.json();
  }
};

let employeesArr = [];
let depArr = [];
let compArr = [];

const getEmployeeName = () => {
  const extractName = apiManager.getEmployee().then(response => {
    response.map(employee => {
      employeesArr.push(employee);
    });
    employeesArr.forEach(employee => {
      const name = employee.name;
      return name;
    });
  });
  return extractName;
};

const getDepartmentName = () => {
  const extractDepartment = apiManager.getDepartment().then(response => {
    response.map(elements => {
      depArr.push(elements);
      depArr.forEach(dept => {
        const department = dept.department_name;
        return department;
      });
    });
  });
  return extractDepartment;
};

const getComputerName = () => {
  const extractComputer = apiManager.getComputer().then(response => {
    response.map(elements => {
      compArr.push(elements);
      compArr.forEach(computer => {
        const computers = computer.computer_model;
        return computers;
      });
    });
  });
  return extractComputer;
};

Promise.all([getEmployeeName(), getDepartmentName(), getComputerName()]).then(arrayOfPromises => {
    arrayOfPromises.forEach(entity => {
      const employeeObject = { name, department, computers };
      console.log(employeeObject);
      const employeeHTML = htmlSkeleton(employeeObject);
      renderEmployee(employeeHTML);
    });
  }
);

// const renderToDom = () => {
//   const awaitEmployeeName = await getEmployeeName();
//   const awaitDepartmentName = await getDepartmentName();
//   const awaitComputerName = await getComputerName();

//   Promise.all(getEmployeeName(), getDepartmentName(), getComputer()).then( => {});
//   const employeeObject = { name, department, computers };
//   const employeeHTML = htmlSkeleton(employeeObject);
//   renderEmployee(employeeHTML);
// }

// function init() {
//   apiManager.getEmployee()
//   apiManager.getDepartment()
//   apiManager.getComputer()
// };
// init();

const htmlSkeleton = ({ name, department, computer }) => {
  return `
    <article class="employee">
    <header class="employee__name">
        <h1>${name}</h1>
    </header>
    <section class="employee__department">
        Works in the ${department} department.
    </section>
    <section class="employee__computer">
        Currently using a ${computer}
    </section>
</article>
    `;
};

const renderEmployee = employeeHTML => {
  const employeeContainer = document.getElementById("table_container");
  employeeContainer.innerHTML += employeeHTML;
};

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
const getEmployeeName = async () => {
  const response = await apiManager.getEmployee();
  response.map(employee => {
    return employeesArr.push(employee);
  });
  employeesArr.forEach(employee => {
    const name = employee.name;
    return name;
  });
};

const getDepartmentName = async () => {
  const response = await apiManager.getDepartment();
  response.map(elements => {
    return depArr.push(elements);
  });
  depArr.forEach(dept => {
    const department = dept.department_name;
    return department;
  });
};

const getComputerName = async () => {
  const response = await apiManager.getComputer();
  response.map(elements => {
    return compArr.push(elements);
  });
  compArr.forEach(computer => {
    const computers = computer.computer_model;
    return computers;
  });
};
const values = Promise.all([
  getEmployeeName(),
  getDepartmentName(),
  getComputerName()
]);
console.log("values:", values);

// resolved promise Object. This function grabs the resolved values of the promises defined above. name. department, computers are are "resolved promise":
//These values still need to be consumed to actually use the returned values from the promise.
const renderToDom = async () => {
  const name = await getEmployeeName();
  console.log("name:", name);
  const department = await getDepartmentName();
  const computers = await getComputerName();
  Promise.all([name, department, computers]).then(arrayOfPromises => {
    console.log(arrayOfPromises);
    const employeeObject = { name, department, computers };
    const employeeHTML = htmlSkeleton(employeeObject);
    renderEmployee(employeeHTML);
  });
};

renderToDom();

// Promise.all([getEmployeeName(), getDepartmentName(), getComputerName()]).then(
//   arrayOfPromises => {
//     arrayOfPromises.forEach(entity => {
//       const employeeObject = { name, department, computers };
//       console.log(employeeObject);
//       const employeeHTML = htmlSkeleton(employeeObject);
//       renderEmployee(employeeHTML);
//     });
//   }
// );

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





// AFTER ASYNC AWAIT
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
  // let employeesArr = [];
  // let depArr = [];
  // let compArr = [];
  
  // returning an array of arrays
  const getEntity = async () => {
    const name = apiManager.getEmployee();
    const department = apiManager.getDepartment();
    const computers = apiManager.getComputer();
    let values = await Promise.all([name, department, computers]);
    values.map(resources => {
      console.log(resources);
    });
  };
  const filterEntity = async returnedPromiseArray => {
    for (let entity of Object.keys(returnedPromiseArray)) {
      const filterResource = returnedPromiseArray[entity];
      return await filterResource;
    }
  };
  const renderToDom = async (getEntity) => {
    //if (typeof getEntity === "string") {
      getEntity.map(async element => {
        console.log(element);
        element.forEach(employee => {
          const name = employee.name;
          const department = employee.department_name;
          const computers = employee.computer_model;
          const employeeObject = { name, department, computers };
          const employeeHTML = htmlSkeleton(employeeObject);
          renderEmployee(employeeHTML);
        });
      });
  //}
  };

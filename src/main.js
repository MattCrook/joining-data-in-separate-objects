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

let entityArray = [];
// returning an array of arrays
const getEntity = async () => {
  const name = apiManager.getEmployee();
  const department = apiManager.getDepartment();
  const computers = apiManager.getComputer();
  let values = await Promise.all([name, department, computers]);
  values.map(entities => {
    // entities is array of objects
    return entityArray.push(entities);
  });
  console.log("array:", entityArray);
  entityArray.forEach(resource => {
    // resource is those objects extracted
    const name = resource[0].name;
    console.log(name)
    const department = resource[1].department_name;
    console.log(department)
    const computers = resource[2].computer_name;
    console.log(computers)
    //Object.entries(resource).forEach(foreignKey => {
      // extracting key alue pairs to test for strings (the foreign keys)
      //if (typeof foreignKey == "string") {
        const employeeObject = { name, department, computers };
        const employeeHTML = htmlSkeleton(employeeObject);
        renderEmployee(employeeHTML);
     // }
    //});
  });
};

// const filterEntity = async returnedPromiseArray => {
//   for (let entity of Object.keys(returnedPromiseArray)) {
//     const filterResource = returnedPromiseArray[entity];
//     return await filterResource;
//   }
// };

// const renderToDom = async getEntity => {
//   getEntity.map(async element => {
//     element.forEach(employee => {
//       const name = employee.name;
//       const department = employee.department_name;
//       const computers = employee.computer_model;
//       const employeeObject = { name, department, computers };
//       const employeeHTML = htmlSkeleton(employeeObject);
//       renderEmployee(employeeHTML);
//     });
//   });
// };

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

getEntity().catch(err => console.log(err));

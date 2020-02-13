const apiManager = {
  async getEmployees() {
    const employeeResponse = await fetch("http://localhost:8088/employees");
    return await employeeResponse.json();
  },
  async getDepartments() {
    const departmentResponse = await fetch("http://localhost:8088/departments");
    return await departmentResponse.json();
  },
  async getComputers() {
    const computerResponse = await fetch("http://localhost:8088/computers");
    return await computerResponse.json();
  }
};

// returning an array of arrays
const getEntity = async () => {
  const employeeName = apiManager.getEmployees;
  const employeeDepartment = apiManager.getDepartments;
  const employeeComputers = apiManager.getComputers;
  let values = await Promise.all([
    employeeName(),
    employeeDepartment(),
    employeeComputers()
  ]);

  const returnedEmployeeObject = values[0];
  const returnedDepartmentObject = values[1];
  const returnedComputersObject = values[2];
  returnedEmployeeObject.forEach(employee => {
    const departmentObject = returnedDepartmentObject.filter(department => department.id === employee.departmentId
    );
    const computerObject = returnedComputersObject.filter(computer => computer.id === employee.computerId
    );
    const name = employee.name;
    const department = departmentObject.department_name;
    console.log(departmentObject);
    const computer = computerObject.computer_name;
    const employeeObject = { name, department, computer };
    const employeeHTML = htmlSkeleton(employeeObject);
    renderEmployee(employeeHTML);
  });
};

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

// const which hold value of dept names array of objeect names ect... 3 of them
// for each eployee as  ieteating thru those get ref to naem and inside tht for loop and do filter for that item dept id ad filter on dept name and same for employee object
// and once ref to both of those
// once finish filter back oin scope of employee object

// one for each and inside of that scope are 2 sep filters
// return what you are filtering on one liner or have to use return
// do that for each eployee object
// once you have ref to neam dept, computer...all within the foreach.

// only forEach inside of employees

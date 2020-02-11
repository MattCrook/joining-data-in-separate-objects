const apiManager = {
  async getEmployee() {
    const response = await fetch("http://localhost:8088/teams");
    return await response.json();
  }
};

let teams = [];

apiManager.getEmployee().then(response => {
  response.map(team => {
    teams.push(team);
  });
  teams.forEach(employee => {
    const employeeHTML = htmlSkeleton(employee);
    renderEmployee(employeeHTML);
  });
});

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
apiManager.getEmployee();

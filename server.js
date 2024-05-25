// Dependencies____________________________________________________


// const { default: inquirer } = require("inquirer");
const express = require('express');

const inquirer = require(`inquirer`);
// const sequelize = require(`./config/connection`);
require(`console.table`);
const {Pool} = require(`pg`);

// Connect to database
const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: 'postgres',
      // Enter PostgreSQL password
      password: 'root',
      host: 'localhost',
      database: 'employeemanager_db'
  },
  console.log('Connected to the courses_db database!')
  )
  
//   pool.connect();


// Functions _______________________________________________

// Initilize Function ------------------------------------------------

function init(){
    console.clear();
    console.log(`                                            `);
    console.log("============================================");
    console.log(`           EMPLOYEE 
            MANAGER                          `);
    console.log(`============================================`);
    console.log(`                                            `);

    // Create an array of questions for user input.
    const questions = [
        {
            type:`list`,
            message: `What would you like to do?`,
            name: `action`,
            choices:[
                `View All Employees`,
                `View All Roles`,
                `View All Departments`,
                `Add Employee`,
                `Update Employee Role`,
                `Add Role`,
                `Add Department`,
                `Quit`,
            ],
            default: `Use arrow keys. Move up and down to reveal more choices.`
        },
    ];


// Get user input and execute the corresponding function.
inquirer.prompt(questions)

.then((answer) =>{ 
        switch (answer.action){
            case `View All Departments`:
                console.clear();
                viewAllDepartments();
                break;

            case `View All Roles`:
                console.clear();
                viewAllRoles();
                break;

            case `View All Employees`:
                 console.clear();
                 viewAllEmployees();
                break;

            case `Add Department`:
                console.clear();
                addDepartment();
                break;

            case `Add Role`:
                console.clear();
                addRole();
                break;

            case `Add Employee`:
                console.clear();
                addEmployee();
                break;

            case `Update Employee Role`:
                console.clear();
                updateEmployeeRole();
                break;

            default:
                console.log(`Thanks for using this application good bye`);
                process.exit(0);
            
            }

})

    .catch((error) => {
        console.error(`Error occured:`, error);
    });

};

    // View All Departments _______________________________________________-
    function viewAllDepartments(){
        const query = `SELECT id, name FROM department`;
        pool.query(query, function (err, results) {
            if (err) {
                console.error('Error occurred:', err);
                return;
            }
            console.clear();
            console.log(`                         `);
            console.log("=========================");
            console.log(`       DEPARTMENTS       `);
            console.log("=========================");
            console.table(results.rows); // Display results in a table
            process.exit(0);
        
        });

    }



    // View All Employees Function -----------------------

    function viewAllEmployees() {
            
        const query = `SELECT e.id as employee_id, 
        e.first_name || ' ' || e.last_name AS employee,
        m.first_name || ' ' || m.last_name AS manager, 
        role.title AS job_title, 
        department.name as Department, 
        role.salary  from EMPLOYEE e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        inner JOIN employee m on m.id = e.manager_id
        ORDER BY department_id`;

        pool.query(query, function (err, results) {
            if (err) {
                console.error('Error occurred:', err);
                return;
            }
            console.clear();
            console.log(`                                                                                              `);
            console.log("==============================================================================================");
            console.log(`                                       EMPLOYEES                                              `);
            console.log("==============================================================================================");
            console.table(results.rows); // Display results in a table
            process.exit(0);
            
        });
        
    }


        // View All Roles Function -----------------------

        function viewAllRoles() {

            const query = `SELECT role.id as role_id, 
            role.title as role_title, 
            department.name as department, 
            role.salary
            FROM role
            JOIN department on role.department_id = department.id
            ORDER BY department_id`;
            pool.query(query, function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.clear();
                console.log(`                                                 `);
                console.log("=================================================");
                console.log(`                    ROLES                        `)
                console.log("=================================================");
                console.table(results.rows); // Display results in a table
                process.exit(0);
            });
        }


        // Add Department Function -----------------------

        function addDepartment() {

            inquirer.prompt([
                
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the department: ',
                    validate: (name) => {
                        if(!name) {
                            return 'Please enter a Department name';
                        }
                        return true;
                    },
                },
            ])

            .then((answers) => {
                // const {departmentName} = answers;
                const query = `INSERT INTO department (name)
                                VALUES ('${answers.departmentName}')`;

                pool.query(query, function (err, results) {
                    if (err) {
                        console.error('Error occurred:', err);
                        return;
                    }
                    console.clear();
                    console.log(`                                                       `);
                    console.log("_______________________________________________________");
                    console.log(`      ${answers.departmentName} Department added successfully! `)
                    console.log("_______________________________________________________");
                    console.log(`                                                       `);
                    process.exit(0);
                });
            })

            .catch((error) => {
                console.error('Error occurred:', error);
            });
        }                



        // Add Employee Function -----------------------
   
        function addEmployee() {
            // Query to get all roles
            const queryAllRoles = `SELECT * FROM role`;
            pool.query(queryAllRoles, (err, result) => {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                
                const roles = result.rows; // Extract rows from result object
                
                // console.log(result.rows)
                // Manager choices

                // const listOfManager = "select id, title from role where title like '%Manager%'";

                // // pool.query(listOfManager, (err, managers) => {
                // //     if (err){console.error(`Error occurred:`, err);
                // //         return;
                // //     }
                // //     console.log("Managers", managers.rows)
                // // })
                

                const managerChoices = {
                    'DevOps Manager': 127,
                    'HR Manager': 128,
                    'Sales Manager': 126,
                    'Developer Manager': 124,
                    'Legal Manager': 121,
                    'Finance Manager': 119,
                    'None': null
                };
        
                // Prompt for employee details
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "What is the employee's first name?",
                        validate: (first_name) => {
                            if(!first_name) {
                                return 'Please enter a first name.';
                            }
                            return true;
                        },
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "What is the employee's last name?",
                        validate: (last_name) => {
                            if(!last_name) {
                                return 'Please enter a last name.';
                            }
                            return true;
                        },
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roles.map(role => role.title)
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Select the manager position responsible for this employee?",
                        choices: Object.keys(managerChoices),
                    }
                ]).then((answers) => {
                    const { firstName, lastName, role, manager } = answers;
        
                    // Find role ID
                    const roleId = roles.find(r => r.title === role).id;
                    const managerId = managerChoices[manager];
        
                    // Insert query
                    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
                    pool.query(query, [firstName, lastName, roleId, managerId], (err) => {
                        if (err) {
                            console.error('Error occurred:', err);
                            return;
                        }
                        console.clear();
                        console.log(`                                                              `);
                        console.log("______________________________________________________________");
                        console.log(`        Employee ${firstName} ${lastName} added successfully! `);
                        console.log("______________________________________________________________");
                        console.log(`                                                              `);
                        process.exit(0);
                    });
                }).catch((error) => {
                    console.error('Error occurred:', error);
                });
            });
        }
        
     // Add Role Function -----------------------
    
        
        
     function addRole() {
        //    const db = require('./config/connection'); 
            // Query to get all departments
            const queryAllDepartments = `SELECT id, name FROM department`;
            pool.query(queryAllDepartments, (err, departments) => {
                // console.log("departments", departments);
                // console.log(departments.rows.map(department => ({ name: department.name, value: department.id })));                
                if (err) throw err;
        
                // Prompt for role details
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newRoleTitle',
                        message: 'Enter the title of this new role: ',
                        validate: (title) => {
                            if(!title) {
                                return 'Please enter a role title.';
                            }
                            return true;
                        },
                    },
                    {
                        type: 'input',
                        name: 'newRoleSalary',
                        message: 'Enter the salary of the role: ',
                        validate: (salary) => {
                            if (!salary || isNaN(salary)) {
                                return 'Please enter a valid annual salary for this role. Format: 100000 (no commas)';
                                
                            }
                            return true;
                        },
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the Department:',
                        choices: departments.rows.map(department => ({ name: department.name, value: department.id }))
                        // choices: departments.map(({ id, name }) => ({name: name, value: id, }))
                        // console.log(departments.rows.map(department => ({ name: department.name, value: department.id })))
                    }
                ]).then((answers) => {
                    
                    const { newRoleTitle, newRoleSalary, departmentId } = answers;
                            
                const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
                    pool.query(query, [newRoleTitle, newRoleSalary, departmentId, ], (err) => {
                        if (err) {
                            console.error('Error occurred:', err);
                            return;
                        }
                        console.clear();
                        console.log(`                                                  `);
                        console.log("__________________________________________________");
                        console.log(`        New Role added successfully!              `)
                        console.log("__________________________________________________");
                        console.log(`                                                  `);
                        process.exit(0);
                    });
                }).catch((error) => {
                    console.error('Error occurred:', error);
                });
            })
        }
        

         // Update Employee Role Function -----------------------
        
         function updateEmployeeRole() {

            const queryEmployee = `SELECT id, first_name || ' ' || last_name AS name FROM employee order by name`;

            pool.query(queryEmployee, (err, employees) => {
                if (err) throw err;
                // console.log("employees result",employees.rows);        
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Which employee do you want to update?',
                        choices: employees.rows.map(employee => ({ name: employee.name, value: employee.id }))
                    }
                ])
                .then(({ employeeId }) => {

                    const queryNewRole = `SELECT id, title FROM role order by title`;
                    
                    pool.query(queryNewRole, (err, roles) => {
                        if (err) throw err;
                        // console.log("Roles data", roles);

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'What is the new role?',
                                choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
                            }
                        ]).then(({ roleId }) => {
                            
                            const queryUpdateRole = `UPDATE employee SET role_id = $1 WHERE id = $2`

                            pool.query(queryUpdateRole, [roleId, employeeId], (err) => {
                                if (err) throw err;
                                console.clear();
                                console.log(`                                                  `);
                                console.log("__________________________________________________");
                                console.log(`      Employee's role updated successfully!`       );
                                console.log("__________________________________________________");
                                console.log(`                                                  `);
                                
                                process.exit(0);
                            });
                            
                        });

                    });

                });

            });
            
        }
        
       
    //______________________________________
       
       

// INITIALIZE _________________________

    init();
//______________________________________

    



DROP DATABASE IF EXISTS employeemanager_db;
create database employeemanager_db;
\c employeemanager_db;

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);


SELECT e.id as employee_id, 
e.first_name || ' ' || e.last_name AS employee,
m.first_name || ' ' || m.last_name AS manager, 
role.title AS job_title, 
department.name as Department, 
role.salary  from EMPLOYEE e
JOIN role ON e.role_id = role.id
JOIN department ON role.department_id = department.id
inner JOIN employee m on m.id = e.manager_id
ORDER BY department_id;

SELECT employee.id, 
employee.first_name, 
employee.last_name, 
role.title AS job_title, 
department.name as Department, 
role.salary  from EMPLOYEE
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
ORDER BY department_id;














SELECT role.id as role_id, 
role.title as role_title, 
department.name as department, 
role.salary
FROM role
JOIN department on role.department_id = department.id
ORDER BY department_id;

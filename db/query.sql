USE empl_tracker_db;

--View all departments
SELECT * FROM department

--View all roles
SELECT employee.id, employee.title, department.dept_name, employee.salary
FROM employee
JOIN department ON employee.department_id = department.id;

--View all employees
SELECT a.id, a.first_name, a.last_name, 
employee.title, department.dept_name, employee.salary, CONCAT(b.first_name, ' ', b.last_name) as manager
FROM employee a
LEFT JOIN employee ON a.role_id = employee.id
LEFT JOIN department ON employee.department_id = department.id
LEFT JOIN employee b ON a.manager_id = b.id;

--Add a department
INSERT INTO department (dept_name) VALUES (?)

--Add a role
INSERT INTO employee (title, salary, department_id) VALUES (?, ?, ?)

--Add an employee 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)

--Update an employee
UPDATE employee SET role_id = ${roleID} WHERE first_name = " " AND last_name = " "

--Total utilized budget of a department—in other words, 
--the combined salaries of all employees in that department.
SELECT sum(employee.salary)
FROM employee
JOIN employee ON employee.role_id = employee.id
JOIN department ON employee.department_id = department.id
WHERE department.dept_name = ?

--View employees by department 
SELECT department.dept_name, CONCAT(employee.first_name, ' ', employee.last_name) as  employee
FROM employee
JOIN employee ON employee.role_id = employee.id
JOIN department ON employee.department_id = department.id
WHERE department.dept_name = ?;

--View employees by manager
SELECT CONCAT(b.first_name, ' ', b.last_name) as manager, CONCAT(a.first_name, ' ', a.last_name) as employee
FROM employee a
LEFT JOIN employee ON a.role_id = employee.id
LEFT JOIN department ON employee.department_id = department.id
LEFT JOIN employee b ON a.manager_id = b.id
WHERE a.manager_id = ?

const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');



const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'empl_tracker_db'
    },

);
db.connect(async (err) => {
    if (err) { console.log(err) }
    else {
        console.log(`Connected to empl_tracker_db.`)
        await init();
    }
});




function init() {
    const menu = [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'choices',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit']
    }];
    console.log(' ')
    inquirer.prompt(menu)

        .then((answer) => {
            if (answer.choices == 'View all departments') {
                viewDepartments();
            }
            else if (answer.choices == 'View all roles') {
                viewRoles();
            }
            else if (answer.choices == 'View all employees') {
                viewEmployees();
            }
            else if (answer.choices == 'Add a department') {
                addDepartment();
            }
            else if (answer.choices == 'Add a role') {
                addRole();
            }
            else if (answer.choices == 'Add an employee') {
                addEmployee();
            }
            else if (answer.choices == 'Update an employee role') {
                updateEmployee();
            }
            else if (answer.choices == 'Quit') {
                console.log('Goodbye!');
                process.exit();

            }
        });
}
function viewDepartments() {
    console.log(' ')
    db.promise().query('SELECT * FROM department').then(([vDepartments]) => {

        console.table(vDepartments);
        console.log(' ');
        init();
    })
        .catch(console.log);
}


function viewRoles() {
    console.log(' ')
    db.promise().query('SELECT * FROM role').then(([vRoles]) => {
        console.table(vRoles);
        console.log(' ');
        init();
    });
}

function viewEmployees() {
    console.log(' ')
    db.promise().query('SELECT * FROM employee').then(([results]) => {
        console.table(results);
        console.log(' ');
        init();
    });
}

function addDepartment() {
    console.log(' ')
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department'
        }
    ]).then((answer) => {
        console.log(' ')
        db.promise().query('INSERT INTO department SET ?', { department_name: answer.department }).then(([results]) => {
            console.table(results)
            console.log('Department added!');
            console.log(' ')
            init();
        });
    });
}

function addRole() {
    console.log(' ')
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department ID of the role?',
            name: 'department_id'
        }
    ]).then((answer) => {
        console.log(' ')
        db.promise().query('INSERT INTO role SET ?', { title: answer.title, salary: answer.salary, department_id: answer.department_id })
            .then(([results]) => {
                console.table(results)
                console.log('Role added!');
                init();
            });
    });
}

function addEmployee() {
    console.log(' ')
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'What is the role ID of the employee?',
            name: 'role_id'
        },
        {
            type: 'input',
            message: "What is the ID of this employees manager?",
            name: 'manager_id'
        }
    ]).then((answer) => {
        console.log(' ')
        db.promise().query('INSERT INTO employee SET ?', { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id }).then(([results]) => {
            console.log(results)
            console.log('Employee added!');
            init();
        });
    });
}

function updateEmployee() {
    console.log(' ')
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the ID of the employee you would like to update?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is the new role ID of the employee?',
            name: 'role_id'
        }
    ]).then((answer) => {
        console.log(' ')
        db.promise().query('UPDATE employee SET ? WHERE ?', [{ role_id: answer.role_id }, { id: answer.id }], function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results)
                console.log('Employee updated!');
                init();
            }
        });
    });
}




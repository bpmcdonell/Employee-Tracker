INSERT INTO department (name)
VALUES ("Management"),
        ("Development"),
        ("Design"),
        ("Finance");
        ("Sales")

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 250000, 1),
        ("CFO", 150000, 1),
        ("Lead Developer", 150000, 2),
        ("UX Developer", 120000, 3),
        ("UI Developer", 100000, 3),
        ("Accountant", 100000, 4);
        ("Developer", 80000, 2)
        ("Salesperson", 80000, 5);
        ("Intern", 10000, 2)
        ("that one guy who does stuff", 100000, 1")

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
        ("Amelia", "Rodriguez", 2, 1),
        ("Ethan", "Park", 2, 1),
        ("Sophia", "Chen", 3, 3),
        ("Owen", "Patel", 2, 1),
        ("Ava", "Campbell", 4, 1),
        ("Isabella", "Wong", 4, 2),
        ("Oliver", "Dam", 6, 1);







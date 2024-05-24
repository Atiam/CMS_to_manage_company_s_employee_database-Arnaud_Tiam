-- DEPARTMENT SEEDS
INSERT INTO department(name)
VALUES  ('DevOps'),
        ('HR'),
        ('Sales'),
        ('Development'),
        ('Legal'),
        ('Finance');

-- ROLE SEEDS

INSERT INTO ROLE (title, salary, department_id)
VALUES  ('DevOps Manager', 300000, 1),
        ('Senior DevOps engineer', 200000, 1),
        ('Junior DevOps engineer', 100000, 1),
        ('HR Manager', 230000, 2),
        ('HR Worker', 130000, 2),
        ('Sales Manager', 210000, 3),
        ('Saler', 80000, 3),
        ('Developer Manager', 350000, 4),
        ('Senior Developer', 240000, 4),
        ('Junior Developer', 160000, 4),
        ('Legal Manager', 200000, 5),
        ('Legal worker', 10000, 5),
        ('Finance Manager', 280000, 6),
        ('Finance worker', 140000, 6);
        

-- EMPLOYEE SEEDS

INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id)
VALUES  ('Arnaud', 'Tiam', 9, null), 
        ('Eric', 'larson', 8, null), 
        ('Ben', 'carson', 2, null),
        ('Bill', 'Shapman', 3, null),
        ('Tagne', 'Yoou', 5, null), 
        ('David', 'Sidze', 6, null),
        ('Rosine', 'Magne', 7, null),
        ('Milie', 'Tchomtchoua', 9, null),
        ('Bell', 'zida', 10, null),
        ('August', 'Zoltan', 11, null),
        ('Gust', 'Cooper', 12, null),
        ('Iris', 'Bostin', 13, null),
        ('Romi', 'Chensi', 14, null),
        ('Auli', 'Parton', 14, null),
        ('Ousman', 'Sonko', 13, null),
        ('Fail', 'Ruben', 12, null),
        ('Henry', 'Kengne', 11, null),
        ('Boby', 'Kwogne', 10, null),
        ('Camile', 'Tango', 9, null),
        ('Caiden', 'Tiam', 8, null),
        ('Riley', 'Abigail', 7, null),
        ('Celeste', 'Deffo', 6, null),
        ('Mayline', 'Gwokam', 1, null),
        ('Carine', 'Tiam', 4, null),
        ('Frank', 'Mouto', 3, null),
        ('valiencia', 'Mouto', 2, null);


-- Update employee set manager_id = 126 where id = 110;
-- Update employee set manager_id = 126 where id = 125;
-- Update employee set manager_id = 126 where id = 111;

-- Update employee set manager_id = 124 where id = 106;
-- Update employee set manager_id = 124 where id = 123;
-- Update employee set manager_id = 124 where id = 112;
-- Update employee set manager_id = 124 where id = 105;
-- Update employee set manager_id = 124 where id = 122;
-- Update employee set manager_id = 124 where id = 113;


-- Update employee set manager_id = 121 where id = 114;
-- Update employee set manager_id = 121 where id = 120;
-- Update employee set manager_id = 121 where id = 115;

-- Update employee set manager_id = 119 where id = 116;
-- Update employee set manager_id = 119 where id = 118;
-- Update employee set manager_id = 119 where id = 117;






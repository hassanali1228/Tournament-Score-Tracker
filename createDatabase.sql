ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'S1mpl3p@ss';

flush privileges;

SELECT CURRENT_USER();

CREATE DATABASE tournament;

USE tournament;

CREATE TABLE admins(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tournaments(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    creator VARCHAR(255) NOT NULL UNIQUE,
    admin_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES admins(id)
);

DROP TABLE tournaments;

CREATE TABLE teams(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    tournament_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);

CREATE TABLE matches(
	id INT NOT NULL AUTO_INCREMENT,
	team1_id INT NOT NULL,
    team2_id INT NOT NULL,
    score1 INT NOT NULL,
    score2 INT NOT NULL,
    fouls1 INT NOT NULL,
    fouls2 INT NOT NULL,
    tournament_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (team1_id) REFERENCES teams(id),
    FOREIGN KEY (team2_id) REFERENCES teams(id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);

ALTER TABLE admins
DROP COLUMN passowrd;

ALTER TABLE admins
ADD COLUMN password VARCHAR(255) NOT NULL;

ALTER TABLE admins
DROP COLUMN email;

ALTER TABLE admins
ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE;
       
ALTER TABLE admins MODIFY password VARCHAR(255) NOT NULL AFTER email;

ALTER TABLE tournaments AUTO_INCREMENT = 1;

ALTER TABLE tournaments
MODIFY COLUMN creator VARCHAR(255) NOT NULL UNIQUE;

INSERT INTO admins (name, email, password)
VALUES ('A', 'ab', 'abcd'),
	   ('B', 'ax', 'abdd'),
       ('A', 'ac', 'abxy');

DELETE FROM admins WHERE id = 2;

SELECT * FROM admins
JOIN tournaments ON admins.id = tournaments.admin_id;

SELECT * FROM admins;

SELECT * FROM tournaments;
SELECT id FROM tournaments WHERE name = "BRIT";
DELETE FROM tournaments WHERE id BETWEEN 1 and 100;

SELECT * FROM teams;

SELECT * FROM matches;

SELECT COUNT(1)
FROM admins
WHERE email = 'ny@york.com';
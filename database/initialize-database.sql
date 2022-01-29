-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	hashedPassword VARCHAR(80) NOT NULL,
	CONSTRAINT emailUnique UNIQUE (email)
);

CREATE TABLE todo (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	description VARCHAR(100)
);

-- Create a dummy account for testing.
INSERT INTO accounts (email, hashedPassword) VALUES ("mikael.diep@gmail.com", "$2a$10$k6MLSu1uYauHL8IWIihysOTXUb6g/4IaAVHhZ/8KFYK90TBiUCz9G");
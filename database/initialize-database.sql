-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	hashedPassword VARCHAR(100) NOT NULL,
	CONSTRAINT emailUnique UNIQUE (email)
);

CREATE TABLE todos (
    id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title varchar(50) NOT NULL,
    description varchar(100) DEFAULT NULL,
    accountId int(10) UNSIGNED NOT NULL,
    CONSTRAINT UC_todos UNIQUE (accountId, title),
    CONSTRAINT `FK_accountsTodos` 
        FOREIGN KEY (accountId)
        REFERENCES accounts(id)
        ON DELETE CASCADE
);


-- Create a dummy account for testing.
INSERT INTO accounts (email, hashedPassword) VALUES ("mikael.diep@gmail.com", "$2a$10$k6MLSu1uYauHL8IWIihysOTXUb6g/4IaAVHhZ/8KFYK90TBiUCz9G");




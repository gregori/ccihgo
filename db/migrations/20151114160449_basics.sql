
-- +goose Up
PRAGMA foreign_keys = off;

-- Table: material
CREATE TABLE material (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
	name VARCHAR(100) NOT NULL , 
	created_at DATETIME NOT NULL DEFAULT (CURRENT_TIME),
	modified_at DATETIME NOT NULL DEFAULT (CURRENT_TIME)
);

-- Table: sector
CREATE TABLE sector (
	id INTEGER PRIMARY KEY NOT NULL, 
	name VARCHAR (100) NOT NULL, 
	created_at DATETIME NOT NULL DEFAULT (CURRENT_TIME), 
	modified_at DATETIME NOT NULL DEFAULT (CURRENT_TIME)
);

-- Table: antibiotic
CREATE TABLE antibiotic (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	name VARCHAR(50) NOT NULL , 
	gram VARCHAR(1) NOT NULL , 
	created_at DATETIME DEFAULT (CURRENT_TIME), 
	modified_at DATETIME DEFAULT (CURRENT_TIME)
);
-- Table: bacteria
CREATE TABLE bacteria (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
	name VARCHAR(100) NOT NULL , 
	gram VARCHAR(1) NOT NULL , 
	created_at DATETIME NOT NULL DEFAULT (CURRENT_TIME), 
	modified_at DATETIME NOT NULL DEFAULT (CURRENT_TIME)
);

-- Table: profile
CREATE TABLE profile (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
	sector_id INTEGER REFERENCES sector (id), 
	material_id INTEGER REFERENCES material (id), 
	collected_at DATE, 
	created_at DATETIME DEFAULT (CURRENT_TIME), 
	modified_at DATETIME DEFAULT (CURRENT_TIME)
);

-- Table: trial
CREATE TABLE trial (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
	antibiotic_id INTEGER REFERENCES antibiotic (id) NOT NULL, 
	bacteria_id INTEGER REFERENCES bacteria (id) NOT NULL, 
	result VARCHAR (1) NOT NULL, 
	profile_id INTEGER NOT NULL REFERENCES profile (id)
);

PRAGMA foreign_keys = on;

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

PRAGMA foreign_keys = off;

DROP TABLE trial;
DROP TABLE profile;
DROP TABLE bacteria;
DROP TABLE antibiotic;
DROP TABLE sector;
DROP TABLE material;

PRAGMA foreign_keys = on;

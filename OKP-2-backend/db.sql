/* *************** Users *************** */
CREATE TABLE users
(
 name         character varying(16) NOT NULL,
 password     character varying(64) NOT NULL,
 role         character varying(8) NOT NULL,
 CONSTRAINT   PK_User PRIMARY KEY ( name )
);
CREATE USER users WITH PASSWORD 'khjgvbhn23o8ryi834ierufhwiuguygqwd' CREATEDB;
CREATE DATABASE users
    WITH 
    OWNER = users
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE USER tasks WITH PASSWORD 'khjgvbhn23o8ryi834ierufhwiuguygqwd' CREATEDB;
CREATE DATABASE tasks
    WITH 
    OWNER = users
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE USER gateway WITH PASSWORD 'khjgvbhn23o8ryi834ierufhwiuguygqwd' CREATEDB;
CREATE DATABASE gateway
    WITH 
    OWNER = users
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE USER supertokens WITH PASSWORD 'khjgvbhn23o8ryi834ierufhwiuguygqwd' CREATEDB;
CREATE DATABASE supertokens
    WITH 
    OWNER = supertokens
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

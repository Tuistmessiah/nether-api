CREATE TABLE section(
    id              SERIAL PRIMARY KEY, 
    section_name    VARCHAR(64),
    page_ref        VARCHAR(64),
    config          TEXT
);  
CREATE TABLE tuno(
    id          SERIAL PRIMARY KEY, 
    first_name  VARCHAR(64),
    last_name   VARCHAR(64)
    -- "nickeName" VARCHAR(64),
    -- instrument  VARCHAR(64),
    -- "freshmanDate"  TIMESTAMP NOT NULL,
    -- "veteranDate"   TIMESTAMP NOT NULL,
    -- "tunoId"    INTEGER,
    -- FOREIGN KEY ("tunoId") REFERENCES tuno(id)
);  
-- TODO: Expand table for other properties
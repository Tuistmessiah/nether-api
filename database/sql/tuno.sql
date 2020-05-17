CREATE TABLE tuno(
    id          SERIAL PRIMARY KEY, 
    "firstName" VARCHAR(64),
    "lastName"  VARCHAR(64)
    -- "nickeName" VARCHAR(64),
    -- instrument  VARCHAR(64),
    -- "freshmanDate"  TIMESTAMP NOT NULL,
    -- "veteranDate"   TIMESTAMP NOT NULL,
    -- "tunoId"    INTEGER,
    -- FOREIGN KEY ("tunoId") REFERENCES tuno(id)
);

-- (AUTOMINCREMENT 1)
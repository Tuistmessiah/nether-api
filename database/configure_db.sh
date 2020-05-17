
export PGPASSWORD='postgres123'

echo "Configuring postgres DB:"

echo "Dropping old DB"
dropdb -U postgres postgres
echo "Creating new DB"
createdb -U postgres postgres
echo "Creating new tables"
psql -U postgres postgres < ./database/sql/tuno.sql
echo "Populating new tables"
psql -U postgres postgres < ./database/sql/populate-tuno.sql

echo "Configuration complete!"

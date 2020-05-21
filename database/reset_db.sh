
# TODO: REMOVE PASSWORD HERE LOL!
export PGPASSWORD='postgres123'

echo " ---> Reseting DB:"

echo "Dropping old DB..."
dropdb -U postgres postgres

echo "Creating new DB..."
createdb -U postgres postgres

echo "Creating tables..."
psql -U postgres postgres < ./sql/tuno.sql
psql -U postgres postgres < ./sql/section.sql
psql -U postgres postgres < ./sql/sound.sql

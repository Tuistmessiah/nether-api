const shell = require("shelljs");

shell.echo("Reseting DB:");
shell.exec("./database/reset_db.sh");

shell.echo("RPopulating DB:");
shell.exec("node ./database/operations/populate-db.js");

# CDP angular learning app

## api server
* uses npm `json-server` and `json-server-auth` for a quick prototype api
* Run with `npm start` in root directory
* Permissions are not enforced in api
* `db.json` is the database file, can copy `db.json.example` to get started
* to take a snapshot of the database run s and then enter in the command line where the server app is running.
Snapshots saved to `/snapshots` directory if using npm start command
* the default run command has a bit of a delay in responses to simulate longer api calls
* `cdp` folder contains angular app
* User credentials in example file to get started
	* "email": "you@stgconsulting.com", "password": "so-insecure"
	* "email": "you+2@stgconsulting.com", "password": "so-insecure"

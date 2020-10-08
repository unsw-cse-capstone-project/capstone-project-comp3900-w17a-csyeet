## Setup

1. Install python (version >= 3.6.1)
2. Inside the `backend` directory, run `python -m venv env`
   - This creates a virtual environment where we isolate the projects dependencies
3. Activate the virtual environment:
   - If on a Windows terminal, run `env\Scripts\activate.bat`
   - If on Windows but using a bash terminal, run `source env/Scripts/activate`
   - Otherwise run `source env/bin/activate`
   
    You should see `(env)` on your terminal prompt
4. Install the dependencies via `python -m pip install -r requirements.txt`
5. Download the appropriate PostgreSQL 10.14 installer for your platform [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
6. Install PostgreSQL, setting the superuser (usually `postgres`) password to `password` and ensuring the server will listen on the default port of 5432.
7. Run `psql -U postgres -f backend/init_db.sql` (replacing `postgres` with the appropriate superuser, as necessary).
8. Run `flask db upgrade`

## Development

Run the backend with `flask run`. The API is then running with base URL `http://localhost:5000/` and documentation can be viewed here.

Docs:
- REST API framework - [Flask-RESTX](https://flask-restx.readthedocs.io) and [Flask-Login](https://flask-login.readthedocs.io)
- ORM framework - [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- DB schema migration - [Flask-Migrate](https://flask-migrate.readthedocs.io)

API endpoints should be [documented](https://flask-restx.readthedocs.io/en/latest/swagger.html#the-api-marshal-with-decorator) and [validated](https://flask-restx.readthedocs.io/en/latest/swagger.html#the-api-expect-decorator).

### Tips
1. In the bottom bar of VSCode, hover over the Python interpreter and make sure it points to the executable inside the `env` folder.
   1.1 If it doesn't, click the button and select the interpreter. Note: If you don't see it in the list then open and close VSCode.
2. If you make changes to the database `models` you need to do the following:
   1. Run `flask db migrate`, which outputs something like `Generating <projectDir>\backend\migrations\versions\3549dc4d94e8_.py`
   2. Inspect the contents of the file and confirm the commands make sense based on the changes you made. If not, manually modify them.
   3. Run `flask db upgrade`
3. To locally smoke test an api endpoint, ideally use the app's frontend. But if it's not yet built/hooked up:
   1. Use the Swagger UI available at http://localhost:5000
   2. Use [Postman](https://www.postman.com/downloads/) - the API can be [exported as a Postman collection](https://flask-restx.readthedocs.io/en/latest/postman.html)
   3. Use `curl`
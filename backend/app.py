import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

BASEDIR = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL") or 'sqlite:///' + os.path.join(BASEDIR, 'friends.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Serve the static folder (the distr) you got after running the npm run build
frontend_folder = os.path.join(os.getcwd(), "..", "frontend", "distr")
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    """Deploys the static folder"""
    if not filename:
        filename = "index.html"
    return send_from_directory(frontend_folder, filename)


import routes

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run()
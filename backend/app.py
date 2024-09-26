from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

import routes

if __name__ == '__main__':
    app.run()
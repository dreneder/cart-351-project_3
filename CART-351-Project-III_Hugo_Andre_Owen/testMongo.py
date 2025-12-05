import os
from datetime import datetime

from dotenv import load_dotenv
from flask import Flask, render_template, request
from flask_pymongo import PyMongo

load_dotenv()  # Load variables from .env and .flaskenv

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret")

db_user = os.getenv("MONGODB_USER")
db_pass = os.getenv("DATABASE_PASSWORD")
db_name = os.getenv("DATABASE_NAME")
app.config["MONGO_URI"] = (
    f"mongodb+srv://{db_user}:{db_pass}@cluster0.6ifd1w5.mongodb.net/{db_name}?retryWrites=true&w=majority"
)
mongo = PyMongo(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/mongoTest", methods=["GET", "POST"])
def mongoTest():
    message = None
    error = None

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        entry = request.form.get("entry", "").strip()

        if not username or not entry:
            error = "Username and entry are required."
        else:
            try:
                result = mongo.db.project3.insert_one(
                    {
                        "username": username,
                        "entry": entry,
                        "created_at": datetime.utcnow(),
                    }
                )
                message = f"Saved! Document id: {result.inserted_id}"
            except Exception as exc:  # pragma: no cover - runtime logging only
                error = f"Could not save to MongoDB: {exc}"

    return render_template("mongoTest.html", message=message, error=error)



app.run(debug=True)

#Importing and setting up the python document
from flask import Flask, render_template, Response, request, jsonify
from flask_pymongo import PyMongo
import json
import os
from datetime import datetime


app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev_secret")

db_user = os.getenv("MONGODB_USER")
db_pass = os.getenv("DATABASE_PASSWORD")
db_name = os.getenv("DATABASE_NAME")
app.config["MONGO_URI"] = (
     f"mongodb+srv://{db_user}:{db_pass}@cluster0.6ifd1w5.mongodb.net/{db_name}?retryWrites=true&w=majority"
)
mongo = PyMongo(app)

UPLOAD_FOLDER = 'static/uploads' 

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

#The default route
@app.route("/")
def home():
      return render_template("home.html")

#The journal entry submit route
@app.route("/submitEntry", methods=["GET", "POST"])
def submitEntry():
     return render_template("submitEntry.html")

#The collective entries submit route
@app.route("/collectiveEntries")
def collectiveEntries():
     return render_template("collectiveEntries.html")

# route to accept entry data from the JS
@app.route("/entries", methods=["POST"])
def entries():
     payload = request.get_json(silent=True) or {}
     if not payload:
          return jsonify({"error": "No JSON payload provided"}), 400

     username = (payload.get("username") or "").lower()

     entry_doc = {
          "entry": payload.get("entry"),
          "sentiment": payload.get("sentiment"),
          "username": username,
          "datetime": datetime.utcnow(),
     }

     try:
          result = mongo.db.project3.insert_one(entry_doc)
          return jsonify({"inserted_id": str(result.inserted_id)}), 201
     except Exception as exc:
          return jsonify({"error": "Failed to save entry", "details": str(exc)}), 500

#Running the application
app.run(debug=True)

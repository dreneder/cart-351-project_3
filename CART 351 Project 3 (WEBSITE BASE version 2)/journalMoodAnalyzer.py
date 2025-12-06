#Importing and setting up the python document
from flask import Flask, render_template, Response, request
import json
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads' 

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

#The default route
@app.route("/")
def home():
      return render_template("home.html")

#The journal entry submit route
@app.route("/submitEntry")
def submitEntry():
     return render_template("submitEntry.html")

#The collective entries submit route
@app.route("/collectiveEntries")
def collectiveEntries():
     return render_template("collectiveEntries.html")

#Running the application
app.run(debug=True)
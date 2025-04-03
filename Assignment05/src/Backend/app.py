from flask import Flask, render_template, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [] #TODO

@app.route('/register', methods=['POST'])
def register():
    ...

@app.route('/login', methods=['POST'])
def login():
    ...

@app.route('/testimonials', methods=['GET'])
def testimonials():
    ...

@app.route('/enroll/<student_id>', methods=['POST'])
def enroll():
    ...

@app.route('/drop/<student_id>', methods=['DELETE'])
def drop():
    ...

@app.route('/courses', methods=['GET'])
def courses():
    ...

@app.route('/student_courses/<student_id>', methods=['GET'])
def student_courses():
    ...

if __name__ == "__main__":
    app.run(debug=True, port=5001)
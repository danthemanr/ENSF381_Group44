from flask import Flask, render_template, request, jsonify
import json
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

students = {
x[1]: {'id':x[0], 'username':x[1],'password':x[2],'email':x[3],             'enrolled_courses':x[4],} for x in [
    (111_111_111, 'dan',          'Qq`11111',     'danthemanr123@gmail.com',{4, 3, 7, 1, 6, 10})
    (874_278_597, 'alice',        'Password123!', 'alice108@melissa.tv',    {5, 8, 7}),
    (572_155_615, 'bob',          'Secure456@',   'bob964@april.biz',       {5}),
    (183_252_382, 'charlie',      'Qwerty789#',   'charlie761@billy.biz',   {10, 2, 1}),
    (854_395_328, 'diana',        'Hunter2$',     'diana047@jasper.info',   {2, 5}),
    (231_349_409, 'eve',          'Passpass%',    'eve373@annie.ca',        {3, 9, 5, 10, 4}),
    (295_180_613, 'frank',        'Letmein^',     'frank591@kory.org',      {6, 7, 10, 4}),
    (367_250_208, 'grace',        'Trustno1&',    'grace187@karina.biz',    {}),
    (522_283_999, 'heidi',        'Admin123*',    'heidi631@dana.io',       {10, 4}),
    (522_872_038, 'ivan',         'Welcome1~',    'ivan042@hotmail.com',    {1, 7, 3, 6, 9, 8}),
    (381_692_650, 'judy',         'password1-',   'judy416@yesenia.net',    {5, 3, 9}),
    ]
}
findStudent = {x['id']:x['username'] for x in students}
def add_student(data):
    newStudent = {}
    for key in data: #should have username, password, and email
        newStudent[key] = data[key]
    newStudent['id'] = random.randrange(100_000_000, 1000_000_000)
    newStudent['enrolled_courses'] = []
    students.append(newStudent)
    findStudent['id'] = newStudent['username']
    return id

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    for username in students:
        if username == data['username']:
            return jsonify({'success': False, 'msg': f'The username {data['username']} is already taken'})
    id = add_student(data)
    print("Student added:", students[data['username']])
    return jsonify({'success': True, 'msg': f'You have been successfully registered! Your id is {id}'})

@app.route('/login', methods=['POST']) #TODO: LoginForm.js needs to be modified
def login():
    data = request.get_json()
    try:
        if students[data['username']]['password'] == data['password']:
            return jsonify({'success': True, 'msg': ''})
        else:
            return jsonify({'success': False, 'msg': 'Invalid username or password!'})
    except KeyError:
        return jsonify({'success': False, 'msg': f'The username {data['username']} is not in use'})
    except:
        return jsonify({'success': False, 'msg': 'Server side error, try again later'})

@app.route('/testimonials', methods=['GET'])
def testimonials():
    ...

@app.route('/enroll/<student_id>', methods=['POST']) #TODO: CoursePage.js needs to be modified
def enroll(student_id):
    username = findStudent[student_id]
    if username not in students:
        return jsonify({'success': False, 'msg': 'Invalid student id'})
    data = request.get_json()
    course_id = data['course']
    with open('courses.json', 'r') as f:
        courses = {x['id']:x for x in json.load(f)}
    if course_id not in courses:
        return jsonify({'success': False, 'msg': 'Invalid course id'})
    if course_id not in students[username]['enrolled_courses']:
        students[username]['enrolled_courses'].add(course_id)
        return jsonify({'success': True, 'msg': f'Successfuly enrolled in {courses[course_id]}'})
    else:
        return jsonify({'success': True, 'msg': f'Already enrolled in {courses[course_id]}'})

@app.route('/drop/<student_id>', methods=['DELETE'])
def drop(student_id):
    username = findStudent[student_id]
    if username not in students:
        return jsonify({'success': False, 'msg': 'Invalid student id'})
    data = request.get_json()
    course_id = data['course']
    with open('courses.json', 'r') as f:
        courses = {x['id']:x for x in json.load(f)}
    if course_id not in courses:
        return jsonify({'success': False, 'msg': 'Invalid course id'})
    if course_id not in students[username]['enrolled_courses']:
        return jsonify({'success': True, 'msg': f'Not enrolled in {courses[course_id]}'})
    else:
        students[username]['enrolled_courses'].remove(course_id)
        return jsonify({'success': True, 'msg': f'Successfuly dropped {courses[course_id]}'})

@app.route('/courses', methods=['GET'])
def courses():
    ...

@app.route('/student_courses/<student_id>', methods=['GET'])
def student_courses(student_id):
    student = students[findStudent[student_id]]
    with open('courses.json', 'r') as f:
        courses = {x for x in json.load(f) if x['id'] in student['enrolled_courses']}
    return jsonify(courses)


if __name__ == "__main__":
    app.run(debug=True, port=5001)
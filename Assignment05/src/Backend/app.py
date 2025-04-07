# Jason  Nguyen 30209015
# Daniel Rey    30216790
from flask import Flask, render_template, request, jsonify
import json
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

keys = ['id',     'username',     'password',     'email',                  'enrolled_courses']
students = {
x[1]:{keys[0]:x[0],keys[1]:x[1],  keys[2]:x[2],   keys[3]:x[3],             keys[4]:x[4],} for x in [
    (111_111_111, 'dan',          'Qq`11111',     'danthemanr123@gmail.com',{1, 3, 4, 6, 7, 10}),
    (874_278_597, 'alice',        'Password123!', 'alice108@melissa.tv',    {5, 7, 8}),
    (572_155_615, 'bob',          'Secure456@',   'bob964@april.biz',       {5}),
    (183_252_382, 'charlie',      'Qwerty789#',   'charlie761@billy.biz',   {1, 2, 10}),
    (854_395_328, 'diana',        'Hunter2$',     'diana047@jasper.info',   {2, 5}),
    (231_349_409, 'eve',          'Passpass%',    'eve373@annie.ca',        {3, 4, 5, 9, 10}),
    (295_180_613, 'frank',        'Letmein^',     'frank591@kory.org',      {4, 6, 7, 10}),
    (367_250_208, 'grace',        'Trustno1&',    'grace187@karina.biz',    {}),
    (522_283_999, 'heidi',        'Admin123*',    'heidi631@dana.io',       {4, 10}),
    (522_872_038, 'ivan',         'Welcome1~',    'ivan042@hotmail.com',    {1, 3, 6, 7, 8, 9}),
    (381_692_650, 'judy',         'password1-',   'judy416@yesenia.net',    {3, 5, 9}),
    ]
}
findStudent = {x['id']:x['username'] for x in students.values()}

def student_str(name, j=False, q=False):
    #j justifies the fields
    #q puts quotes around the keys
    s = students[name]
    return f"{{{' '.join([f"{repr(k)if q else k}:{((repr(s[k])if type(s[k])!=set else f"{{{','.join([str(c)for c in s[k]])}}}")+(','if type(s[k])!=set else '')).ljust(max([len(repr(s[k]))+1 if type(s[k])!=set else len(f"{{{','.join([str(c)for c in s[k]])}}}")for s in students.values()]))if j else (repr(s[k])if type(s[k])!=set else f"{{{','.join([str(c)for c in s[k]])}}}")+(','if type(s[k])!=set else '')}"for k in keys])}}}"
def printStudents(student_list=None):
    if student_list:
        print(f"students:\n  {',\n  '.join([student_str(n, j=True) for n in student_list])}")
    else:
        print(f"students:\n  {',\n  '.join([student_str(n, j=True) for n in students])}")
printStudents()

def add_student(data):
    if type(data) == dict:
        if 'username' not in data or 'password' not in data or 'email' not in data:
            raise KeyError(f"argument data to add_student() missing required key(s): {', '.join([repr(k) for k in ['username', 'password', 'email']if k not in data])}")
        elif len(data)!=3:
            raise KeyError(f"argument data to add_student() should not have extra keys: {', '.join([repr(k) for k in data.keys() if k not in ['username', 'password', 'email']])}")
        newStudent = {}
        for key in data: #should have username, password, and email
            newStudent[key] = data[key]
        newStudent['id'] = random.randrange(100_000_000, 1000_000_000)
        newStudent['enrolled_courses'] = set()
        students[data['username']] = newStudent
        findStudent['id'] = newStudent['username']
        print("Student added:", student_str(data['username']))
        return id
    else:
        raise TypeError(f"add_student was passed a value of type {type(data)}")

@app.route('/register', methods=['POST'])
def register():
    #requires request.get_json() has keys 'username', 'password', 'email'
    data = request.get_json()
    for username in students:
        if username == data['username']:
            return jsonify({'success': False, 'info': f'The username {data['username']} is already taken'})
    id = add_student(data)
    return jsonify({'success': True, 'info': f'You have been successfully registered! Your id is {id}'})

@app.route('/login', methods=['POST'])
def login():
    #requires request.get_json() has keys 'username', 'password', 'email'
    data = request.get_json()
    try:
        if students[data['username']]['password'] == data['password']:
            return jsonify({'success': True, 'info': students[data['username']]})
        else:
            return jsonify({'success': False, 'info': 'Invalid username or password!'})
    except KeyError:
        return jsonify({'success': False, 'info': f'The username {data['username']} is not in use'})
    except:
        return jsonify({'success': False, 'info': 'Server side error, try again later'})

@app.route('/testimonials', methods=['GET']) #TODO: Homepage.js and MainSection.js needs to be debugged
def testimonials():
    ...

@app.route('/enroll/<student_id>', methods=['POST']) #TODO: CoursePage.js needs to be debugged
def enroll(student_id):
    #requires request.getjson()['id'] in range(1,11)
    username = findStudent[student_id]
    if username not in students:
        return jsonify({'success': False, 'info': 'Invalid student id'})
    course = request.get_json()
    course_id = course['id']
    with open('courses.json', 'r') as f:
        courses = {x['id']:x for x in json.load(f)}
    if course_id not in courses:
        return jsonify({'success': False, 'info': 'Invalid course id'})
    if course_id not in students[username]['enrolled_courses']:
        students[username]['enrolled_courses'].add(course_id)
        return jsonify({'success': True, 'info': f'Successfuly enrolled in {courses[course_id]}'})
    else:
        return jsonify({'success': True, 'info': f'Already enrolled in {courses[course_id]}'})

@app.route('/drop/<student_id>', methods=['DELETE']) #TODO: CoursePage.js needs to be debugged
def drop(student_id):
    #requires request.getjson()['course'] in range(1,11)
    username = findStudent[student_id]
    if username not in students:
        return jsonify({'success': False, 'info': 'Invalid student id'})
    data = request.get_json()
    course_id = data['course']
    with open('courses.json', 'r') as f:
        courses = {x['id']:x for x in json.load(f)}
    if course_id not in courses:
        return jsonify({'success': False, 'info': 'Invalid course id'})
    if course_id not in students[username]['enrolled_courses']:
        return jsonify({'success': True, 'info': f'Not enrolled in {courses[course_id]}'})
    else:
        students[username]['enrolled_courses'].remove(course_id)
        return jsonify({'success': True, 'info': f'Successfuly dropped {courses[course_id]}'})

@app.route('/courses', methods=['GET']) #TODO: Homepage.js, MainSection.js, and CoursePage.js need to be debugged
def courses():
    ...

@app.route('/student_courses/<student_id>', methods=['GET']) #TODO: CoursePage.js needs to be debugged
def student_courses(student_id):
    student = students[findStudent[student_id]]
    with open('courses.json', 'r') as f:
        courses = {x for x in json.load(f) if x['id'] in student['enrolled_courses']}
    return jsonify(courses)


if __name__ == "__main__":
    app.run(debug=True, port=5001)
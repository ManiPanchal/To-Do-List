from flask import Flask, request, jsonify,render_template
from flask_cors import CORS,cross_origin
import mysql.connector
mysql=mysql.connector.connect(
    host="localhost",
    user="root",
    database="todo_list"
)
cursor=mysql.cursor()
app = Flask(__name__)
cors=CORS(app)
@app.route('/')
def index():
    return render_template('all.html')
@app.route('/newtodo')
def new_todo():
    return render_template('todo.html')
@app.route('/all')
def all():
     return render_template('all.html')
# @app.route('/styles',methods=['POST'])
#     return render_template('D:\js_todo\backend\templates\todo.css')
@app.route('/insert',methods=['POST'])
def insert():
    data=request.get_json()
    # print(data)
    data = data.get('data')
    task=data.get('value')
    due_date=data.get('due_date')
    id=data.get('id')
    flag=data.get('flag')
    description=data.get('description')
    assigned_date=data.get('assigned_date')
    st=data.get('start_time')
    et=data.get('end_time')
    # print(task,due_date,id,flag,description,assigned_date)
    sql='insert into todo values (%s,%s,%s,%s,%s,%s,%s,%s) '
    val=(id,task,due_date,flag,description,assigned_date,st,et)
    try:
        cursor.execute(sql,val)
        mysql.commit()
        if cursor.rowcount>0:
            return jsonify({"message":"success"}),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500
@app.route('/fetchall',methods=['POST'])
def fetchall():
    
    sql='select * from todo'
    try:
        cursor.execute(sql)
        cols = [x[0] for x in cursor.description]
        data=cursor.fetchall()
        res = [dict(zip(cols,row)) for row in data]
        if data:
            return jsonify(res),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500
@app.route('/fetchsome',methods=['POST'])
def fetchsome():
    data=request.get_json()
    limit=data.get('limit')
    offset=data.get('offset')
    sql='select * from todo limit %s offset %s '
    val=(limit,offset)
    try:
        cursor.execute(sql,val)
        cols = [x[0] for x in cursor.description]
        data=cursor.fetchall()
        res = [dict(zip(cols,row)) for row in data]
        if data:
            return jsonify(res),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500

@app.route('/count',methods=['POST'])
def count():
    
    sql='select count(id) as count from todo'
    try:
        cursor.execute(sql)
        cols = [x[0] for x in cursor.description]
        data=cursor.fetchall()
        res = [dict(zip(cols,row)) for row in data]
        if data:
            return jsonify(res),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500

@app.route('/delete',methods=['POST'])
def delete():
    data=request.get_json()
    id=data.get('id')
    # print(id)
    sql='delete from todo where id=%s'
    val=(id,)
    try:
        cursor.execute(sql,val)
        mysql.commit()
        if cursor.rowcount>0:
            return jsonify({"message":"success"}),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500
@app.route('/checked',methods=['POST'])
def check():
    data=request.get_json()
    # data = data.get('data')
    print(data)
    id=data.get('id')
    flag=data.get('status')
    # print(id)
    sql='update todo set flag=%s where id=%s'
    val=(flag,id)
    try:
        cursor.execute(sql,val)
        mysql.commit()
        if cursor.rowcount>0:
            return jsonify({"message":"success"}),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500

@app.route('/update',methods=['POST'])
def update():
    data=request.get_json()
    data = data.get('data')
    print(data)
    id=data.get('id')
    value=data.get('task')
    description=data.get('description')
    due_date=data.get('due_date')
    flag=data.get('flag')
    start_time=data.get('start_time')
    end_time=data.get('end_time')
    # print(id)
    # print(id,value,description,due_date)
    sql='update todo set task=%s,description=%s,due_date=%s,flag=%s,start_time=%s,end_time=%s where id=%s'
    val=(value,description,due_date,flag,start_time,end_time,id)
    try:
        cursor.execute(sql,val)
        mysql.commit()
        if cursor.rowcount>0:
            return jsonify({"message":"success"}),200
        else:
            return jsonify({'msg':'error while'}),304
    except Exception as e:
        print(repr(e))
        return jsonify({'err':repr(e)}),500


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, request, jsonify, session, redirect, url_for, redirect
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, verify_jwt_in_request, create_access_token
from flask_session import Session
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from functools import wraps
import os
import calendar
import locale
locale.setlocale(locale.LC_TIME, 'cs_CS.UTF-8')
import pymysql
import pymysql.cursors
from pymysql.cursors import DictCursor
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime,date,timedelta
import hashlib
import glob

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "backend/static/uploaded_imgs"
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.secret_key = 'ahoj'
app.config['SESSION_TYPE'] = 'filesystem'
CORS(app, supports_credentials=True)
Session(app)
jwt = JWTManager(app)
login_manager = LoginManager(app)

timeout = 10
'''def connect():
    connection = pymysql.connect(
    charset="utf8mb4",
    connect_timeout=timeout,
    cursorclass=pymysql.cursors.DictCursor,
    db="defaultdb",
    host="mysql-pokus-pokus.a.aivencloud.com",
    password="AVNS_LudGZ8xqV88TuCDAV4r",
    read_timeout=timeout,
    port=27178,
    user="avnadmin",
    write_timeout=timeout,
    )
    return connection'''

def connect():
    connection = pymysql.connect(
        db='busking', 
        user='root', 
        passwd='moje_heslo', 
        host='localhost', 
        port=3306, 
        cursorclass=DictCursor,
        read_timeout=timeout,
        write_timeout=timeout
    )
    return connection

# Přidávání uživatelů při startu aplikace (pouze pro ilustrační účely)
#hashed_password = generate_password_hash('admin', method='pbkdf2', salt_length=16)
#cursor.execute("INSERT INTO users (username, password, role) VALUES ('admin', %s, 'admin')", ('admin',))
#conn.commit()'''
    
class User:
    def __init__(self, user_id, username, role,password):
        self.id = user_id
        self.username = username
        self.role = role
        self.password = password

    def get_id(self):
        return str(self.id)

    def is_authenticated(self):
        return True  # Můžete zde implementovat vlastní logiku ověřování
    

'''def get_user(username):
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user_data = cursor.fetchone()
    if user_data:
        return User(user_data['id'], user_data['username'], user_data['role'],user_data['password'])
    return None'''

blacklist = set()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project_root
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'frontend', 'public', 'assets', 'static', 'users')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        token = token.split(" ")[1]  # Get the token part only
        if token in blacklist:
            return jsonify({'message': 'Token has been revoked'}), 403
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 403

        return f(*args, **kwargs)
    return decorated

# Výchozí e-mailová adresa
DEFAULT_EMAIL = 'zbranek.m@example.com'

@app.route('/get_event',methods=["GET"])
def get_event():
    confirmed = request.args.get('confirmed')
    genres = request.args.getlist('genreFilter')
    places = request.args.getlist('placeFilter')
    date_interval = [request.args.get('dateInterval[start]'),request.args.get('dateInterval[end]')]
    where_clause = ''
    if confirmed: params = [1] 
    else: params = [0]
    if date_interval[0] and date_interval[1]:
        where_clause += ' AND day BETWEEN %s AND %s'
        params+=date_interval
    if len(genres)>0:
        where_clause += ' AND genre in(' + ','.join(['%s'] * len(genres)) + ')'
        params += genres
    if len(places)>0:
        where_clause += ' AND p.city in(' + ','.join(['%s'] * len(places)) + ')'
        params += places
    query = ''' SELECT 
                    e.id,
                    e.`day`,
                    e.`start`,
                    e.`end`,
                    e.confirmed,
                    e.genre,
                    e.user_id,
                    CASE 
                        WHEN e.user_id IS not NULL THEN u.name 
                        ELSE e.artist_name
                    END AS name,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.nationality  
                        ELSE e.artist_nationality 
                    END AS nationality,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.about 
                        ELSE e.artist_about
                    END AS about,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.image 
                        ELSE e.artist_image
                    END AS image,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.email  
                        ELSE e.artist_email
                    END AS email,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.phone
                        ELSE e.artist_phone
                    END AS phone,
                    p.city,
                    p.spot,
                    p.image as placeImage,
                    p.coor_long as CoorLong,
                    p.coor_lat as CoorLat,
                    p.path,
                    p.desc
                FROM 
                    events AS e 
                LEFT JOIN places AS p ON e.place_id = p.id
                LEFT JOIN users AS u ON e.user_id = u.id
                WHERE e.confirmed = %s AND day >= curdate() ''' + where_clause + "ORDER BY day,start"
    conn = connect()
    cursor = conn.cursor()
    
    try:
        cursor.execute(query,tuple(params))
        result = cursor.fetchall()
        if len(result) > 0:
            return jsonify(result)
        else:
            return jsonify(None)
    except Exception as ex:
        print(ex)
        return jsonify(None)

@app.route('/get_all_events',methods=["GET"])
def all_events():
    query = ''' SELECT 
                    e.id,
                    e.`day`,
                    e.`start`,
                    e.`end`,
                    e.confirmed,
                    e.genre,
                    e.user_id,
                    CASE 
                        WHEN e.user_id IS not NULL THEN u.name 
                        ELSE e.artist_name
                    END AS name,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.nationality  
                        ELSE e.artist_nationality 
                    END AS nationality,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.about 
                        ELSE e.artist_about
                    END AS about,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.image 
                        ELSE e.artist_image
                    END AS image,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.email  
                        ELSE e.artist_email
                    END AS email,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.phone
                        ELSE e.artist_phone
                    END AS phone,
                    p.city,
                    p.spot,
                    p.image as placeImage,
                    p.coor_long as CoorLong,
                    p.coor_lat as CoorLat,
                    p.path,
                    p.desc
                FROM 
                    events AS e 
                LEFT JOIN places AS p ON e.place_id = p.id
                LEFT JOIN users AS u ON e.user_id = u.id
                ORDER BY day,start'''
    conn = connect()
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    if len(result) > 0:
        return jsonify(result)
    else:
        return jsonify(None)

@app.route('/event_detail',methods=["GET"])
def event_detail():
    event_id = request.args.getlist('eventId')

    query = '''SELECT 
                    e.id,
                    e.`day`,
                    e.`start`,
                    e.`end`,
                    e.confirmed,
                    e.genre,
                    e.user_id,
                    CASE 
                        WHEN e.user_id IS not NULL THEN u.name 
                        ELSE e.artist_name
                    END AS name,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.nationality  
                        ELSE e.artist_nationality 
                    END AS nationality,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.about 
                        ELSE e.artist_about
                    END AS about,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.image 
                        ELSE e.artist_image
                    END AS image,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.email  
                        ELSE e.artist_email
                    END AS email,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.phone
                        ELSE e.artist_phone
                    END AS phone,
                    p.city,
                    p.spot,
                    p.image as placeImage,
                    p.coor_long as coorLong,
                    p.coor_lat as coorLat,
                    p.path,
                    p.desc
                FROM 
                    events AS e 
                LEFT JOIN places AS p ON e.place_id = p.id
                LEFT JOIN users AS u ON e.user_id = u.id
                WHERE e.id = %s'''
    
    conn = connect()
    cursor = conn.cursor()
    cursor.execute(query,(event_id,))
    result = cursor.fetchone()
    return jsonify(result)

@app.route('/get_news',methods=["GET"])
def use_news():
    query = "SELECT * FROM events WHERE confirmed = 1 ORDER BY day,start LIMIT 6"
    conn = connect()
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    return jsonify(result)
        
def send_email(date, user_email, phone):
    # Nastavení e-mailových parametrů
    sender_email = 'zbranek.m@gmail.com'
    password = 'iccx ufio sdbz hmdw'
    subject = 'Nová událost v kalendáři'
    body = f'Datum: {date}\nUživatelova e-mailová adresa: {user_email}\nTelefon: {phone}'

    # Vytvoření e-mailové zprávy
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = DEFAULT_EMAIL  # Odeslat na výchozí e-mailovou adresu
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))    

    srv = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    #srv.connect()
    srv.ehlo()
    srv.login(sender_email, password)
    ret = srv
    srv.sendmail(sender_email, DEFAULT_EMAIL, msg.as_string())

@app.route('/get_upcom',methods=['GET'])
def get_upcom():
    query = ''' SELECT 
                    e.id,
                    e.`day`,
                    e.`start`,
                    e.`end`,
                    e.confirmed,
                    e.genre,
                    e.user_id,
                    CASE 
                        WHEN e.user_id IS not NULL THEN u.name 
                        ELSE e.artist_name
                    END AS name,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.nationality  
                        ELSE e.artist_nationality 
                    END AS nationality,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.about 
                        ELSE e.artist_about
                    END AS about,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.image 
                        ELSE e.artist_image
                    END AS image,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.email  
                        ELSE e.artist_email
                    END AS email,
                    CASE 
                        WHEN e.user_id is NOT NULL THEN u.phone
                        ELSE e.artist_phone
                    END AS phone,
                    p.city,
                    p.spot,
                    p.image as placeImage,
                    p.coor_long as CoorLong,
                    p.coor_lat as CoorLat,
                    p.path,
                    p.desc
                FROM 
                    events AS e 
                LEFT JOIN places AS p ON e.place_id = p.id
                LEFT JOIN users AS u ON e.user_id = u.id
                WHERE e.confirmed = 1 AND day >= curdate() ORDER BY day,start LIMIT 6'''
    conn = connect()
    cursor = conn.cursor()
    
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        if len(result) > 0:
            return jsonify(result)
        else:
            return jsonify(None)
    except Exception as ex:
        print(ex)
        return jsonify(None)


@app.route('/get_genres', methods=['GET'])
def get_genres():
    conn = connect()
    cursor = conn.cursor()
    query = "SELECT DISTINCT genre FROM events ORDER BY genre"
    cursor.execute(query)
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/get_places', methods=['GET'])
def get_places():
    conn = connect()
    cursor = conn.cursor()
    query = "SELECT DISTINCT id, city, spot FROM places ORDER BY city,spot"
    cursor.execute(query)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/login', methods=['GET'])
def login():
            username = request.args.get('username')
            password = request.args.get('password')      
            conn = connect()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            conn.commit()
            user = cursor.fetchone()
            conn.close()
            if user and password == user['password']:
                #user_no_pass = {i:user[i] for i in user if i!='password'}
                #session.permanent = True
                #session['username'] = user['username']
                #session['role'] = user['role']
                access_token = create_access_token(identity=user)
                return jsonify(token=access_token,user=user), 200
                #return jsonify(user)
            else :
                return jsonify(success = False)

@app.route('/register', methods=['POST'])
def register():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email') 
    conn = connect()
    cursor = conn.cursor()
    query = '''INSERT INTO users (username,password,role,email)
                VALUES (%s,%s,2,%s);'''
    try:
        cursor.execute(query,(username,password,email))
        conn.commit()
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        access_token = create_access_token(identity=user)
        return jsonify(token=access_token,user=user), 200
    except Exception as e:
        print(f"Chyba: {e}")
        return jsonify({"msg": "Někde se stala chyba"}), 401
    finally:
        cursor.close()
        conn.close()

@app.route('/changeUser', methods = ['POST'])
def changeUser():
    user_id = request.args.get('userId')
    username = request.form.get('username')
    email = request.form.get('email')
    name = request.form.get('name')
    phone = request.form.get('phone')
    nationality = request.form.get('nationality')
    about = request.form.get('about')
    birthDate = request.form.get('birthDate')
    fileDir = os.path.join(UPLOAD_FOLDER, f'user{user_id}')
    
    original_image_hash = get_file_hash(fileDir)

    new_image = request.files.get('file')
    new_image.filename = user_id

    conn = connect()
    cursor = conn.cursor()
    query = '''UPDATE users 
        SET username= %s, name =%s, email =%s, phone =%s, nationality =%s, about =%s, image =%s, birth_Date = %s 
        WHERE users.id = %s'''

    try:
        
        image_dir = 'assets/static/users/user'+new_image.filename
        cursor.execute(query,(username,name,email,phone,nationality,about,image_dir,birthDate,new_image.filename,))

        if new_image:
            new_image_data = new_image.read()
            file_base = os.path.splitext(fileDir)[0]
            existing_files = glob.glob(f'{file_base}.*')

            if len(existing_files)>0:
                for file_path in existing_files:
                    os.remove(file_path)

            new_image_filename = f'user{user_id}.{new_image.filename.split(".").pop()}'
            new_image_path = os.path.join(UPLOAD_FOLDER, new_image_filename)

            new_image.seek(0)
            new_image.save(new_image_path)
        
        conn.commit()

        cursor.execute("SELECT image FROM users WHERE users.id =%s",(user_id))
        imageDir = cursor.fetchone()
        return jsonify(success= True,imagePath = imageDir), 200

    except Exception as e:
        print(e)
        return jsonify(success= False), 401
    finally:
        cursor.close()
        conn.close()

def get_file_hash(file_path):
    md5_hash = hashlib.md5()
    try:
        with open(file_path, "rb") as file:
            for byte_block in iter(lambda: file.read(4096), b""):
                md5_hash.update(byte_block)
        return md5_hash.hexdigest()
    except FileNotFoundError:
        return None

@app.route('/verify', methods=['POST'])
def verify():
    try:
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        print(current_user)
        return jsonify(user=current_user), 200
    except:
        return jsonify({"msg": "Invalid token"}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/logout', methods=['POST'])
#@token_required
def logout():
    print('odhlaseno')
    token = request.headers.get('Authorization').split(" ")[1]
    blacklist.add(token)
    
    return jsonify({'message': 'Successfully logged out'})

@app.route('/new_ev',methods=['POST'])
def new_ev():
    params = [
        request.args['day'],
        request.args['start'],
        request.args['end'],
        request.args['city'],
    ]

    conn = connect()
    cursor = conn.cursor()
    query = '''INSERT INTO events (day,start,end,place_id) VALUES (%s,%s,%s,%s);'''
    try:
        cursor.execute(query,tuple(params,))
        conn.commit()
        return jsonify(success = True, message= 'Událost vytvořena')
    except Exception as ex:
        print(ex)
        return jsonify(success = False, message='Chyba při vytváření události')


if __name__ == '__main__':
    app.run(debug=True)

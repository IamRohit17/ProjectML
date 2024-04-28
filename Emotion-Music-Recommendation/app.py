from flask import Flask, render_template, Response, request, jsonify
from camera import *

app = Flask(__name__)

video_camera = None
df1 = None  # Initialize df1 as a global variable

@app.route('/')
def index():
    global df1
    headings = ("Name", "Album", "Artist")
    df1 = music_rec()  # Call the music_rec function to get song recommendations
    df1 = df1.head(15) # Take the first 15 rows of the DataFrame
    return render_template('indexCopy.html', headings=headings, songs=df1.to_dict('records'))

def gen(camera):
    while True:
        global df1
        frame, new_df1 = camera.get_frame()
        df1 = new_df1  # Update the global df1 variable
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    global video_camera
    video_camera = VideoCamera()
    return Response(gen(video_camera),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_camera', methods=['POST'])
def stop_camera():
    global video_camera
    if video_camera is not None:
        video_camera.release()
        print("Camera stopped successfully")
        return jsonify({'message': 'Camera stopped successfully'}), 200
    else:
        print("Camera is not running")
        return jsonify({'message': 'Camera is not running'}), 400

@app.route('/t')
def gen_table():
    global df1
    if df1 is not None:
        return df1.to_json(orient='records')
    else:
        return jsonify([])

@app.route('/login')
def login():
    return render_template('signUp.html')

if __name__ == '__main__':
    app.debug = True
    app.run()
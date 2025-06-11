from flask import Flask, request, send_file
from TTS.api import TTS
import os

app = Flask(__name__)
tts = TTS(model_name="tts_models/en/ljspeech/vits", progress_bar=False)

@app.route('/clone', methods=['POST'])
def clone_voice():
    audio_file = request.files['audio']
    text = request.form['text']
    pitch = float(request.form['pitch'])
    speed = float(request.form['speed'])
    language = request.form['language']
    
    audio_path = "temp.wav"
    audio_file.save(audio_path)
    
    output_path = "output.wav"
    tts.tts_to_file(text=text, speaker_wav=audio_path, file_path=output_path, language=language)
    
    # Mock pitch/speed adjustment (Coqui supports limited tweaks)
    return send_file(output_path, mimetype='audio/wav')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

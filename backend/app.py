from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('earthquake_model.pkl')

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    try:
        data = request.get_json()

        # Convert input into a DataFrame with correct feature names
        input_df = pd.DataFrame([{
            'Latitude': data['Latitude'],
            'Longitude': data['Longitude'],
            'Depth': data['Depth'],
            'Root Mean Square': data['Root Mean Square']
        }])

        # Make prediction
        prediction = model.predict(input_df)[0]

        return jsonify({
            'Magnitude': round(float(prediction[0]), 3),
            'Type': "Earthquake" if round(prediction[1]) == 1 else "Other"
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

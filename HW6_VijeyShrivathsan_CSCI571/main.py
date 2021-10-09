from flask import Flask, request, jsonify, render_template
import requests
import json
app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
@app.route("/")
def hello_world():
    return app.send_static_file('static/weather.html')

@app.route('/getWeather', methods=['GET'])
def getweather():
    lat,lng = request.args.get('lat'),request.args.get('lng')
    url = "https://api.tomorrow.io/v4/timelines"
    querystring = {"location":str(lat)+","+str(lng),"fields":["temperature","temperatureApparent","humidity",
    "windSpeed","windDirection","pressureSeaLevel","precipitationProbability","precipitationType","sunriseTime",
    "sunsetTime","visibility","cloudCover","moonPhase","uvIndex","weatherCode","temperatureMin","temperatureMax"],
    "units":"imperial","timesteps":["1d","1h","current"],"timezone":"America/Los_Angeles","apikey":"0hiKyuqUodCyN9PBs6SxxrqISv7AQ1qf"}
    headers = {"Accept": "application/json"}
    print(lat, lng)
    response = requests.request("GET", url, headers=headers, params=querystring)
    json_response=response.json()
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    json_response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
    return json_response

if __name__ == "__main__":
   app.run(host='127.0.0.1', port=8080, debug=True)

# Tomorrow.io API
# 'https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=0hiKyuqUodCyN9PBs6SxxrqISv7AQ1qf'
# apikey=0hiKyuqUodCyN9PBs6SxxrqISv7AQ1qf
# https://api.tomorrow.io/v4/timelines?location=34.027699,-118.290479&fields=temperature&fields=temperatureApparent&fields=humidity&fields=windSpeed&fields=windDirection&fields=pressureSeaLevel&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=cloudCover&fields=moonPhase&fields=uvIndex&fields=weatherCode&fields=temperatureMin&fields=temperatureMax&units=imperial&timesteps=[1d,1h,current]&timezone=America/Los_Angeles&apikey=0hiKyuqUodCyN9PBs6SxxrqISv7AQ1qf

# Google Maps Geocoding
# apikey=AIzaSyAc7H889Wfuxy4690EjwxNH8hy1KABFDKI
# https://maps.googleapis.com/maps/api/geocode/json?address=1247+W+30th+Street,+Los+Angeles,+CA&key=AIzaSyAc7H889Wfuxy4690EjwxNH8hy1KABFDKI

# ipinfo.io
# apikey=68ef393effbdfb
# https://ipinfo.io?token=68ef393effbdfb



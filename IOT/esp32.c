#include <WiFi.h>
#include <HTTPClient.h>
#include <NewPing.h>

#define WAIT_TIME_LOOP 50000
#define WAIT_TIME_SENSOR 10000
#define STATE_INVALID -1
#define STATE_EMPTY 0
#define STATE_OCCUPIED 1
#define DISTANCE_MAX 100
#define TRIG_PIN_1 12
#define ECHO_PIN_1 14
// #define TRIG_PIN_2 13
// #define ECHO_PIN_2 15

NewPing sonar1(TRIG_PIN_1, ECHO_PIN_1);
// NewPing sonar2(TRIG_PIN_2, ECHO_PIN_2);

const char *deviceId = "*****";
const char *ssid_Router = "****";
const char *password_Router = "****";
const char *apiEndpoint = "****";

HTTPClient httpClient;
WiFiClient wifiClient;

void setup()
{
  Serial.begin(115200);
  delay(2000);

  Serial.println("Setup start");

  WiFi.begin(ssid_Router, password_Router);
  Serial.println(String("Connecting to ") + ssid_Router);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print("Connecting to Wifi...");
  }
  Serial.println("\nConnected, IP address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Setup End");
}

void sendInfo(int state1, int state2)
{
  httpClient.begin(wifiClient, apiEndpoint);

  // httpClient.addHeader("Content-Type", "application/json");

  String requestBody = "{\"device_id\":\"" + String(deviceId) + "\",\"states\":[" + state1 + "," + state2 + "]}";
  Serial.println(requestBody);
  int httpResponseCode = httpClient.POST(requestBody);
  String response = httpClient.getString();

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  Serial.print("Response: ");
  Serial.println(response);

  httpClient.end();
}

int validateSensor(int state, int distance){
  if(distance == 0){
    return STATE_INVALID;
  }
  else if(distance <= DISTANCE_MAX){
    return STATE_OCCUPIED;
  }
  else if(distance > DISTANCE_MAX){
    return STATE_EMPTY;
  }
  else{
    return STATE_INVALID;
  }
}

void loop()
{

  unsigned int distance1 = 0;
  unsigned int distance2 = 0;

  int state1 = STATE_INVALID;
  int state2 = STATE_INVALID;

  distance1 = sonar1.ping_cm();
  // distance2 = sonar2.ping_cm();

  state1 = validateSensor(state1, distance1);
  // state2 = validateSensor(state2, distance2);

  // Serial.println(String("{ device: ") + deviceId + String("}"));
  // Serial.println(String("{ sensor_1: ") + distance1 + String("}"));
  // Serial.println(String("{ sensor_2: ") + distance2 + String("}"));
  // Serial.println(String("-----"));

  delay(WAIT_TIME_SENSOR);

  distance1 = sonar1.ping_cm();
  // distance2 = sonar2.ping_cm();

  if (distance1 <= DISTANCE_MAX && distance1 > 0){
    if(state1 == STATE_OCCUPIED){
      state1 = STATE_OCCUPIED;
    }
  }
  else{
    state1 = validateSensor(state1, distance1);
  }

  // if (distance2 <= DISTANCE_MAX && distance2 > 0){
  //   if(state2 == STATE_OCCUPIED){
  //     state2 = STATE_OCCUPIED;
  //   }
  // }
  // else{
  //   state2 = validateSensor(state2, distance2);
  // }


  sendInfo(state1, state2);

  delay(WAIT_TIME_LOOP);
}
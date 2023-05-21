#include <WiFi.h>
#include <HTTPClient.h>
#include <NewPing.h>

#define TRIG_PIN_1 12
#define ECHO_PIN_1 14
// #define TRIG_PIN_2 13
// #define ECHO_PIN_2 15

NewPing sonar1(TRIG_PIN_1, ECHO_PIN_1);
// NewPing sonar2(TRIG_PIN_2, ECHO_PIN_2);

const char *deviceId = "*****";
const char *ssid_Router = "****";
const char *password_Router = "****";
const char* apiEndpoint = "****";

HTTPClient httpClient;
WiFiClient wifiClient;

void setup() {
  Serial.begin(115200);
  delay(2000);

  Serial.println("Setup start");


  WiFi.begin(ssid_Router, password_Router);
  Serial.println(String("Connecting to ") + ssid_Router);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Connecting to Wifi...");
  }
  Serial.println("\nConnected, IP address: ");
  Serial.println(WiFi.localIP());


  Serial.println("Setup End");
}


void sendInfo(int dist1, int dist2){
  httpClient.begin(wifiClient, apiEndpoint);

  //httpClient.addHeader("Content-Type", "application/json");

  String requestBody = "{\"device_id\":\"" + String(deviceId) + "\",\"distances\":[" + dist1 + "," + dist2 + "]}";
  Serial.println(requestBody);
  int httpResponseCode = httpClient.POST(requestBody);
  String response = httpClient.getString();

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  Serial.print("Response: ");
  Serial.println(response);

  httpClient.end();
}


void loop() {

  unsigned int distance1 = 0;
  unsigned int distance2 = 0;

  distance1 = sonar1.ping_cm();
  // distance2 = sonar2.ping_cm();

  // Serial.println(String("{ device: ") + deviceId + String("}"));
  // Serial.println(String("{ sensor_1: ") + distance1 + String("}"));
  // Serial.println(String("{ sensor_2: ") + distance2 + String("}"));
  // Serial.println(String("-----"));

  sendInfo(distance1, distance2);

  delay(5000);
}

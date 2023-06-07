import { Request, Response } from 'express';
import { SensorModel, Sensor } from '../models/SensorModel';

export class SensorController {
  // private sensors: SensorModel[];

  constructor() {
    // this.sensors = new Array<SensorModel>();
  }

  // method that get the state of the sensors in requisition and updates it in the database
  public updateSensorState(req: Request, res: Response) {

    var iotId: string;
    var states: number[];

    var requestBody = req.body;
    // console.log(requestBody);

    if (!requestBody.hasOwnProperty('device_id') || !requestBody.hasOwnProperty('states')) {
      console.log('Bad request');
      return res.status(400).send("Bad request");
      // TODO: log the error
    }

    iotId = req.body.device_id;
    states = req.body.states;

    if (iotId == undefined || states == undefined) {
      console.log('Bad request 2');
      return res.status(400).send("Bad request");
      // TODO: log the error
    }

    // Array with the sensors sent from the esp32
    let tmpSensors: SensorModel[] = new Array<SensorModel>();

    // Creating the sensors objects from the model
    for (let i = 0; i < states.length; i++) {
      let tmpSensor: SensorModel = new SensorModel();
      tmpSensor.setId(`${iotId}_${i}`);
      tmpSensor.setState(states[i]);
      tmpSensors.push(tmpSensor);
    }

    // Updating the database with the generated data
    tmpSensors.forEach(async (sensor) => {
      sensor.updateDatabase();
    });
    return res.status(200).send(JSON.stringify(tmpSensors));
  }
}
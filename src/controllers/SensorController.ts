import { Request, Response } from 'express';
import { SensorModel, Sensor } from '../models/SensorModel';

export class SensorController {
  // private sensors: SensorModel[];

  constructor() {
    // this.sensors = new Array<SensorModel>();
  }

  // method thar get the state of the sensors in requisition and updates it in the database
  public updateSensorState(req: Request, res: Response) {

    let iotId : string;
    let states : number[];
    try {
      iotId = req.body.device_id;
      states = req.body.states;
      if (iotId == undefined || states == undefined) {
        throw new Error('Bad request');
      }
      // console.log('ID = ' + iotId);
      // console.log('STATES = ' + states);
    }
    catch (err) {
      //send bad request
      // TODO: log the error
      console.log('Bad request');
      return res.status(400).send("Bad request");
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
      if (await sensor.updateDatabase()) {
        // TODO: create log system to log instead of console.log
        console.log(`Sensor ${sensor.getId()} updated with state ${sensor.getState()}`);
      } else {
        console.log(`Sensor ${sensor.getId()} not updated`);
      }
    });

    return res.status(200).send(JSON.stringify(tmpSensors));
  }
}
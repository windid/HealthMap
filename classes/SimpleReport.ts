import { HealthMap } from './Map'
import { IReport } from '../interfaces'

export class SimpleReport implements IReport {
  constructor(private _map: HealthMap) {}
  printDetails() {
    Object.values(this._map.clinics)
      .flat()
      .forEach((clinic) => {
        console.log(`${clinic.name} ${clinic.size()}`)
      })
  }
}

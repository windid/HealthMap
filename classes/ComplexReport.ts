import { HealthMap } from './Map'
import { IReport } from '../interfaces'

export class ComplexReport implements IReport {
  constructor(private _map: HealthMap) {}

  printDetails() {
    Object.keys(this._map.clinics).forEach((city) => {
      const clinics = this._map.clinics[city]
      const avgWaitTime =
        clinics.reduce((acc, clinic) => acc + clinic.getCurrentWaitTime(), 0) / clinics.length
      console.log(`${city}, Average wait time: ${avgWaitTime} miniutes`)
      clinics.forEach((clinic) => {
        console.log(`${clinic.name} ${clinic.size()}`)
      })
    })
  }
}

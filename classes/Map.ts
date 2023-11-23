import fs from 'fs'
import { Household } from './Household'
import { Clinic } from './Clinic'
import { IBlock } from '../interfaces'

export interface IHousehold {
  blockNum: number
  inhabitants: Inhabitants[]
}

export interface Inhabitants {
  phn: string
  fullName: string
  isVaccinated: boolean
  age: number
}

export interface IClinic {
  name: string
  blockNum: number
  staff: number
}

export interface RawMapData {
  city: {
    [key: string]: {
      households: IHousehold[]
      clinics: IClinic[]
    }
  }
}

export const currentIntake = 40

export class HealthMap {
  public mapData: { [key: string]: IBlock[] }
  constructor(filePath: string) {
    this.mapData = this.init(JSON.parse(fs.readFileSync(filePath, 'utf-8')))
  }

  get clinics() {
    const res: { [key: string]: Clinic[] } = {}
    for (const city in this.mapData) {
      res[city] = this.mapData[city].filter((x) => x.char === 'C') as Clinic[]
    }
    return res
  }

  init(mapData: RawMapData) {
    const data: { [key: string]: IBlock[] } = {}
    for (const city in mapData.city) {
      const households = mapData.city[city].households.map((household) => {
        return new Household(household.blockNum, household.inhabitants)
      })
      const clinics = mapData.city[city].clinics.map((clinic) => {
        return new Clinic(clinic.name, clinic.blockNum, clinic.staff)
      })
      data[city] = [...households, ...clinics]
    }
    return data
  }

  printMap() {
    const res: string[][] = []
    for (const city in this.mapData) {
      res.push(this.mapData[city].sort((a, b) => a.blockNum - b.blockNum).map((x) => x.char))
    }
    const maxLen = Math.max(...res.map((x) => x.length))
    const paddedRes = res.map((x) => {
      const padding = Array(maxLen - x.length).fill('X')
      return [...x, ...padding].join(',')
    })
    console.log(paddedRes.join('\n'))
  }

  registerForShots() {
    // register the people older then currentIntake to the nearest clinic
    for (const city in this.mapData) {
      const clinics = this.mapData[city].filter((x) => x.char === 'C') as Clinic[]
      const households = this.mapData[city].filter((x) => x.char === 'H') as Household[]
      households.map((household) => {
        const eligibleInhabitants = household.inhabitants.filter(
          (inhabitant) => inhabitant.age >= currentIntake && !inhabitant.isVaccinated
        )
        if (eligibleInhabitants.length === 0) return
        const nearestClinic = clinics.reduce((prev, curr) => {
          return Math.abs(curr.blockNum - household.blockNum) <
            Math.abs(prev.blockNum - household.blockNum)
            ? curr
            : prev
        })
        eligibleInhabitants.map((inhabitant) => {
          nearestClinic.enqueue(inhabitant.fullName)
          inhabitant.isVaccinated = true
        })
      })
    }
  }
}

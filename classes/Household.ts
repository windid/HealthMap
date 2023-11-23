import { Inhabitants } from './Map'
import { IBlock } from '../interfaces'

export class Household implements IBlock {
  constructor(public blockNum: number, public inhabitants: Inhabitants[]) {}

  get char() {
    return this.inhabitants.every((inhabitant) => inhabitant.isVaccinated) ? 'F' : 'H'
  }
}

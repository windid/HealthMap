import { IBlock } from '../interfaces'

export class Clinic implements IBlock {
  constructor(public name: string, public blockNum: number, public staff: number) {}

  get char() {
    return 'C'
  }

  public queue: string[] = []

  public dequeue() {
    return this.queue.shift()
  }

  public enqueue(person: string) {
    this.queue.push(person)
  }

  public size() {
    return this.queue.length
  }

  public getCurrentWaitTime() {
    return this.queue.length * 15
  }
}

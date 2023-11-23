import { ComplexReport } from './classes/ComplexReport'
import { HealthMap } from './classes/Map'
import { ReportMaker } from './classes/ReportMaker'
import { SimpleReport } from './classes/SimpleReport'

async function main() {
  const map = new HealthMap('./data.json')
  map.printMap()
  console.log('---End of Map---')
  map.registerForShots()
  const report = new ReportMaker(new ComplexReport(map))
  report.printDetails()
  console.log('---End of Report---')
  map.printMap()
  console.log('---End of Map---')
}

main()

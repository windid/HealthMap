import { IReport } from '../interfaces'

export class ReportMaker {
  constructor(private _report: IReport) {}

  printDetails() {
    this._report.printDetails()
  }
}

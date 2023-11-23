export interface IReport {
  printDetails(): void
}

export interface IBlock {
  readonly blockNum: number
  readonly char: string
}

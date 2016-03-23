export class HoldingStock {
  constructor(
    public id: number,
    public quanity: number,
    public gross: number,
    public date: Date,
    public hsce: number,
    public side: string
  ) { }
}

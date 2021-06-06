export default class TimeUnit {
  constructor(unit) {
    this.unit = unit;
  }

  static Second = new TimeUnit('second')

  static Minute = new TimeUnit('minute')

  static Hour = new TimeUnit('hour')

  static Day = new TimeUnit('day')

  static Week = new TimeUnit('week')

  static Month = new TimeUnit('month')

  static Year = new TimeUnit('year')

  getPlural = () => `${this.unit}s`

  static getList = () => [
    this.Second, this.Minute, this.Hour, this.Day, this.Week, this.Month, this.Year,
  ]
    .map((item) => ({ label: item.unit, value: item.unit }))
}

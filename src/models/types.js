export default class ItemType {
  constructor(type) {
    this.type = type;
  }

  static Numeric = new ItemType('Numeric')

  static Boolean = new ItemType('Check-off')

  static Text = new ItemType('Text')

  getValue = () => this.type.toLowerCase()

  static getList = () => [this.Boolean, this.Numeric, this.Text]
    .map((item) => ({ label: item.type, value: item.getValue() }))
}

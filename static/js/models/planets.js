class Planets extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('planets')
    this.fields = this.fields.concat(['name', 'mass', 'capacity'])
  }
}

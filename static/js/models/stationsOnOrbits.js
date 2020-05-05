class StationsOnOrbits extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('stationsOnOrbits')
    this.fields = this.fields.concat(['station', 'planet'])
  }
}

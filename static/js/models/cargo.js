class Cargo extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('cargo')
    this.fields = this.fields.concat(['code', 'name', 'mass'])
  }
}

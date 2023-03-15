export default class SignatureModel {
  constructor(props = {}) {
    this.name = props.file_name
    this.url = props.file_url
  }
}
export class PersonCreateRequest {
  constructor(name, surname, role, login, password) {
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.login = login;
    this.password = password;
  }
}

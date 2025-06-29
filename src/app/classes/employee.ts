export class Employee {
  public id?: number | undefined;
  public name: string;
  public department: string;

  constructor() {
    this.name = '';
    this.department = '';
  }
}

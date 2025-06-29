import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../classes/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8090';

  constructor(
    private http: HttpClient
  ) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`
    ${this.baseUrl}/employee`,
      employee, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

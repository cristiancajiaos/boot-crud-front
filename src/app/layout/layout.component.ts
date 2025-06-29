import {Component, inject} from '@angular/core';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {SweetAlert2LoaderService, SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import Swal from 'sweetalert2';
import { faUserTie, faPencil, faTrash, faSpinner, faAdd, faCircle, faBroom } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../classes/employee";
import {CommonModule} from "@angular/common";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validator,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, ToastrModule, SweetAlert2Module, FontAwesomeModule, NgbTooltipModule,
    FormsModule, ReactiveFormsModule],
  providers: [SweetAlert2LoaderService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public faAdd: IconDefinition = faAdd;
  public faUserTie: IconDefinition = faUserTie;
  public faPencil: IconDefinition = faPencil;
  public faTrash: IconDefinition = faTrash;
  public faSpinner: IconDefinition = faSpinner;
  public faCircle: IconDefinition = faCircle;
  public faBroom: IconDefinition = faBroom;

  public loadingEmployees: boolean = false;
  public employees: Employee[] = [];

  public currentEmployee: Employee = new Employee();

  public employeeForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required])
  });

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ){

  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required])
    });
    this.getEmployees();
  }

  public getEmployees(): void {
    this.loadingEmployees = true;
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.loadingEmployees = false;
    });
  }

  public addOrUpdateEmployee(): void {
    if (this.currentEmployee.id) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  public cleanForm(): void {
    this.resetEmployeeForm();
    this.resetCurrentEmployee();
  }

  public addEmployee(): void {
    this.resetCurrentEmployee();
    this.currentEmployee.name = this.employeeForm.value['name'];
    this.currentEmployee.department = this.employeeForm.value['department'];
    this.employeeService.addEmployee(this.currentEmployee).subscribe((newEmployee) => {
      if (newEmployee) {
        Swal.fire("Success", `Employee added successfully`, 'success');
        this.getEmployees();
        this.resetEmployeeForm();
        this.resetCurrentEmployee();
      } else {
        Swal.fire("Error", `There was an error trying to add a new employee`, 'error');
      }
    });
  }

  public editEmployee(id: number | undefined): void {
    this.employeeService.getEmployee(id).subscribe((employee) => {
      if (employee) {
        this.currentEmployee.id = employee.id;
        this.currentEmployee.name = employee.name;
        this.currentEmployee.department = employee.department;
        this.employeeForm.controls['name'].setValue(employee.name);
        this.employeeForm.controls['department'].setValue(employee.department);
      } else {
        Swal.fire("Error", `There was an error trying to get the employee data`, 'error');
      }
    });
  }

  public updateEmployee(): void {
    this.currentEmployee.name = this.employeeForm.value['name'];
    this.currentEmployee.department = this.employeeForm.value['department'];
    this.employeeService.updateEmployee(this.currentEmployee).subscribe(updatedEmployee => {
      if (updatedEmployee) {
        Swal.fire("Success", `Employee updated successfully`, 'success');
        this.getEmployees();
        this.resetEmployeeForm();
        this.resetCurrentEmployee();
      } else {
        Swal.fire("Error", `There was an error trying to update the employee`, 'error');
      }
    });
  }

  public deleteEmployee(id: number | undefined): void {
    Swal.fire({
      title: 'Are you sure to delete?',
      html: 'You are about to delete an employee. This change is <strong>irreversible</strong>. Do you really want to delete it?',
      showConfirmButton: true,
      showCancelButton: true,
      icon: 'warning'
      })
    .then(result => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(deletedEmployee => {
          if (deletedEmployee) {
            Swal.fire("Success", `Employee deleted successfully`, 'success');
            this.getEmployees();
          } else {
            Swal.fire("Error", `There was an error trying to update the employee`, 'error');
          }
        });
      }
    });
  }

  public openToastr(): void {
    this.toastr.success("Foo", "Foo", {
      positionClass: 'toast-bottom-right'
    });
  }

  public openSweetalert(): void {
    Swal.fire("Foo", "Open Sweetalert");
  }

  public questionSweetalert(): void {
    Swal.fire("Foo", "Question Sweetalert");
  }

  public handleConfirm(): void {
    Swal.fire("Foo", 'Handle Confirm');
  }

  public resetEmployeeForm(): void {
    this.employeeForm.reset();
    this.employeeForm.controls['name'].setValue('');
    this.employeeForm.controls['department'].setValue('');
  }

  public resetCurrentEmployee(): void {
    this.currentEmployee = new Employee();
  }

}

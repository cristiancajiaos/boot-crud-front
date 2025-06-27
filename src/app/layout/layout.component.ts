import {Component, inject} from '@angular/core';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {SweetAlert2LoaderService, SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import Swal from 'sweetalert2';
import { faUserTie, faPencil, faTrash, faSpinner, faAdd } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../classes/employee";
import {CommonModule} from "@angular/common";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, ToastrModule, SweetAlert2Module, FontAwesomeModule, NgbTooltipModule],
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

  public loadingEmployees: boolean = false;
  public employees: Employee[] = [];

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ){

  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.loadingEmployees = true;
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.loadingEmployees = false;
    });
  }

  public editEmployee(id: number | undefined): void {
    Swal.fire("Delete", `Edit Employee ${id}`);
  }

  public deleteEmployee(id: number | undefined): void {
    Swal.fire("Delete", `Delete Employee ${id}`);
  }

  /*
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
   */
}

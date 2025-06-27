import {Component, inject} from '@angular/core';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {SweetAlert2LoaderService, SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import Swal from 'sweetalert2';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ToastrModule, SweetAlert2Module, FontAwesomeModule],
  providers: [SweetAlert2LoaderService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public faUserTie: IconDefinition = faUserTie;

  constructor(
    private toastr: ToastrService
  ){

  }

  ngOnInit() {}

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
    console.log('handleConfirm()');

  }
}

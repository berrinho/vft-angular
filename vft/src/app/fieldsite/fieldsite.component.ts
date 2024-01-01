import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fieldsite',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './fieldsite.component.html',
  styleUrl: './fieldsite.component.css'
})
export class FieldsiteComponent {

}

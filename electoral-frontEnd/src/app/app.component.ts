import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportElecteursComponent } from "./electeurs/import-electeurs/import-electeurs.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImportElecteursComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'electoral-frontEnd';
}

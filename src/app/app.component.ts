import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToDoComponent } from './Components/to-do/to-to.component';
import { HeaderComponent } from "./Components/Shared Components/header/header.component";
import { FooterComponent } from "./Components/Shared Components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, ToDoComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoList';
}

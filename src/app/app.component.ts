import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-generator';
  password : string = '';
  digitsValue : number = 0;

  getRandomDigits(quantity: number){
      let result = '';
      for (let i = 0; i < quantity; i++) {
          result += Math.floor(Math.random() * 10);
      }
      this.password += result;
  }

  getRandomLetters(quantity:number){
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < quantity; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    this.password = result;
  }

  
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Slider } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,ButtonModule,Slider,ReactiveFormsModule,InputNumberModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  formGroup!: FormGroup;
  title = 'password-generator';
  password : string = '';
  digitsValue!: number; 


  ngOnInit() {
    this.formGroup = new FormGroup({
        value: new FormControl(20),
    })
  }

  lastLimitTriggered: 'min' | 'max' | null = null; // Track the last triggered limit

  checkForLimits(value: number) {
    if (value === 8 && this.lastLimitTriggered !== 'min') {
      this.lastLimitTriggered = 'min';
      this.randomPassword(value);
    } else if (value === 100 && this.lastLimitTriggered !== 'max') {
      this.lastLimitTriggered = 'max';
      this.randomPassword(value);
    } else if (value > 8 && value < 100) {
      this.randomPassword(value);
      this.lastLimitTriggered = null;
    }
  }

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
    this.password += result;
  }

   getRandomSymbols(quantity:number) {
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?/`~-=';
    let result = '';
    for (let i = 0; i < quantity; i++) {
        result += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    this.password += result;
  }

  randomPassword(quantity:number){
    this.password = ''
    this.getRandomDigits(quantity);
    this.getRandomLetters(quantity);
    this.getRandomSymbols(quantity);
    this.randomiseText(this.password)
  }

 randomiseText(text:string) {
    const characters = text.split('');
    
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]]; // Swap
    }

     this.password = characters.join('');
}

copyThePassword(){
  navigator.clipboard.writeText(this.password);
}

  
}

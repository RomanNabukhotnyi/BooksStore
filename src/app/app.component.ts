import { Component } from "@angular/core";

// декоратор @Component повідомляє Angular, що клас AppComponent є компонентом, 
// а його властивості описуть застосування цього компонента
@Component({
  //властивість selector повідомляє Angular, 
  //як треба застосовувати компонент в документі HTML
  selector: "app",
  //властивість template визначає контент, який буде відображатись компонентом
  //router-outlet це елемент, на місце якого буде рендеритись компонент, 
  //вибраний маршрутизацією
  template: "<router-outlet></router-outlet>"
})
export class AppComponent { }
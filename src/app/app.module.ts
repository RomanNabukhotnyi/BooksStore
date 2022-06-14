import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import { StoreComponent } from "./store/store.component";
import { CartDetailComponent } from "./store/cartDetail.component";
import { CheckoutComponent } from "./store/checkout.component";
import { StoreFirstGuard } from "./storeFirst.guard";

//декоратор @NgModule слугує для передачі інформації
@NgModule({
  //властивість declarations наказує Angular завантажити кореневий компонент
  declarations: [AppComponent],
  //властивість imports наказує Angular завантажити 
  //всі вказані функціональні модулі
  imports: [BrowserModule, StoreModule, RouterModule.forRoot([
    //нижче вказано набір маршрутів, кожний з яких зв'язує URL з компонентом
    { path: "store", component: StoreComponent, canActivate: [StoreFirstGuard] },
    { 
      path: "cart", component: CartDetailComponent, 
      canActivate: [StoreFirstGuard] 
    },
    { 
      path: "checkout", 
      component: CheckoutComponent, 
      canActivate: [StoreFirstGuard] 
    },
    { 
      path: "admin", 
      loadChildren: () => import("./admin/admin.module")
        .then(m => m.AdminModule), 
      canActivate: [StoreFirstGuard] 
    },
    { path: "**", redirectTo: "/store" },
  ])],
  //властивість providers реєструє захисник маршрутів в якості служби
  providers: [StoreFirstGuard],
  //властивість bootstrap повідомляє, що кореневим компонентом є клас AppComponent
  bootstrap: [AppComponent]
})
export class AppModule { }
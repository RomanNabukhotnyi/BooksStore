import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'cart-summary',
    templateUrl: 'cartSummary.component.html'
})
export class CartSummaryComponent {
    constructor(public cart: Cart) { }
    faShoppingCart = faShoppingCart;
}
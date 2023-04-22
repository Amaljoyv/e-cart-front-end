import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // decrCartItem(id: any) {
  //   throw new Error('Method not implemented.');
  // }

  // BASE_URL = 'http://localhost:3000'
  // deployed node server
  BASE_URL = 'https://ecart-r9kd.onrender.com'

  //to holdsearch term as behaviour subject
  searchTerm = new BehaviorSubject('')
  //to hold cart total count
  cartItemCount = new BehaviorSubject(0)
  

  constructor(private http:HttpClient) { 
    this.cartCount()
  }

  //get all products api
  getAllProducts(){
    //call  api
    return this.http.get(`${this.BASE_URL}/products/get-all-products`)
  }
  //view a product api
  viewAproduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/${id}`)
  }

  //products/add-to-wishlist
  addtowishlist(product:any){
    const body ={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }
    //api call
    return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`,body)
  }

  //get all items from wishlist
  getWishlistItem(){
    return this.http.get(`${this.BASE_URL}/wishlist/get-all-items`)
  }

  //removing an iteem from wishlist
  removeWishlistItem(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)
  }

  //add to cart
  addToCart(product:any){
    const body = {
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
     //api call
     return this.http.post(`${this.BASE_URL}/products/add-to-cart`,body)
  }
  
  //get cart
  getCart(){
    //api call
    return this.http.get(`${this.BASE_URL}/cart/get-all-items`)

  }
  
  //cartCount
  cartCount(){
    this.getCart().subscribe(
      (result:any)=>{
        this.cartItemCount.next(result.length)
      }
    )
  }

  //remove cart item
  removeCartItem(id:any){
    //apicacall
    return this.http.delete(`${this.BASE_URL}/cart/item/${id}`)
  }

  //increment cart item
  incrCartItem(id:any){
    return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)
  }

  //decrement cart item
  decrCartItem(id:any){
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)
  }

  //empty cart
  emptyCart(){
    return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)

  }
}

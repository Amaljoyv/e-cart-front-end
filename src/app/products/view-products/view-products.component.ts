import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  //to hold product id 
  productId:string=""
  product:any
  constructor(private viewActivatedRoute:ActivatedRoute ,private api:ApiService){

  }
  ngOnInit(): void {
    //get path parameter from component route
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data);
      this.productId = data.id
    })
    this.api.viewAproduct(this.productId).subscribe(
      //200
      (result:any)=>{
        this.product=result
      },
      //400
      (result:any)=>{
        console.log(result.error);
        
      }
      )
  }

  addToWishlist(product:any){
    this.api.addtowishlist(product).subscribe
    ((result:any)=>{
      alert(result)
      console.log(result)   
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

   //addtocart(product)
   addtocart(product:any){
    //add quantity key to product object with value as 1
    Object.assign(product,{quantity:1})
    console.log(product);
    
    //call api
    this.api.addToCart(product)
    .subscribe(
      (result:any)=>{
        //call cartcount
        this.api.cartCount()
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      }
    )
  }
}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';  
import axios from "axios";
 
/* Main Component */
export default class Main extends Component {
 
  constructor() {
   
    super();
    //Initialize the state in the constructor
    this.state = {
        products: [],
        currentProduct: null
    }
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('/api/products')
        .then(response => {
            return response.json();
        })
        .then(products => {
            //Fetched product is stored in the state
            this.setState({ products });
        });
  }
 
 renderProducts() {
    return this.state.products.map(product => {
        return (
            //this.handleClick() method is invoked onClick.
            <li onClick={
                () =>this.handleClick(product)} key={product.id} >
                { product.title } 
            </li>      
        );
    })
  }

  handleClick(product) {
    //handleClick is used to set the state
    this.setState({currentProduct:product});
   
  }

  async handleAddProduct(product) {
     console.log("product bitch",product)
let url ='api/products'
// trailing slash... turns it into a get request ie let url ='api/products/' ---> get not post
// changed the .then to be arrow function ala https://stackoverflow.com/questions/41042763/axios-reactjs-cannot-read-property-setstate-of-undefined#
     axios.post(url,product)
      .then((data) =>{
        console.log("res: ",data);
        this.setState((prevState)=> ({
                    products: prevState.products.concat(data.data),
                    currentProduct: data.data
                }))
                // when i switched it to an arrow function the data argument changed from being the new product 
                //to being the whole response from server with headers .. so went to data.data

      })
      .catch(function (error) {
        console.log(error);
        // getting error here : TypeError: Cannot read property 'setState' of undefined
        // it doesnt update the state but the res comes back ok then on refresh the state updates its like it temporarily doesnt know what 'this' is
      });

    product.price = Number(product.price);
  


    
  
  }

  

  
   
  render() {
   /* Some css code has been removed for brevity */ 











    
    return (
        <div>
            <h1>Products </h1>
              <ul>
                { this.renderProducts() }
              </ul> 
              <div>
              <Product product={this.state.currentProduct} />
              </div>
              <div>
                  
              <AddProduct onAdd={this.handleAddProduct} />
              </div>
            </div> 
       
    );
  }
}

//ok so there are 50 0-49 id items in products array this is generated by faker ...   when submit is hit that same 50 is pushed into the array in addition
//to the og 50 so that item 50 === item 0 why ....  also note it iterates 50 at a time so that 50,100,150, 200 the count doesnt go 50-100,200,400 
//  notes current product starts as whole array of 50 
// also current 

//only 50 in db state keeps adding the core 50 over and over on button press
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ItemService from '../services/ItemService';

class AddItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            price: '',
            discounted: false,
            discountPercentage: '',
            discountedPrice: '',
            inputType: "hidden",
            labelType: "hidden"
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
        this.changeDiscountPercentageHandler = this.changeDiscountPercentageHandler.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.hiddenHandler = this.hiddenHandler.bind(this);

    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    changeDiscountHandler = (event) => {
        const checked = event.target.checked;
        if(checked === true) {
            this.setState({discounted: true});
            this.hiddenHandler(true);
            
        } else {
            this.setState({discounted: false});
            this.hiddenHandler(false);
        }
    }

    hiddenHandler = (condition) => {
        if (condition == true) {
            this.setState({inputType: "number"});
            this.setState({labelType: ""});
        } else {
            this.setState({inputType: "hidden"});
            this.setState({labelType: "hidden"});
        }
    }

    changeDiscountPercentageHandler = (event) => {
        this.setState({discountPercentage: event.target.value});
    }

    saveItem = (e) => {
        e.preventDefault();
        
        const total = this.state.price - ((this.state.discountPercentage/100) * this.state.price);
       
        let item = {
            name: this.state.name,
            price: this.state.price,
            discounted: this.state.discounted,
            discountPercentage: this.state.discountPercentage,
            discountedPrice: total
        };
        console.log('item => ' + JSON.stringify(item));

        ItemService.addItem(item).then (res =>{
            this.props.history.push("/items");
        });
    }

    cancel = (e) =>{
        e.preventDefault();
        this.props.history.push("/items");
    }

    render() {
        return (
            <div>
              <div className="container">
                  <div className="row">
                      <div className="card col-md-6 offset-md-3 offset-md-3">
                          <br/>
                          <h3 className="text-center">Add Item</h3>
                          <div className="card-body">
                              <form>
                                  <div className="form-group">
                                      <label>Item Name:</label>
                                      <input type="text" placeholder="Item Name" name="name" className="form-control" 
                                      value={this.state.name} onChange={this.changeNameHandler}/>
                                  </div><br/>
                                  <div className="form-group">
                                      <label>Price:</label>
                                      <input type="number" placeholder="Price" name="price" className="form-control" 
                                      value={this.state.price} onChange={this.changePriceHandler}/>
                                  </div><br/>
                                  <div className="form-check">
                                     <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Discounted?
                                     </label>
                                    <input className="form-check-input" name="discounted" type="checkbox" value="true"
                                        onChange={this.changeDiscountHandler} id="flexCheckDefault"/>
                                  </div><br/>                                  
                                  <div className="form-group">
                                      <label hidden={this.state.labelType}>Discount Percentage:</label>
                                      <input type={this.state.inputType} placeholder="Discount Percentage" name="discountPercentage" className="form-control" 
                                      value={this.state.discountPercentage} onChange={this.changeDiscountPercentageHandler}/>
                                  </div><br/>
                                  <button className="btn btn-success" onClick={this.saveItem}>Save</button>
                                  <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        );
    }
}

export default withRouter(AddItemComponent);
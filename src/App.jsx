import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import './Reset.scss';
import Header from './components/headers/Header';
import Product from './components/products/Product';
import Footer from './components/footers/Footer';
import Datas from './data.json'

import {
   Card, CardImg, CardText, CardBody,
   CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import ModalPopup from './components/modals/ModalPopup';

const initDatas = Datas;

class App extends Component {


   state = {
      list: initDatas,
      listProduct: initDatas,
      keySearch: "",
      isDisplay: false,
      product: {},
      listProductToCart: [],
      value: false
   }

   // display or hide modal
   handleDisplay = (res) => {
      this.setState({
         isDisplay: true,
         product: res
      })
   }

   handleHide = () => {
      this.setState({
         isDisplay: false
      })
   }
   // add to cart
   handleAddToCart = (res, count) => {

      var index = this.state.listProductToCart.findIndex(product => product.name === res.name);
      if (index !== -1) {
         let _count = this.state.listProductToCart[index].count;
         const arr = [
            ...this.state.listProductToCart.slice(0, index),
            {
               ...this.state.listProductToCart[index],
               count: _count + count
            },
            ...this.state.listProductToCart.slice(index + 1)
         ];
         this.setState({
            listProductToCart: arr
         });

      } else {
         res.count = count;
         this.setState({
            listProductToCart: [...this.state.listProductToCart, res]
         })
      }
   }

   deleteCart = (id) => {
      const index = this.state.listProductToCart.findIndex(item => item._id === id);
      this.state.listProductToCart.splice(index, 1);
      this.setState({
         listProductToCart: [
            ...this.state.listProductToCart
         ]
      });
   }

   // ============================


   //before render
   componentWillMount = () => {
      this.setState({
         listProduct: this.state.list
      })
   }

   handleSearch = value => {
      this.setState({
         keySearch: value
      }, () => {
         this.filterProduct(this.state.keySearch);
      })
   }

   filterProduct = keyword => {
      const newArr = this.state.list.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
      this.setState({
         listProduct: newArr
      })
   }
   setValue = (status) => {
      this.setState({
         value: status
      })
   }

   render() {
      const { isDisplay } = this.state;

      return (
         <>
            <Header handle={this.handleSearch} listBuyProduct={this.state.listProductToCart} handleDelete={this.deleteCart} />
            <div className="main">
               <Container>
                  <Row>
                     {this.state.listProduct && this.state.listProduct.map(product =>
                        <Col sm="12" md="3" key={product._id} className="mt-3">
                           <Product
                              Product={product}
                              handlePopUp={this.handleDisplay}
                              addCart={this.handleAddToCart}
                              setValue={this.setValue}
                           />
                        </Col>
                     )}

                     {(() => {
                        if (this.state.listProduct.length === 0) {
                           return (
                              <Col md="12">
                                 <div className="imageE">
                                    <img src="assets/tree.png" />
                                 </div>
                                 <h3 className="text-center"> Sorry, no products matched your search!</h3>
                                 <p className="text-center">Enter a different keyword and try.</p>

                              </Col>
                           );
                        }
                     })()}

                  </Row>
               </Container>
            </div>
            <div className="footer">
               <Container>
                  <Footer />
               </Container>
            </div>

            <ModalPopup itemProduct={this.state.product} status={this.state.isDisplay} Status={this.handleHide} />

         </>
      )
   }
}

export default App


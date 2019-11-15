
import {
    Card, CardImg, CardText, CardBody, Col,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import './Product.scss';
import React, { Component } from 'react'

class Product extends Component {

    state = {
        count: 1
    }

    handleModal = () => {
        this.props.handlePopUp(this.props.Product)
    }
    sub = () => {
        this.setState({ count: this.state.count - 1 < 1 ? 1 : this.state.count - 1 }, this.props.setValue(true))
    }

    add = () => {
        this.setState({ count: this.state.count + 1 > 100 ? 100 : this.state.count + 1 }, this.props.setValue(true))
    }

    addToCart = () => {
        this.props.addCart(this.props.Product, this.state.count);
    }
    handleChange = e => {
        this.setState({
            count: parseInt(e.target.value)
        }, this.props.addCart(this.props.Product, e.target.value))

    }

    render() {
        const { Product } = this.props;
        return (
            <>
                <Card className="_card">
                    <div className="image" onClick={this.handleModal}>
                        <CardImg src={`/assets/${Product.picture}`} />
                    </div>

                    <CardBody>
                        <CardTitle className="text-center">{Product.name}</CardTitle>
                        <CardText className="text-center">
                            <p>$ {Product.price}</p>
                            <div className="stepper-input">
                                <Button className="sub" onClick={this.sub}><i className="fa fa-minus"></i></Button>
                                <input type="number" className="quantity" onChange={this.handleChange} value={!this.state.count ? '' : this.state.count} />
                                <Button className="add" onClick={this.add} ><i className="fa fa-plus"></i></Button>
                            </div>
                        </CardText>
                        <div className="text-center">
                            <Button color="success" onClick={this.addToCart} className="btn-block">ADD TO CART</Button>
                        </div>
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default Product


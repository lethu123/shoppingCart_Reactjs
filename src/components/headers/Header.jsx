import React, { Component } from 'react'
import './Header.scss';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row
} from 'reactstrap';


class Header extends Component {
    state = {
        isDisplay: false,
        noItem: 0,
        total: 0
    }
    cartPreview = React.createRef();
    componentDidMount = () => {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    // chuyen qua trang khac hoac khong dung component nay nuwa thi se goi componentwillUnmount
    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    handleClickOutside = (e) => {
        if (this.cartPreview.current.classList.contains('active')) {
            if (!this.cartPreview.current || !this.cartPreview.current.contains(e.target)) {
                this.setState({
                    isDisplay: false
                })
                e.stopPropagation();
            }
        }
    }
    handleOnChange = (event) => {
        this.props.handle(event.target.value);
    }
    handleSubmit = event => {
        event.preventDefault();
        const name = this.refs.usernameItem.value;
        console.log('Your name is', name);
    };
    handleOpen = () => {
        this.setState({ isDisplay: !this.state.isDisplay })
    }

    handleDelete = (value) => {
        console.log("value", value);
        this.props.handleDelete(value);
    }

    render() {
        let { listBuyProduct } = this.props;
        let { noItem, total } = this.state;
        noItem = listBuyProduct.length;

        let totalPrice = 0;
        console.log(typeof totalPrice);
        listBuyProduct.forEach(element => {
            totalPrice = totalPrice + parseInt(element.price) * parseInt(element.count);
        });
        total = totalPrice;
        return (
            <header>
                <Container>
                    <div className="header">
                        <div className="img">
                            <img src="./assets/Veggy.png" />
                        </div>
                        <div className="form">
                            <form onSubmit={this.handleSubmit} className="d-flex">
                                <input ref="usernameItem" type="search" onChange={this.handleOnChange} placeholder="Search for Vegetables and Fruits" className="search-keyword form-control" />
                                <Button className="btn-search" style={{ "background": "#077915" }}><i className="fa fa-search"></i></Button>
                            </form>
                        </div>
                        <div className="count_card">
                            <div className="text mr-3 ml-5">
                                {/* <p className="m-0">No. of items: <span>{this.state.noItem}</span></p>
                                 */}
                                <p className="m-0">No. of items: <span>{noItem}</span></p>

                                <p className="m-0">Sub total: <span> {totalPrice}</span></p>
                            </div>
                            <div className="imgCart">
                                <div className="cart-dropdown">
                                    <button onClick={this.handleOpen}><img src="assets/bag.png" alt="" /></button>

                                    <div ref={this.cartPreview} className={this.state.isDisplay ? "cart-dropdown-content active" : "cart-dropdown-content"} >
                                        {
                                            listBuyProduct.length !== 0 ?
                                                <div className="content scrollbar" id="scroll">
                                                    {listBuyProduct.map(item => (
                                                        <Row className="cart-item" key={item._id}>
                                                            <div className="cart_img">
                                                                <img src={`assets/${item.picture}`} alt="" />
                                                            </div>
                                                            <div className="name_price">
                                                                <p>{item.name}</p>
                                                                <p>{item.price} $</p>
                                                            </div>
                                                            <div className="total_price text-right">
                                                                <p>{item.count} No.</p>
                                                                <p>{item.count * item.price} $</p>
                                                            </div>
                                                            <div className="delete text-right" onClick={() => this.handleDelete(item._id)}>
                                                                <p><i className="fa fa-times"></i></p>
                                                            </div>
                                                        </Row>
                                                    ))}
                                                </div>
                                                :
                                                <div className="no_content">
                                                    <img src="assets/empty-cart.png" alt="" />
                                                    <h3>Your cart is empty</h3>
                                                </div>

                                        }
                                        <button>prosed to checkout</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>

            </header>
        )
    }
}

export default Header

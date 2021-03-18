import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import './App.css';
import { addProduct, delProduct, fetchProducts, toggleCreateProductModal, toggleEditProductModal, updateCreateProductData, updateEditProductData, updateProduct } from './store/actions/products';

class App extends Component {

    componentDidMount() {
        this.props.getProducts();
    };

    render() {
        let products = this.props.products.map((product) => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button color='secondary' size='sm' outline onClick={()=>this.props.toggleEditProductModal(product.id)}>EDIT</Button>{' '}
                        <Button color='danger' size='sm' outline onClick={()=>this.props.delProduct(product.id)}>DELETE</Button>
                    </td>
                </tr>
            );
        });

        return (
            <div className='App container'>
                <br />
                <h1>List of Products</h1>
                <br />
                <Button color='success' outline onClick={this.props.toggleCreateProductModal}>ADD PRODUCT</Button>
                <br />
                <br />

                <Modal isOpen={this.props.createProductModal} toggle={this.props.toggleCreateProductModal}>
                    <ModalHeader toggle={this.props.toggleCreateProductModal}>Please add a new product:</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name' placeholder='ex.: AMD Ryzen 5 3600' value={this.props.createProductData.name} onChange={(event) => {
                                this.props.updateCreateProductData({key:'name', value: event.target.value})
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='price'>Price</Label>
                            <Input id='price' placeholder='ex.: 1234' value={this.props.createProductData.price} onChange={(event) => {
                                this.props.updateCreateProductData({key:'price', value: event.target.value})
                            }} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary' onClick={this.props.addProduct}>ADD</Button>{' '}
                        <Button color='secondary' onClick={this.props.toggleCreateProductModal}>CANCEL</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.props.editProductModal} toggle={this.props.toggleEditProductModal}>
                    <ModalHeader toggle={this.props.toggleEditProductModal}>Edit product info:</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name' value={this.props.editProductData.name} onChange={(event) => {
                               this.props.updateEditProductData({key:'name', value:event.target.value});
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='price'>Price</Label>
                            <Input id='price' value={this.props.editProductData.price} onChange={(event) => {
                                this.props.updateEditProductData({key:'price', value:event.target.value});
                            }} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary' onClick={this.props.updateProduct}>UPDATE</Button>{' '}
                        <Button color='secondary' onClick={this.props.toggleEditProductModal}>CANCEL</Button>
                    </ModalFooter>
                </Modal>

                <Table bordered striped size='sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products}
                    </tbody>
                </Table>
            </div>
        );
    };
};

const mapStateToProps = ({ products: { products, createProductModal, editProductModal, editProductData, createProductData } }) => {
    return { products, createProductModal, editProductModal, editProductData, createProductData };
};

const mapDispatchToProps = {
    getProducts: fetchProducts,
    addProduct: addProduct,
    updateProduct: updateProduct,
    delProduct: (id) => delProduct(id),
    toggleCreateProductModal: toggleCreateProductModal,
    toggleEditProductModal: (id)=>toggleEditProductModal(id),
    updateCreateProductData: (data)=>updateCreateProductData(data),
    updateEditProductData: (data)=>updateEditProductData(data)
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
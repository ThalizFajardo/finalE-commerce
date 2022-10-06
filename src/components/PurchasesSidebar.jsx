import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { purchaseCartThunk } from '../store/slices/cart.slice';

import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PurchasesSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartThunk());
    }, []);




    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <ListGroup>
                    {cart.map(product => (
                        <ListGroupItem key={product.id}>
                            <Link to={`/products/${product.id}`}>{product.title}</Link>


                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Offcanvas.Body>

            <Button onClick={() => dispatch(purchaseCartThunk())}>Cheackout</Button>

        </Offcanvas>

    );
};

export default PurchasesSidebar;
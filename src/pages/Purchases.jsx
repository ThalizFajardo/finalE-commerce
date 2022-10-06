///AQUI SE ENLISTAN LAS COMPRAS QUE EL USUARIO HAGA
import React, { useEffect } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useNavigate } from 'react-router-dom';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases)


    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ListGroup>
                {
                    purchases.map((purchase) => (
                        <ListGroup.Item
                            key={purchase.id}
                        >
                            <div>
                                <p>{purchase.createdAt}</p>
                                {
                                    purchase.cart.products?.map((productPurchase) => (
                                        <ListGroup.Item
                                            key={productPurchase.id}
                                            onClick={() => navigate(`/products/${productPurchase?.id}`)}
                                        >


                                            <Row>
                                                <Col md={3} lg={2}>
                                                   <p>$ {productPurchase.price}</p>
                                                </Col>
                                                <Col>
                                                     <p>{productPurchase.title}</p>
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>


                                    ))}
                            </div>
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
};

export default Purchases;
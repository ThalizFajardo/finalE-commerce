import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { addCartThunk } from '../store/slices/cart.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();


    const productsList = useSelector(state => state.products)
    const [quantity, setCuantity] = useState(5);


    const productDetail = productsList.find(products => products.id === Number(id))
    const relatedProducts = productsList.filter(products => products.category?.id === productDetail.category?.id)

    useEffect(() => {
        setCuantity(5);
    }, [id]);


    const addCart = () => {
        const favorite = {
            id: id,
            quantity: quantity
        };
        dispatch(addCartThunk(favorite));
    };


    return (
        <Row>
            <Col>
                <h1>{productDetail?.title}</h1>
                <img src={productDetail?.productImgs} />
                <p>{productDetail?.description}</p>
                <div className="rate mb-5">
                    <Button className="me-3" onClick={() => setCuantity(quantity - 1)}>
                        -
                    </Button>
                    {quantity}
                    <Button className="ms-3" onClick={() => setCuantity(quantity + 1)}>
                        +
                    </Button>
                    <br />
                    <Button className="mt-2" onClick={addCart}>
                        Buy
                    </Button>
                </div>
                <img className="img-fluid" src={productDetail?.image} alt="" />
            </Col>
            <Col lg={3}>
                <ListGroup variant="flush">
                    {relatedProducts.map((related) => (
                        <ListGroup.Item key={related.id}>
                            <Link to={`/products/${related.id}`}>
                                <img src={related.image} className="img-fluid" />
                                {related.title}
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    );
};

export default ProductDetail;
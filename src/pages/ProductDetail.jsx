import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListGroup, Row, Col, Button, Carousel } from 'react-bootstrap';
import { addCartThunk } from '../store/slices/cart.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();


    const productsList = useSelector(state => state.products)
    const [quantity, setCuantity] = useState(1);


    const productDetail = productsList.find(products => products.id === Number(id))
    const relatedProducts = productsList.filter(products => products.category?.id === productDetail.category?.id)

    useEffect(() => {
        setCuantity(1);
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
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={productDetail?.productImgs[0]}
                            alt="First slide"
                        />

                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={productDetail?.productImgs[1]}
                            alt="Second slide"
                        />

                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={productDetail?.productImgs[2]}
                            alt="Third slide"

                        />

                    </Carousel.Item>
                </Carousel>
                <div className='description-container'>
                    <p>{productDetail?.description}</p>
                </div>

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
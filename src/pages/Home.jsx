import React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Row, Col, Card, InputGroup, Form, ListGroup } from 'react-bootstrap';


const Home = () => {

    const navigate = useNavigate();
    const productsList = useSelector(state => state.products);

    const [searchValue, setSearchValue] = useState("")
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])



    useEffect(() => {
        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setFilteredProducts(productsList)
    }, [productsList])

    const filterCategory = (id) => {
        const filtered = productsList.filter(products => products.category.id === id)
        setFilteredProducts(filtered)
    }

    const searchProducts = () => {
        const filtered = productsList.filter(products => products.title.includes(searchValue)
        )
        setFilteredProducts(filtered)
    }

    return (
        <Row>
            <Col lg={3}>
                <ListGroup>
                    {categories.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            onClick={() => filterCategory(category.id)}
                            style={{ cursor: "pointer" }}
                        >
                            {category.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search Products"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button variant="outline-secondary" onClick={searchProducts}>
                        Button
                    </Button>
                </InputGroup>
                <Row xs={1} md={2} xl={3} className="g-4">
                    {filteredProducts.map((product) => (
                        <Col key={product.id}>
                            <Card
                                onClick={() => navigate(`/products/${product.id}`)}
                                style={{ height: "100%" }}
                            >
                                <Card.Img variant="top"  src={product?.productImgs[1]} width={"10px"} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>Pricce: {product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Home;
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm();


    const submit = (data) => {

        console.log(data);

        axios
            .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                console.log(res.data.data.token)
                navigate("/")
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert("Credenciales inválidas");
                }
                console.log(error.response);
            });
    };

    return (

        <div style={{ maxWidth: "500px", margin: "0 auto" }} >

            <Form onSubmit={handleSubmit(submit)}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        {...register("email")}
                        type="email"
                        placeholder="romano@gmail.com"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register("password")}
                        type="password"
                        placeholder="roof1234" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            
            <div className='warning-login'>
                <p>* if you are not logged in, you will not be able to see the section of your purchases</p>
            </div>


        </div >


    );
};

export default Login;
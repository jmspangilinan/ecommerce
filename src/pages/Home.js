import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>Welcome to our E-Commerce Website</h1>
                <p>Discover a wide range of products just for you. Shop with ease and enjoy exclusive deals!</p>
                <Link className="btn btn-primary" to={"/products"}>Browse Products</Link>
                </Col>
        </Row>
    )
}
import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function AddProduct() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (user.id === null || !user.isAdmin) {
      navigate('/products');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (name && description && price) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [name, description, price]);

  function addProduct(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name,
        description,
        price
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          notyf.success('Product Added Successfully!');

          setName('');
          setDescription('');
          setPrice('');
          navigate('/products');
        } else {
          if (data.message === "Product already exists") {
            notyf.error("Product Already Exists");
            setName('');
            setDescription('');
            setPrice('');
          } else if (data.message === "Failed to save the course") {
            notyf.error("Unsuccessful Product Creation");
            setName('');
            setDescription('');
            setPrice('');
          } else {
            notyf.error("Unsuccessful Product Creation");
          }
        }
      })
  }

  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        <h1 className="text-center">Add New Product</h1>
        <Form onSubmit={addProduct}>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription">
            <Form.Label className='mt-3'>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label className='mt-3'>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required className='mb-3'
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={submitDisabled}
          >
            Add Product
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

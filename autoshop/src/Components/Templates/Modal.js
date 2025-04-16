import { use } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AutoContext } from '../../Context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalComponent() {
    const { handleClose, showModal, cart, setCart } = use(AutoContext);

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
                                {item.name} (x{item.quantity})
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;

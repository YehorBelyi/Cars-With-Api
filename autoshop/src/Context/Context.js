import { createContext, useState } from "react";
import axios from "axios";

export const AutoContext = createContext();

function Context({ children }) {
    const [amountOfCars, setAmountOfCars] = useState(6);
    const [autoList, setAutoList] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showModal, setModal] = useState(false);
    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    const api = "http://localhost:5174/api/Autoes";

    const getAutos = async (page = currentPage, quantity = amountOfCars, filter = "") => {
        await axios.get(api + `?page=${page}&pageSize=${quantity}&filter=${filter}`)
            .then((result) => {
                setAutoList(result.data);
                setTotalPages(+result.headers.get("X-Total-Pages"));
            })
            .catch((err) => console.log(err));
    };

    const addToCart = (car) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === car.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...car, quantity: 1 }];
        });
    };

    const value = {
        getAutos,
        autoList,
        setAutoList,
        amountOfCars,
        setAmountOfCars,
        showModal,
        handleClose,
        handleShow,
        cart,
        setCart,
        addToCart,
        currentPage,
        setCurrentPage,
        totalPages
    };

    return (
        <AutoContext value={value}>
            {children}
        </AutoContext>
    );
}

export default Context;

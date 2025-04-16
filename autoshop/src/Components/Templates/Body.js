import { useEffect, useState } from "react";
import { AutoContext } from "../../Context/Context";
import { use } from "react";
import PanelComponent from "./Panel";
import ModalComponent from "./Modal";
import PagingComponent from "./PaginatedButtons";
import "./Body.css"

function BodyComponent() {
    const { getAutos, autoList, currentPage, addToCart, totalPages } = use(AutoContext);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        getAutos(currentPage);
    }, [currentPage]);

    const filterHandler = (e) => setFilterValue(e.target.value);
    const checkKey = (e) => {
        if (e.key === "Enter") {
            getAutos(currentPage, 6, filterValue);
        }
    };

    return (
        <div className="newContainer">
            <ModalComponent />
            <div className="control-panel">
                <PanelComponent onChange={filterHandler} onKeyDown={checkKey} value={filterValue} />
                <PagingComponent />
            </div>
            <div className="autos">
                {autoList.map((item) => (
                    <div className="auto-card" key={item.id}>
                        <div className="auto-image">
                            <img src={item.imageUrl} alt={item.name} />
                        </div>
                        <div className="auto-info">
                            <p>Car name: {item.name}</p>
                            <p>Available: {item.quantity} cars</p>
                        </div>
                        <button onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BodyComponent;

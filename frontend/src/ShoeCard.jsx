import React from "react";
import "./ShoeCard.css"; // Стили для карточки

const ShoeCard = ({ shoe }) => {
    return (
        <div className="shoe-card">
            <a href="#" className="shoe-image-link">
                <img src={shoe.image} alt={shoe.name} className="shoe-image" />
            </a>
            <div className="shoe-details">
                <h3>{shoe.name}</h3>
                <p>{shoe.price} €</p>
                <button className="add-to-cart-button">Добавить в корзину</button>
            </div>
        </div>
    );
};

export default ShoeCard;

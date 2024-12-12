import React, { useEffect, useState } from 'react'
import './Home.css'

const Home = () => {
	const [sneakers, setSneakers] = useState([])
	const [cart, setCart] = useState([]) // Состояние для корзины

	useEffect(() => {
		fetch('http://localhost:3010/sneakers')
			.then((response) => response.json())
			.then((data) => setSneakers(data))
			.catch((error) => console.error('Ошибка загрузки данных:', error))
	}, [])

	// Функция для добавления товара в корзину
	const addToCart = (shoe) => {
		setCart((prevCart) => [...prevCart, shoe])
	}

	// Функция для удаления товара из корзины
	const removeFromCart = (index) => {
		setCart((prevCart) => prevCart.filter((_, i) => i !== index))
	}

	// Функция для обработки оплаты
	const handleCheckout = () => {
		if (cart.length === 0) {
			alert('Kärry on tyhjä. Lisää kohteita ennen maksua.')
		} else {
			alert('Jatketaan maksuun...')
			// Здесь можно реализовать логику перехода на страницу оплаты
		}
	}

	return (
		<div className='homepage'>
			<header className='welcome-header'>
				<h1>ADDShoes Store.</h1>
				<p>Kengät jokaiselle jalaille! </p>
				<div className='cart-indicator'>
					<section className='cart'>
						<h2>Ostoskori</h2>
						<ul>
							{cart.map((item, index) => (
								<li key={index}>
									{item.brand} {item.model} - {item.price} €
									<button
										className='remove-from-cart-button'
										onClick={() => removeFromCart(index)}
									>
										Poista
									</button>
								</li>
							))}
						</ul>
						<button className='checkout-button' onClick={handleCheckout}>
							Jatka maksuun
						</button>
					</section>
				</div>
			</header>
			<section className='shoes-gallery'>
				<h2>Kengät</h2>
				<div className='shoes-container'>
					{sneakers.map((shoe) => (
						<div key={shoe.id} className='shoe-card'>
							<img
								src={shoe.image_url}
								alt={shoe.model}
								className='shoe-image'
							/>
							<h3>{shoe.brand}</h3>
							<p>{shoe.model}</p>
							<p>{shoe.price} €</p>
							<button
								className='add-to-cart-button'
								onClick={() => addToCart(shoe)}
							>
								Lisää koriin
							</button>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default Home

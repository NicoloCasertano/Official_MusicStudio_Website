import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import SlideMenu from './components/slide-menu/SlideMenu'
import { MenuProvider } from './context/MenuContext'
import Hero from './components/hero/Hero';
import Footer from './components/footer/Footer';
import BeatsHome from './components/beats-home/BeatsHome';
import Gallery from './components/gallery/Gallery';
import BeatsPage from './components/beats-page/BeatsPage';
import CalendarPage from './components/calendar/Calendar';
import SingleBeat from './components/single-beat/SingleBeat';
import Basket from './components/basket/Basket';
import { CartProvider } from './context/CartContext';
import AboutUs from './components/about-us/AboutUs'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Testimonials from './components/testimonials/Testimonials';

import video1 from './assets/video1.mp4';
import video2 from './assets/video2.mp4';

const slides = [
	{name: '"Il miglior studio nel sud milano" cit. Gigione',video: video1},
	{name: '"competenza, avventura musicale, ricerca, scoperta di sè, ho imparato molto" cit. Kafka',video: video2},
	{name: '"Una scoperta che ormai ha 6 anni" cit. Giugioz',video: video1}
]

const Home = () => {
	return (
		<div>
			<Navbar />
			<Hero />
			<Testimonials slides={slides} className='slides-video'/>
			<BeatsHome />
			<Footer />
			<AboutUs />
		</div>
	)
}

const App = () => {
		return (
				<CartProvider>
					<MenuProvider>
						<Router>
							<SlideMenu />
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/gallery' element={<Gallery />} />
								<Route path='/beats' element={<BeatsPage />} />
								<Route path='/beats/:id' element={<SingleBeat />} />
								<Route path='/basket' element={<Basket />} />
								<Route path='/calendar' element={<CalendarPage />} />
								<Route path='/register' element={<Register />} />
								<Route path='/checkout' element={<Checkout />} />
							</Routes>
						</Router>
					</MenuProvider>
				</CartProvider>
		)
}


export default App
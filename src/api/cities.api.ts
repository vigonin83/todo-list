import { City } from '../modelToDo'
import imgMoscow from '../img/moscow.jpg'
import imgParis from '../img/paris.jpg'
import imgNewYork from '../img/newYork.jpg'
import imgTokyo from '../img/tokyo.jpg'

const cities = [
	{ id: 1, name: 'Москва', timezone: 'Europe/Moscow', img: imgMoscow },
	{ id: 2, name: 'Париж', timezone: 'Europe/Paris', img: imgParis },
	{ id: 3, name: 'Нью-Йорк', timezone: 'America/New_York', img: imgNewYork },
	{ id: 4, name: 'Токио', timezone: 'Asia/Tokyo', img: imgTokyo }
]

const fetchAll = ():Promise<City[]> =>
	new Promise((resolve:(value: City[] | PromiseLike<City[]>)=>void) => {
		window.setTimeout(() => {
			resolve(cities)
		}, 2000)
	})

export default fetchAll

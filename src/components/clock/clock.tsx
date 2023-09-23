import { FC, useEffect, useState } from 'react'
import styles from './clock.module.scss'
import { City } from '../../modelToDo'

interface IClockProps {
	cities: City[] | undefined
}

const Clock: FC<IClockProps> = ({ cities = [] }: IClockProps) => {
	const [city, setCity] = useState(cities[0])
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const interval = setInterval((): void => setTime(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])

	const handleCityChange = (currentCity: City) => {
		setCity(currentCity)
	}

	const currentHour = Intl.DateTimeFormat('ru-RU', {
		hour: 'numeric',
		timeZone: city.timezone
	}).format()

	const currentDay = Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		timeZone: city.timezone
	}).format()

	const currentWeekdayDay = Intl.DateTimeFormat('ru-RU', {
		weekday: 'long',
		timeZone: city.timezone
	}).format()

	const currentMonth = Intl.DateTimeFormat('ru-RU', {
		month: 'long',
		timeZone: city.timezone
	}).format()

	const getInflectMonths = (month: string): string | undefined => {
		let inflectMonth = ''
		if (month.endsWith('ь')) {
			return (inflectMonth = month.slice(0, -1) + 'я')
		} else if (month.endsWith('т')) {
			return (inflectMonth = month + 'a')
		} else {
			return (inflectMonth = month.slice(0, -1) + 'я')
		}
	}

	const currentInflectMont = getInflectMonths(currentMonth)

	const minutes: string = time.getMinutes() < 10 ? '0' + time.getMinutes() : '' + time.getMinutes()
	const seconds: string = time.getSeconds() < 10 ? '0' + time.getSeconds() : '' + time.getSeconds()
	const formatTime = `${currentHour}:${minutes}:${seconds}`

	return (
		<>
			<img
				src={city.img}
				alt='Фоновая картинка'
				className={styles.bgImage}
			/>
			<div className={styles.wrapper}>
				<p>{formatTime}</p>
				<p className={styles.date}>{`${currentWeekdayDay} | ${currentDay} ${currentInflectMont}`}</p>
				<p className={styles.cityName}>{city.name}</p>
				<ul className={styles.cityList}>
					{cities.map((cityItem: City) => {
						if (city !== cityItem) {
							return (
								<li
									className={styles.listItem}
									key={cityItem.id}
									onClick={() => handleCityChange(cityItem)}
								>
									{cityItem.name}
								</li>
							)
						}
					})}
				</ul>
			</div>
		</>
	)
}

export default Clock

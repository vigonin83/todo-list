import { FC, ReactNode, useEffect, useState } from 'react'
import Clock from './components/clock/clock'
import ToDoContainer from './layouts/toDoContainer'
import fetchAll from './api/cities.api'
import styles from './App.module.scss'
import { City } from './modelToDo'
import Loading from './components/loading/loading'

const App: FC = () => {
	const [cityList, setCityList] = useState<City[] | undefined>()

	useEffect(() => {
		fetchAll().then((data: City[]) => setCityList(data))
	}, [])

	return (
		cityList ?
		<div className={styles.currentTimeZone}>
			<Clock cities={cityList} />
			<ToDoContainer />
		</div> : <Loading />
	)
}
export default App

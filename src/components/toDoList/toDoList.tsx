import { FC, useState, useEffect } from 'react'
import styles from './toDoList.module.scss'
import { ToDo } from '../../modelToDo'
import ToDoItem from '../toDoItem/toDoItem'

interface IToDoListProps {
	toDoList: ToDo[]
	deleteAllToDo: () => void
	deleteToDo: (id: number | null) => void
	editToDo: () => void
	addFavouriteList: () => void
	addCheckedList: () => void
}

const ToDoList: FC<IToDoListProps> = ({
	toDoList,
	deleteAllToDo,
	deleteToDo,
	editToDo,
	addFavouriteList,
	addCheckedList
}: IToDoListProps) => {
	const [isUpatedToDoList, setIsUpdatedToDoList] = useState<Boolean>(false)

	const handleUpdate = () => {
		setIsUpdatedToDoList(!isUpatedToDoList)
	}
	return (
		<>
			<ul>
				{toDoList.map((toDo: ToDo) => (
					<ToDoItem
						key={toDo.id}
						toDo={toDo}
						toDoList={toDoList}
						deleteToDo={deleteToDo}
						updateToDoList={isUpatedToDoList}
						handleUpDateToDoList={handleUpdate}
						editToDo={editToDo}
						addFavouriteList={addFavouriteList}
						addCheckedList={addCheckedList}
					/>
				))}{' '}
			</ul>{' '}
			{toDoList.length > 1 ? (
				<button
					className={styles.delBtn}
					onClick={deleteAllToDo}
				>
					Удалить все дела
				</button>
			) : null}
		</>
	)
}

export default ToDoList

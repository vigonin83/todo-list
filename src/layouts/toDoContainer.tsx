import { FC, ChangeEvent, useState } from 'react'
import styles from './toDoContainer.module.scss'
import ToDoList from '../components/toDoList/toDoList'
import { ToDo } from '../modelToDo'
import CreateTodo from '../components/createToDo/createToDo'
import Pagination from '../components/pagination/pagination'

const ToDoContainer: FC = () => {
	const [isAddedTask, setIsAddedTask] = useState<boolean>(false)
	const [inputValue, setValue] = useState('')
	const [toDoList, setToDoList] = useState<ToDo[]>([])
	const [currentPage, setCurrentPage] = useState(1)

	const pageSize = 7
	const count = toDoList.length

	const handlePageChange = (pageIndex: number) => {
		setCurrentPage(pageIndex)
	}

	const paginate = (items: ToDo[], pageNumber: number, pageSize: number) => {
		const startIndex = (pageNumber - 1) * pageSize
		return [...items].splice(startIndex, pageSize)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const deleteToDo = (id: number | null) => {
		let updatedToDoList = toDoList.filter((toDo) => toDo.id !== id)
		setToDoList(updatedToDoList)
	}
	const deleteAllToDo = () => {
		setToDoList([])
	}
	const editToDo = () => {
		setToDoList(toDoList)
	}
	const addedTask = () => {
		setIsAddedTask(!isAddedTask)
	}

	const addFavouriteList = () => {
		const favouriteList = toDoList.filter((toDo) => toDo.priority)
		const currentList = toDoList.filter((toDo) => !toDo.priority)
		setToDoList([...favouriteList, ...currentList])
	}
	const addCheckedList = () => {
		const checkedList = toDoList.filter((toDo) => toDo.checked)
		const currentList = toDoList.filter((toDo) => !toDo.checked)
		setToDoList([...currentList, ...checkedList])
	}

	const handleCreateToDo = () => {
		if (inputValue) {
			setIsAddedTask(!isAddedTask)
			const toDo = {
				id: Date.now(),
				name: inputValue,
				priority: false,
				checked: false
			}
			if (inputValue && toDoList.some((toDo) => toDo.priority === true)) {
				const favouriteList = toDoList.filter((toDo) => toDo.priority)
				const currentList = toDoList.filter((toDo) => !toDo.priority)
				setToDoList([...favouriteList, toDo, ...currentList])

			} else if (inputValue) setToDoList([toDo, ...toDoList])

			setValue('')
		}
	}

	const toDoCrop = paginate(toDoList, currentPage, pageSize)

	return (
		<div className={styles.wrapper}>
			<ToDoList
				toDoList={toDoCrop}
				deleteAllToDo={deleteAllToDo}
				deleteToDo={deleteToDo}
				editToDo={editToDo}
				addFavouriteList={addFavouriteList}
				addCheckedList={addCheckedList}
			/>
			<CreateTodo
				handleChange={handleChange}
				handleCreate={handleCreateToDo}
				value={inputValue}
				isAddedTask={isAddedTask}
				addedTask={addedTask}
			/>
			<Pagination
				itemsCount={count}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default ToDoContainer

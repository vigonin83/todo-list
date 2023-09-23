import { FC, ChangeEvent, useState } from 'react'
import styles from './toDoItem.module.scss'
import { ToDo } from '../../modelToDo'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri'
import { MdAdd } from 'react-icons/md'
import { BsCheck } from 'react-icons/bs'
import Button from '../button/button'

interface IToDoItemProps {
	toDoList: ToDo[]
	toDo: ToDo
	deleteToDo: (id: number | null) => void
	updateToDoList: Boolean
	handleUpDateToDoList: () => void
	editToDo: () => void
	addFavouriteList: () => void
	addCheckedList: () => void
}

const ToDoItem: FC<IToDoItemProps> = ({
	toDo,
	deleteToDo,
	toDoList,
	updateToDoList,
	handleUpDateToDoList,
	editToDo,
	addFavouriteList,
	addCheckedList
}: IToDoItemProps) => {
	const [isUpdatedToDo, setIsUpdatedToDo] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState(toDo.name)
	const [isFavourite, setIsFavourite] = useState<boolean>(toDo.priority)
	const [isChecked, setIsChecked] = useState<boolean>(toDo.checked)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	const handleUpdate = () => {
		if (!updateToDoList) {
			setIsUpdatedToDo((prev) => !prev)
			handleUpDateToDoList()
		}
	}
	const handleUpdateToDo = (toDo: ToDo) => {
		handleUpDateToDoList()
		setIsUpdatedToDo(!isUpdatedToDo)
		setInputValue(inputValue)
		const index = toDoList.findIndex((toDoItem) => toDoItem.id === toDo.id)
		toDoList[index].name = inputValue
		editToDo()
	}

	const handleFavouriteChange = (toDo: ToDo) => {
		toDo.priority = !toDo.priority
		setIsFavourite(toDo.priority)
		addFavouriteList()
	}

	const handleCheck = (toDo: ToDo) => {
		toDo.checked = !toDo.checked
		setIsChecked(toDo.checked)
		setIsFavourite(false)
		toDo.priority = false
		addCheckedList()
	}

	const getStyles = () => {
		if (isChecked) return styles.wrapperChecked
		else if (isFavourite) return styles.favouriteItem
		return styles.wrapper
	}

	return (
		<>
			<li className={getStyles()}>
				{isUpdatedToDo ? (
					<>
						<input
							className={styles.addInput}
							value={inputValue}
							onChange={handleChange}
							autoFocus={true}
						/>
						<Button onClick={() => handleUpdateToDo(toDo)}>
							<MdAdd />
						</Button>
					</>
				) : (
					<div className={styles.itemWrapper}>
						<div className={styles.markWrapper}>
							{!isChecked ? (
								<div
									className={styles.addImportant}
									onClick={() => handleFavouriteChange(toDo)}
								>
									{isFavourite ? <HiStar /> : <HiOutlineStar />}
								</div>
							) : (
								<div className={styles.emptyLeft}></div>
							)}
							<div
								className={styles.noChecked}
								onClick={() => handleCheck(toDo)}
							>
								{isChecked ? <BsCheck /> : null}
							</div>
						</div>
						<p className={styles.text}>{toDo.name}</p>
						<div className={styles.btnWrapper}>
							{!isChecked ? (
								<button
									className={styles.editBtn}
									onClick={handleUpdate}
								>
									<RiEditLine />
								</button>
							) : (
								<div className={styles.emptyRight}></div>
							)}
							<button
								className={styles.delBtn}
								onClick={() => deleteToDo(toDo.id)}
							>
								<RiDeleteBin6Line />
							</button>
						</div>
					</div>
				)}
			</li>
		</>
	)
}

export default ToDoItem

import { FC, ChangeEvent } from 'react'
import styles from './createToDo.module.scss'
import { MdAdd } from 'react-icons/md'
import Button from '../button/button'

interface ICreateToDoProps {
	value: string
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	handleCreate: () => void
	isAddedTask: boolean
	addedTask: () => void
}

const CreateTodo: FC<ICreateToDoProps> = ({
	value,
	handleChange,
	handleCreate,
	isAddedTask,
	addedTask
}: ICreateToDoProps) => {
	return (
		<div className={styles.wrapper}>
			{isAddedTask ? (
				<>
					<input placeholder='Введите задачу'
						className={styles.addInput}
						name='toDo'
						onChange={handleChange}
						value={value}
						autoFocus={true}
					/>
					<Button onClick={handleCreate}><MdAdd/></Button>
				</>
			) : (
				<div className={styles.addWrapper}>
						<span>Добавьте задачу</span>
						<Button onClick={addedTask}><MdAdd/></Button>
				</div>
			)}
		</div>
	)
}

export default CreateTodo

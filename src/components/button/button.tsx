import { FC, ReactNode } from 'react'
import styles from './button.module.scss'

interface IButton {
	onClick: () => void
	children: ReactNode
}

const Button: FC<IButton> = ({ onClick, children }: IButton) => {
	return (
		<button
			className={styles.btn}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button

import { FC } from 'react'

import styles from './pagination.module.scss'

interface IPaginationProps {
	itemsCount: number
   pageSize: number
   currentPage: number
	onPageChange: (page: number) => void
}

const Pagination: FC<IPaginationProps> = ({ itemsCount, pageSize, onPageChange, currentPage }: IPaginationProps) => {
   const numberOfPages = Math.ceil(itemsCount / pageSize)
   if(numberOfPages === 1) return null

	const createPages = (): number[] => {
		const pages: number[] = []
		for (let index = 0; index < numberOfPages; index++) {
			pages.push(index + 1)
		}
		return pages
	}

	const pages = createPages()

	return (
		<nav className={styles.wrapper}>
			<ul className={styles.pageContainer}>
				{pages.map((page) => (
					<li
						className={page === currentPage ? styles.pageActive : styles.page}
						key={`page_${page}`}
						onClick={() => onPageChange(page)}
					>
						<a>{page}</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Pagination

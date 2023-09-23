type ToDo = {
	id: number
	name: string | undefined
	priority: boolean
	checked: boolean
}

type City = {
	id: number
	name: string | undefined
	timezone: string
	img: string
}

export type { ToDo, City}

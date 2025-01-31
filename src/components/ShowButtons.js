import { Header, Divider, Button, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrent, setCurrent } from './../features/app'
const ShowButtons = () => {
	const current = useSelector(selectCurrent)
	const dispatch = useDispatch()
	const handleUpdateCurrent = selected => dispatch(setCurrent(selected))
	return (
		<>
			<Header icon inverted>
				<Icon name="table" inverted />
				Show
			</Header>
			<Divider hidden />
			<Button.Group>
				<Button active={current === 'films'} onClick={() => handleUpdateCurrent('films')}>
					<Icon name="film" />
					Films
				</Button>
				<Button active={current === 'characters'} onClick={() => handleUpdateCurrent('characters')}>
					<Icon name="users" />
					Characters
				</Button>
				<Button active={current === 'starships'} onClick={() => handleUpdateCurrent('starships')}>
					<Icon name="rocket" />
					Starships
				</Button>
			</Button.Group>
		</>
	)
}
export default ShowButtons

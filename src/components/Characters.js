import { Button, Card, FormSelect, Loader, Message } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'
import { addFave } from '../features/faves'
import { useDispatch } from 'react-redux'
import Details from './Details'

const Characters = (props) => {
	const { data, isError, isLoading } = useGetCharactersQuery(props.viewPage)
	const dispatch = useDispatch()
	const selectCharacter = e => {
		const { name } = e.currentTarget.dataset
		const character = data.results.find(character => character.name === name)
		return character
	}
	const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		return(
			<Card.Group>
				{data.results.map(character => (
					<Card>
						<Card.Content>
							<Card.Header>{character.name}</Card.Header>
							{character && character.films && <Card.Meta> films : {character.films.length}</Card.Meta>}
							<Card.Description>
								Birth Year: {character.birth_year}<br/>
								Gender: {character.gender}<br/>
								Height: {character.height}<br/>
								Weight: {character.mass}<br/>
								Skin Colour: {character.skin_color}
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Details title={character.name} subtitle={"Born "+character.birth_year} description={character.height} footer={character.mass}/>
							<Button data-title={character.name} positive content="Add to favourites" onClick={addToFavourites} />
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		)
	} else if (data?.results?.length === 0) {
		return <Message warning>no films found</Message>
	}
	return null
}
export default Characters

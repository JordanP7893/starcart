import { Button, Card, FormSelect, Loader, Message } from 'semantic-ui-react'
import { useGetStarshipsQuery } from '../services/swapApi'
import { addFave } from '../features/faves'
import { useDispatch } from 'react-redux'
import Details from './Details'

const Starships = () => {
	const { data, isError, isLoading } = useGetStarshipsQuery()
	const dispatch = useDispatch()
	const selectStarship = e => {
		const { name } = e.currentTarget.dataset
		const starship = data.results.find(starship => starship.name === name)
		return starship
	}
	const addToFavourites = e => dispatch(addFave(selectStarship(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		return(
			<Card.Group>
				{data.results.map(starship => (
					<Card>
						<Card.Content>
							<Card.Header>{starship.name}</Card.Header>
							{starship && starship.films && <Card.Meta> films : {starship.films.length}</Card.Meta>}
							<Card.Description>
								Lenght: {starship.length}<br/>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Details title={starship.name} subtitle={starship.manufacturer} description={""} footer={"Passengers :" + starship.passengers}/>
							<Button data-title={starship.name} positive content="Add to favourites" onClick={addToFavourites} />
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
export default Starships
import { Button, Card, FormSelect, Loader, Message } from 'semantic-ui-react'
import { useGetFilmsQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import Details from './Details'

const Films = (props) => {
	const type = "film"
	const { data, isError, isLoading } = useGetFilmsQuery()
	const dispatch = useDispatch()
	const selectFilm = e => {
		const { title } = e.currentTarget.dataset
		const film = data.results.find(film => film.title === title)
		return film
	}
	const addToFavourites = e => dispatch(addFave(selectFilm(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		switch (props.type) {
			case "films": 
			return (
				<Card.Group>
					{data.results.map(film => (
						<StarCard title={film.title} subtitle={"characters :"+ film.characters.length} description={film.opening_crawl} footer={"Release date " + film.release_date} addToFavourites={addToFavourites}/>
					))}
				</Card.Group>
			)
			case "character":
				
		}
	} else if (data?.results?.length === 0) {
		return <Message warning>no films found</Message>
	}
	return null
}
export default Films


function StarCard(props) {
	return (
		<Card key={nanoid()}>
			<Card.Content>
				<Card.Header>{props.title}</Card.Header>
				<Card.Meta>{props.subtitle}</Card.Meta>
				<Card.Description>{props.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Details title={props.title} subtitle={"Directed by "+props.subtitle} description={props.description} footer={props.footer}/>
				<Button data-title={props.title} positive content="Add to favourites" onClick={props.addToFavourites} />
			</Card.Content>
		</Card>
	);
}

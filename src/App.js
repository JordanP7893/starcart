import React, { useState } from 'react'
import { Button, Container, Header, Menu, Segment } from 'semantic-ui-react'
import { selectCurrent } from './features/app'
import Main from './Main'
import { useSelector } from 'react-redux'
import Films from './components/Films'
import Characters from './components/Characters'
import { render } from '@testing-library/react'
import Starships from './components/Starships'
function App() {
	const current = useSelector(selectCurrent)

	let [page, updatePage] = useState(1)

	return (
		<>
			<Container fluid inverted>
				<Segment inverted>
					<Header as="h1" content="Star Cart 🚀" />
					<Menu large pointing secondary></Menu>
					<Main />
				</Segment>
			</Container>
			<Container>
				<>
				<Segment fluid>
					{current === 'films' && <Films type="films"/>}
					{current === 'characters' && <Characters viewPage={page}/>}
					{current === 'starships' && <Starships />}
				</Segment>
				<Button onClick={() => previousPage()}>Previous</Button>
				<Button onClick={() => nextPage()}>Next</Button>
				</>
			</Container>
		</>
	)

	function nextPage() {
		const newPage = page + 1;
		updatePage(newPage);
	}

	function previousPage() {
		const newPage = page - 1;
		if (newPage <= 0) {newPage = 1}
		updatePage(newPage);
	}
}

export default App

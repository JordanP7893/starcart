import { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const Details = ({ title, subtitle, description, footer }) => {
	const [modalOpen, setModalOpen] = useState(false)
	if (title) {
		return (
			<Modal
				onOpen={() => setModalOpen(true)}
				onClose={() => setModalOpen(false)}
				open={modalOpen}
				trigger={<Button onClick={() => setModalOpen(true)}>view</Button>}
			>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Content>
					{subtitle}
					<Modal.Description>{description}</Modal.Description>
					<Modal.Description>
						<strong>{footer}</strong>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		)
	}
	return null
}
export default Details

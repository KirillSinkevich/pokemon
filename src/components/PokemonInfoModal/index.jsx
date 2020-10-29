import React, { Component } from 'react';
import Modal from 'react-modal';
import { withRouter } from "react-router";

import styles from './index.module.scss';

class PokemonInfoModal extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render () {
		return (
			<Modal
				isOpen={true}
				className={styles.modal}
				overlayClassName={styles.overlay}
				onRequestClose={() => this.props.history.push("/")}
				appElement={document.getElementById("app")}
			>
				<div>avagcuahlci</div>
			</Modal>
		)
	}
}

export default withRouter(PokemonInfoModal);
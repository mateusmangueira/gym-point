import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile, Logo, Navigation } from './styles';

export default function Header() {
	const profile = useSelector(state => state.user.profile);

	return (
		<Container>
			<Content>
				<nav>
					<Logo>
						<img src={logo} alt="GymPoint" />
						<Link to="/">GYMPOINT</Link>
					</Logo>
					<Navigation>
						<NavLink to="/students">ALUNOS</NavLink>
						<NavLink to="/plans">PLANOS</NavLink>
						<NavLink to="/enrollments">MATRÍCULAS</NavLink>
						<NavLink to="/helpOrders">PEDIDOS DE AUXÍLIO</NavLink>
					</Navigation>
				</nav>

				<aside>
					<Profile>
						<strong>{profile.name}</strong>
						<button type="button">sair do sistema</button>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}

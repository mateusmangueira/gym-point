import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile, Logo, Navigation } from './styles';

import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const student = useSelector(state => state.student.students) || [];

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

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
            <strong>{student.name} </strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

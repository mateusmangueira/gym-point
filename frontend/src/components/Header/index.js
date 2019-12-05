import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile, Logo, Navigation } from './styles';

import { store } from '../../store';

import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  const { signed } = useSelector(state => state.auth);

  const authName = useMemo(() => store.getState().auth.name, [signed]); // eslint-disable-line

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
            <strong>{authName}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

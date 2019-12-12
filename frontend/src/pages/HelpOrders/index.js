import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Form } from '@rocketseat/unform';
import { Container, Content, Items, Nav } from './styles';
import { Modal } from '~/components/Modal';

import api from '../../services/api';

import {
  answerHelpOrderRequest,
  loadOneHelpOrderRequest,
} from '~/store/modules/helpOrder/actions';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const [helpOrders, setHelpOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [aHelp] = useSelector(state => state.helpOrder.helpOrder) || [];
  const [question, setQuestion] = useState('');

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        const response = await api.get('/help-orders');

        setHelpOrders(response.data);
      } catch (error) {
        toast.error('Não foi possível carregar os pedidos de auxílio.');
      }
    }

    loadHelpOrders();
  }, []);

  function handleOpenModal(id) {
    dispatch(loadOneHelpOrderRequest(id));
    setShowModal(!showModal);
    if (aHelp) {
      setQuestion(aHelp.question);
    } else {
      toast.warn('Os pedidos estão sendo carregados');
    }
  }

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleAnswer({ answer }) {
    dispatch(answerHelpOrderRequest(answer, aHelp.id));
  }

  return (
    <Container>
      <Content>
        <Nav>
          <strong>Pedidos de auxílio</strong>
        </Nav>

        <Modal show={showModal} handleClose={handleModal}>
          <Form onSubmit={handleAnswer}>
            <p>Pergunta do Aluno</p>
            <p className="question">{question}</p>
            <p>Sua resposta</p>
            <Input
              name="answer"
              type="text"
              placeholder="Digite uma resposta"
              autoComplete="off"
              multiline
            />
            <button type="submit" onClick={handleModal}>
              Responder Aluno
            </button>
          </Form>
        </Modal>

        <Items>
          <table>
            <thead>
              <tr>
                <th className="align-left">ALUNO</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(help => (
                <tr key={help.id}>
                  <td className="align-left">{help.student.name}</td>
                  <td className="answer">
                    <button
                      className="help"
                      type="button"
                      onClick={() => handleOpenModal(help.id)}
                    >
                      Responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Items>
      </Content>
    </Container>
  );
}

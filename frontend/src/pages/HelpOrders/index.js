import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Form } from '@rocketseat/unform';
import { Container, Content, Items, Nav } from './styles';
import { Modal } from '~/components/Modal';

import {
  helpOrdersRequest,
  oneHelpOrderRequest,
  answerHelpOrderRequest,
} from '../../store/modules/help_order/actions';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const helpOrders = useSelector(state => state.helpOrders) || [];
  const [showModal, setShowModal] = useState(false);
  const [oneHelp] = useSelector(state => state.helpOrder) || [];
  const [question, setQuestion] = useState('');

  useEffect(() => {
    dispatch(helpOrdersRequest());
  }, []); // eslint-disable-line

  function handleOpenModal(id) {
    dispatch(oneHelpOrderRequest(id));
    setShowModal(!showModal);
    if (oneHelp) {
      setQuestion(oneHelp.question);
    } else {
      toast.warn('Problemas com os dados');
    }
  }

  function hideModal() {
    setShowModal(!showModal);
  }

  function handleAnswer({ answer }) {
    dispatch(answerHelpOrderRequest(answer, oneHelp.id));
  }

  return (
    <Container>
      <Content>
        <Nav>
          <strong>Pedidos de auxílio</strong>
        </Nav>

        <Modal show={showModal} handleClose={hideModal}>
          <Form onSubmit={handleAnswer}>
            <p>Pergunta do Aluno</p>
            <p className="question">{question}</p>
            <p>Sua resposta</p>
            <Input
              name="answer"
              type="text"
              placeholder="Digite sua resposta"
              autoComplete="off"
              multiline
            />
            <button type="submit" onClick={hideModal}>
              Responder pedido
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

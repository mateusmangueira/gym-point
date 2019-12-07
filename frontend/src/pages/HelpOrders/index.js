import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Form } from '@rocketseat/unform';
import { Modal } from '~/components/Modal';

import { Container, Content, ListHelpOrders, Nav } from './styles';

import {
  loadAllHelpOrdersRequest,
  loadOneHelpOrderRequest,
  answerHelpOrderRequest,
} from '../../store/modules/helpOrder/actions';

export default function HelpOrder() {
  const dispatch = useDispatch();
  const helps = useSelector(state => state.helpOrder.allHelpOrders) || [];
  const [showModal, setShowModal] = useState(false);
  const [order] = useSelector(state => state.helpOrder.helpOrder) || [];
  const [question, setQuestion] = useState('');

  useEffect(() => {
    dispatch(loadAllHelpOrdersRequest());
  }, []); // eslint-disable-line

  function handleOpenModal(id) {
    dispatch(loadOneHelpOrderRequest(id));
    setShowModal(!showModal);
    if (order) {
      setQuestion(order.question);
    } else {
      toast.error('Problemas com os pedidos de auxílio');
    }
  }

  function hideModal() {
    setShowModal(!showModal);
  }

  function handleAnswer({ answer }) {
    dispatch(answerHelpOrderRequest(answer, order.id));
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
              placeholder="Digite uma resposta"
              autoComplete="off"
              multiline
            />
            <button type="submit" onClick={hideModal}>
              Responder Aluno
            </button>
          </Form>
        </Modal>

        <ListHelpOrders>
          <table>
            <thead>
              <tr>
                <th className="align-left">ALUNO</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {helps.map(help => (
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
        </ListHelpOrders>
      </Content>
    </Container>
  );
}

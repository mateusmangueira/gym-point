import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Form } from '@rocketseat/unform';
import { Modal } from '~/components/Modal';

import { Container, Content, ListHelpOrders, Nav } from './styles';

import {
  helpOrdersRequest,
  oneHelpOrderRequest,
  answerHelpOrderRequest,
} from '../../store/modules/help_order/actions';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const helpOrders = useSelector(state => state.help_order.allHelpOrders) || [];
  const [help] = useSelector(state => state.help_order.helpOrder) || [];
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    dispatch(helpOrdersRequest());
  }, []); // eslint-disable-line

  function handleOpenModal(id) {
    dispatch(oneHelpOrderRequest(id));
    setShowModal(!showModal);
    if (help) {
      setQuestion(help.question);
    } else {
      toast.error('Problemas com os dados');
    }
  }

  function hideModal() {
    setShowModal(!showModal);
  }

  function handleAnswer({ answer }) {
    dispatch(answerHelpOrderRequest(answer, help.id));
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
        </ListHelpOrders>
      </Content>
    </Container>
  );
}

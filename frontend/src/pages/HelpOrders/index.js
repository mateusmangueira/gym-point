import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import ButtonRegister from '~/components/ButtonRegister';
import { Container, Content, HelpTable } from './styles';

export default function Plans() {
  const [orders, setOrders] = useState([]);

  async function handleOrders() {
    const response = await api.get('help-orders');

    setOrders(response.data);
  }

  useEffect(() => {
    handleOrders();
  }, []);

  async function answerOrder({ id }) {
    try {
      await api.post(`help-orders/${id}`);
      handleOrders();

      toast.success('Ordem respondida com sucesso!');
    } catch (err) {
      toast.error('Houve um erro na resposta do pedido, verifique os dados');
    }
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando pedidos de ajuda</h1>
          <ButtonRegister
            type="button"
            onClick={() => {
              history.push('/help-orders/register');
            }}
          />
        </header>

        <HelpTable>
          <thead>
            <tr>
              <th>Pedido de Ajuda</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.question}</td>

                <td>
                  <div>
                    <button type="button" onClick={() => answerOrder(order)}>
                      Apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </HelpTable>
      </Content>
    </Container>
  );
}

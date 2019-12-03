import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Container, Content, HelpTable } from './styles';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);

  async function handleHelpOrders() {
    const response = await api.get('help-orders');
    setHelpOrders(response.data);
  }

  useEffect(() => {
    handleHelpOrders();
  }, []);

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando planos</h1>
        </header>

        <HelpTable>
          <thead>
            <tr>
              <th>Pedido de auxílio</th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>
                <td>
                  <div>
                    <Link>responder</Link>
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

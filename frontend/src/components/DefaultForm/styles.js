import styled from 'styled-components';

import { Form } from '@rocketseat/unform';

export const DefaultForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 900px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  span {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    padding: 13px 15px;

    & + span {
      margin-top: 20px;
    }
  }

  div {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0;

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

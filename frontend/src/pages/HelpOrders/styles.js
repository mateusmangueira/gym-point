import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 34px;
`;

export const Content = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 24px;

    h1 {
      font-size: 24px;
      color: #444;
    }
  }
`;

export const HelpTable = styled.table`
  width: 100%;
  background: #fff;
  padding: 30px 30px 0px 30px;

  thead th {
    text-align: left;
    font-size: 16px;
    color: #444;
    padding-bottom: 20px;
  }

  tbody tr {
    & + tr {
      td {
        padding-top: 15px;
        border-top: 1px solid #eee;
      }
    }
  }

  td {
    font-size: 16px;
    color: #666;
    padding-bottom: 15px;
  }

  th + th {
    text-align: center;
  }

  td {
    div {
      text-align: right;

      a {
        margin-right: 23px;
        color: ${colors.info};
      }

      button {
        font-size: 16px;
        margin-right: 0;
        background: none;
        border: 0;
        color: ${colors.primary};
      }
    }
  }
`;

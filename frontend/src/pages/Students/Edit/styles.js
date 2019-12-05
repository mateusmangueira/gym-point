import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 270px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 900px;
    margin-bottom: 24px;

    div {
      display: flex;
      align-items: center;
    }
  }
`;

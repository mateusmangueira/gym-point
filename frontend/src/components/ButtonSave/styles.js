import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Button = styled.button`
  height: 36px;
  width: 112px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  /* padding: 10px 16px; */

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 16px;
  background: ${colors.primary};

  transition: background 0.2s;

  &:hover {
    background: ${darken(0.12, colors.primary)};
  }

  svg {
    margin-right: 8px;
  }
`;

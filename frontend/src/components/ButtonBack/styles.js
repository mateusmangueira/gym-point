import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
	height: 36px;
	width: 112px;
	font-size: 14px;
	font-weight: bold;
	color: #fff;
	border: 0;
	border-radius: 4px;

	display: flex;
	justify-content: center;
	align-items: center;
	transition: background 0.2s;

	background: #ccc;

	&:hover {
		background: ${darken(0.03, '#ccc')};
	}

	svg {
		margin-right: 8px;
	}
`;

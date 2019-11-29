import styled from 'styled-components';

import { Form } from '@rocketseat/unform';

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

		div {
			display: flex;
			align-items: center;
		}
	}
`;

export const NewForm = styled(Form)`
	background: #fff;
	padding: 30px;

	span {
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 8px;
		color: #444;
	}
`;

export const DivForm = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 0;

	div {
		display: flex;
		flex-direction: column;

		input {
			padding-left: 15px;
			width: 200px;
		}
	}
`;

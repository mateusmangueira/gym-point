import styled from 'styled-components';

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
		padding-bottom: 24px;

		h1 {
			font-size: 24px;
		}

		div {
			display: flex;
			align-items: center;
		}
	}
`;

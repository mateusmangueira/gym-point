import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 34px;
`;

export const Content = styled.div`
	width: 1380px;
	display: flex;
	flex-direction: column;
	padding: 0 30px 0;

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

export const EnrollmentTable = styled.table`
	width: 100%;
	background: #fff;
	border-radius: 4px;
	padding: 30px 30px 0px 30px;

	thead th {
		text-align: left;
		font-size: 16px;
		color: #444;
		padding-bottom: 20px;
	}

	td {
		font-size: 16px;
		padding-bottom: 15px;
		color: #666;
	}

	th + th {
		text-align: center;
	}

	td + td {
		text-align: center;
	}

	td {
		div {
			text-align: right;

			a {
				margin-right: 23px;
				color: ${colors.info};
				font-size: 15px;
			}

			button {
				font-size: 15px;
				margin-right: 0;
				background: none;
				border: 0;
				color: ${colors.primary};
			}
		}
	}
`;

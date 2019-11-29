import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
	background: #fff;
	padding: 0 30px;
`;

export const Content = styled.div`
	height: 64px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;

	nav {
		display: flex;
	}

	aside {
		display: flex;
		align-items: center;
	}
`;

export const Profile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	strong {
		font-size: 14px;
		color: #666666;
		margin-bottom: 4px;
	}

	button {
		border: 0;
		background: none;
		font-size: 14px;
		color: ${colors.primary};
		text-align: right;
	}
`;

export const Logo = styled.div`
	display: flex;
	align-items: center;
	margin-right: 30.5px;
	padding-right: 30.5px;
	border-right: 1px solid #ddd;

	img {
		height: 24px;
		margin-right: 12px;
	}

	a {
		font-weight: bold;
		color: ${colors.primary};
	}
`;

export const Navigation = styled.div`
	display: flex;
	align-items: center;

	a {
		margin-right: 20px;
		font-size: 15px;
		font-weight: bold;
		color: #999;

		&:hover {
			color: ${colors.primary};
		}

		&.active {
			color: #444;
		}
	}
`;

import './index.scss';

const Button = ({ label, onClick }) => {
	return (
		<div className="button-wrapper">
			<button onClick={onClick}>{label}</button>
		</div>
	);
};

export default Button;

import React from 'react';

interface CalcButtonProps {
	name: string;
	id?: string;
	onClick?: () => void;
};

const CalcButton = (props : CalcButtonProps) => {
	return (
		<button id={props.id} onClick={props.onClick}>{props.name}</button>
	);
};

export default CalcButton;
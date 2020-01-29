import React, { useState } from 'react';
import CalcButton from './CalcButton';

enum Opr {
	ADD = '+', 
	SUB = '-', 
	MUL = '×', 
	DIV = '÷', 
	PASS = ''
};

interface CalculatorProps {
	name?: string;
};

const Calculator = (props : CalculatorProps) => {
	const [showHi, setShowHi] = useState<Boolean>(false);
	const [hiValue, setHiValue] = useState<number>(0);

	/*
		현재 입력된 숫자의 문자열 표현
	*/
	const [curNum, setCurNum] = useState<string>('0');

	/*
		현재 연산자
	*/
	const [opr, setOpr] = useState<Opr>(Opr.ADD);

	/*
		현재 연산자 상태에 맞는 연산을 하여 결과를 반환한다.
		만약 연산자 지정이 안 되어있으면 b를 반환한다.
	*/
	const operate = (a: number, b: number) => {
		if (opr === Opr.ADD)
			return a + b;
		else if (opr === Opr.SUB)
			return a - b;
		else if (opr === Opr.MUL)
			return a * b;
		else if (opr === Opr.DIV)
			return a / b;
		else
			return b;
	};

	/*
		현재 입력 중인 숫자에 새로운 숫자를 더한다.
	*/
	const generateOnNumber = (s: string) => {
		return () => {
			if (curNum === '0')
				setCurNum(s);
			else
				setCurNum(curNum + s);
		};
	};

	/*
		현재 입력 중인 숫자가 정수면 점을 찍는다.
	*/
	const onPressDot = () => {
		if (!curNum.includes('.'))
			setCurNum(curNum + '.');
	};
	
	/*
		현재 입력 중인 숫자의 맨 마지막 자리를 지운다.
	*/
	const onPressErase = () => {
		if (curNum.length > 1)
			setCurNum(curNum.substring(0, curNum.length - 1));
		else
			setCurNum('0');
	};

	/*
		현재 입력 중인 숫자를 임시값에 반영하고
		연산모드를 변경하며 새로운 숫자를 입력할
		준비를 한다.
	*/
	const generateOnOpr = (s: Opr) => {
		return () => {
			setShowHi(true);
			setHiValue(operate(hiValue, parseFloat(curNum)));
			setOpr(s);
			setCurNum('0');
		}
	};

	/*
		현재 입력 중인 숫자와 임시값을 모두 초기화한다.
	*/
	const onPressClear = () => {
		setShowHi(false);
		setHiValue(0);
		setOpr(Opr.PASS);
		setCurNum('0');
	};

	/*
		= 기호를 눌렀을 때 일로, 연산 결과를 현재 값으로 보여준다.
	*/
	const onPressAssign = () => {
		setShowHi(false);
		if (opr !== Opr.PASS) {
			setCurNum('' + operate(hiValue, parseFloat(curNum)));
		}
		setOpr(Opr.PASS);
		setHiValue(0);
	};

	/*
		RENDERING
	*/
	return (
		<div className='calculator'>
		  {/* DISPLAY */}
		  <div className='displayer'>
		  	<div className='displayerHi'>
		  	  <span className='hiValue'>{showHi ? hiValue : ''}</span>
		  	</div>
		  	<div className='displayerLo'>
			  <span className='opr'>{showHi ? opr : ''}</span>
		  	  <span className='loValue'>{curNum}</span>
		  	</div>
		  </div>
		  <div className='buttons'>
		  {/* BUTTONS LIEN 1*/}
		  <div>
		  	<CalcButton name='7' onClick={generateOnNumber('7')} />
		  	<CalcButton name='8' onClick={generateOnNumber('8')} />
		  	<CalcButton name='9' onClick={generateOnNumber('9')} />
		  	<CalcButton name='→' onClick={onPressErase} />
		  	<CalcButton name='C' onClick={onPressClear} />
		  </div>
		  {/* BUTTONS LIEN 2*/}
		  <div>
		  	<CalcButton name='4' onClick={generateOnNumber('4')} />
		  	<CalcButton name='5' onClick={generateOnNumber('5')} />
		  	<CalcButton name='6' onClick={generateOnNumber('6')} />
		  	<CalcButton name='+' onClick={generateOnOpr(Opr.ADD)} />
		  	<CalcButton name='-' onClick={generateOnOpr(Opr.SUB)} />
		  </div>
		  {/* BUTTONS LIEN 3*/}
		  <div>
		  	<CalcButton name='1' onClick={generateOnNumber('1')} />
		  	<CalcButton name='2' onClick={generateOnNumber('2')} />
		  	<CalcButton name='3' onClick={generateOnNumber('3')} />
		  	<CalcButton name='×' onClick={generateOnOpr(Opr.MUL)} />
		  	<CalcButton name='÷' onClick={generateOnOpr(Opr.DIV)} />
		  </div>
		  {/* BUTTONS LIEN 4*/}
		  <div>
		  	<CalcButton name='0' id='bt0' onClick={generateOnNumber('0')} />
		  	<CalcButton name='.' id='btdt' onClick={onPressDot} />
		  	<CalcButton name='=' id='bteq' onClick={onPressAssign }/>
		  </div>
		  </div>
		</div>
	);
};

export default Calculator;
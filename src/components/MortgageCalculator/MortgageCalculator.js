// src/components/MortgageCalculator/MortgageCalculator.js
import React, { useState } from 'react';
import { Container, Input, Button, Row, Col, Text, Spacer } from '@nextui-org/react';

const MortgageCalculator = () => {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const principal = price - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyInterestRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  };

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center', marginBottom: '2rem' }}>
        Mortgage Calculator
      </Text>
      <Row justify="center" css={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Col>
          <Input
            clearable
            bordered
            label="Property Price ($)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            css={{ width: '100%' }}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            label="Down Payment ($)"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            css={{ width: '100%' }}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            label="Loan Term (Years)"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            css={{ width: '100%' }}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            css={{ width: '100%' }}
          />
          <Spacer y={2} />
          <Button color="primary" onClick={calculateMortgage}>
            Calculate
          </Button>
        </Col>
      </Row>

      {monthlyPayment !== null && (
        <Text h3 css={{ textAlign: 'center', marginTop: '2rem' }}>
          Estimated Monthly Payment: ${monthlyPayment}
        </Text>
      )}
    </Container>
  );
};

export default MortgageCalculator;

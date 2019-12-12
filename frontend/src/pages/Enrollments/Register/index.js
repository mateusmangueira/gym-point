import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Select } from '@rocketseat/unform';
import { addMonths } from 'date-fns';

import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { loadAllPlansRequest } from '~/store/modules/plan/actions';
import { loadAllStudentsRequest } from '~/store/modules/student/actions';
import { createEnrollmentRequest } from '~/store/modules/enrollment/actions';

import { Container, Content, Nav, Box, Inputs } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string().required('É obrigatório selecionar um aluno.'),
  plan_id: Yup.string().required('É obrigatório selecionar um plano'),
});

export default function RegistrationCreate() {
  const dispatch = useDispatch();
  const [start_date, setStartDate] = useState(new Date());
  const plans = useSelector(state => state.plan.allPlans) || [];
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [choosenPlan, setChoosenPlan] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);

  const students =
    useSelector(state => {
      const titledStudents = state.student.allStudents.map(s => {
        const newTitled = {
          id: s.id,
          title: s.name,
        };
        return newTitled;
      });
      return titledStudents;
    }) || [];

  useEffect(() => {
    dispatch(loadAllPlansRequest());
    dispatch(loadAllStudentsRequest());
  }, []);  // eslint-disable-line

  function handleSubmit({ student_id, plan_id }) {
    dispatch(createEnrollmentRequest(student_id, plan_id, start_date));
  }

  useEffect(() => {
    let currentPlan = {};
    if (selectedPlanId) {
      currentPlan = plans.find(item => item.id.toString() === selectedPlanId);
    }
    setChoosenPlan(currentPlan);
  }, [selectedPlanId]);// eslint-disable-line

  useEffect(() => {
    if (selectedPlanId) {
      setEndDate(addMonths(start_date, choosenPlan.duration));
    }
  }, [choosenPlan, start_date]); // eslint-disable-line


  useEffect(() => {
    if (selectedPlanId) {
      const { price, duration } = choosenPlan;
      setFinalPrice(price * duration);
    }
  }, [choosenPlan]); // eslint-disable-line

  const priceCurrency = useMemo(() => `R$ ${finalPrice.toFixed(2)}`, [
    finalPrice,
  ]);

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Nav>
            <strong>Cadastro de matrícula</strong>
            <div>
              <Link to="/enrollments/">
                <MdChevronLeft size={24} color="#fff" />
                Voltar
              </Link>
              <button type="submit">
                <MdCheck size={24} color="#fff" />
                Salvar
              </button>
            </div>
          </Nav>
          <Box>
            <p>ALUNO</p>
            <Select
              name="student_id"
              placeholder="Selecione um aluno"
              options={students}
            />
            <Inputs>
              <div>
                <p>PLANO</p>
                <Select
                  selected={selectedPlanId}
                  onChange={p => setSelectedPlanId(p.target.value)}
                  name="plan_id"
                  options={plans}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <p>DATA DO INÍCIO</p>
                <DatePicker
                  selected={start_date}
                  onChange={date => setStartDate(date)}
                  locale={pt}
                  dateFormat="P"
                />
              </div>
              <div>
                <p>DATA DO TÉRMINO</p>
                <DatePicker
                  name="end_date"
                  selected={endDate}
                  locale={pt}
                  dateFormat="P"
                  disabled
                />
              </div>
              <div>
                <p>VALOR FINAL</p>
                <input name="price" value={priceCurrency} disabled />
              </div>
            </Inputs>
          </Box>
        </Form>
      </Content>
    </Container>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMonths, parseISO, startOfDay } from 'date-fns';
import * as Yup from 'yup';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { Form, Select } from '@rocketseat/unform';

import {
  Container,
  Content,
  Nav,
  Box,
  InputsBelow,
} from './styles';


import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { updateEnrollmentRequest } from '../../../store/modules/enrollment/actions';

import { loadAllPlansRequest } from '../../../store/modules/plan/actions';
import { loadAllStudentsRequest } from '../../../store/modules/student/actions';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Aluno é obrigatório')
    .required(),
  plan_id: Yup.number()
    .typeError('Plano é obrigatório')
    .required(),
  start_date: Yup.date().min(startOfDay(new Date()), 'Data muito antiga'),
});

export default function Edit({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const [start_date, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [choosenPlan, setChoosenPlan] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);

  const plans = useSelector(state => state.plan.allPlans);
  const students = useSelector(state => {
    const titledStudents = state.student.allStudents.map(std => {
      const newTitled = {
        id: std.id,
        title: std.name,
      };
      return newTitled;
    });
    return titledStudents;
  });

  const oneEnrollment = useSelector(state => {
    return state.enrollment.allEnrollments.find(item => {
      return item.id.toString() === id;
    });
  }) || { student_id: '1', plan_id: '1', start_date: '25/01/2020' };

  useEffect(() => {
    dispatch(loadAllPlansRequest());
    dispatch(loadAllStudentsRequest());
  }, []);  // eslint-disable-line

  useEffect(() => {
    let currentPlan = {};
    if (selectedPlanId) {
      currentPlan = plans.find(item => item.id.toString() === selectedPlanId);
    } else {
      currentPlan = plans.find(item => item.id === oneEnrollment.plan_id);
    }
    setChoosenPlan(currentPlan);
  }, [selectedPlanId]);// eslint-disable-line

  useEffect(() => {
    setStartDate(parseISO(oneEnrollment.start_date));
    setEndDate(parseISO(oneEnrollment.end_date));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (choosenPlan) {
      setEndDate(addMonths(start_date, choosenPlan.duration));
    }
  }, [choosenPlan, start_date]); // eslint-disable-line

  useEffect(() => {
    if (choosenPlan) {
      setFinalPrice(choosenPlan.duration * choosenPlan.price);
    }
  }, [choosenPlan]); // eslint-disable-line

  function handleEdit({ student_id, plan_id }) {
    dispatch(updateEnrollmentRequest(student_id, plan_id, start_date, id));
  }

  const priceCurrency = useMemo(() => `R$ ${finalPrice.toFixed(2)}`, [
    finalPrice,
  ]);

  return (
    <Container>
      <Content>
        <Form
          initialData={oneEnrollment}
          schema={schema}
          onSubmit={handleEdit}
        >
          <Nav>
            <strong>Edição de Matrícula</strong>
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
            <p>Aluno</p>
            <Select name="student_id" options={students} />
            <InputsBelow>
              <div>
                <p>Plano</p>
                <Select
                  selected={selectedPlanId}
                  onChange={p => setSelectedPlanId(p.target.value)}
                  name="plan_id"
                  options={plans}
                />
              </div>
              <div>
                <p>Data de Início</p>
                <DatePicker
                  name="start_date"
                  selected={start_date}
                  onChange={date => setStartDate(date)}
                  locale={pt}
                  dateFormat="P"
                />
              </div>
              <div>
                <p>Data de Término</p>
                <DatePicker
                  name="enddate"
                  selected={endDate}
                  locale={pt}
                  dateFormat="P"
                  disabled
                />
              </div>
              <div>
                <p>Valor Final</p>
                <input name="price" value={priceCurrency} disabled />
              </div>
            </InputsBelow>
          </Box>
        </Form>
      </Content>
    </Container>
  );  
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

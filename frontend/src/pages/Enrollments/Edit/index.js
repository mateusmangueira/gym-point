import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMonths, parseISO, startOfDay } from 'date-fns';
import * as Yup from 'yup';

import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { Container, Content, NewForm, DivForm } from './styles';

import SelectInput from '~/components/SelectInput';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Select from '~/components/Select';

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
    const titledStudents = state.student.allStudents.map(s => {
      const newTitled = {
        id: s.id,
        title: s.name,
      };
      return newTitled;
    });
    return titledStudents;
  });

  const oneEnrollment = useSelector(state => {
    return state.enrollment.allEnrollments.find(item => {
      return item.id.toString() === id;
    });
  }) || { student_id: '1', plan_id: '1', start_date: '10/10/2020' };

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

  function handleSubmit({ student_id, plan_id }) {
    dispatch(updateEnrollmentRequest(student_id, plan_id, start_date, id));
  }

  const priceCurrency = useMemo(() => `R$ ${finalPrice.toFixed(2)}`, [
    finalPrice,
  ]);

  return (
    <Container>
      <Content>
        <header>
          <h1>Edição de matrícula</h1>

          <div>
            <ButtonBack type="button" />
            <ButtonSave type="submit" form="enrollment-form" />
          </div>
        </header>

        <NewForm
          id="enrollment-form"
          initialData={oneEnrollment}
          onSubmit={handleSubmit}
          schema={schema}
        >
          <span>ALUNO</span>
          <SelectInput
            name="student_id"
            options={students}
            placeholder="Buscar aluno"
          />
          <DivForm>
            <div>
              <span>PLANO</span>
              <Select
                selected={selectedPlanId}
                name="plan_id"
                options={plans}
                onChange={p => setSelectedPlanId(p.target.value)}
              />
            </div>
            <div>
              <span>DATA DE INÍCIO</span>
              <DatePicker
                name="start_date"
                selected={start_date}
                onChange={date => setStartDate(date)}
                locale={pt}
                dateFormat="P"
              />
            </div>
            <div>
              <span>DATA DE TÉRMINO</span>
              <DatePicker
                name="enddate"
                selected={endDate}
                locale={pt}
                dateFormat="P"
                disabled
              />
            </div>
            <div>
              <span>VALOR FINAL</span>
              <input name="price" value={priceCurrency} disabled />
            </div>
          </DivForm>
        </NewForm>
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

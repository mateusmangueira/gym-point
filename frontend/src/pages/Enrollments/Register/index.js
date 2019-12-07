import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addMonths } from 'date-fns';
import * as Yup from 'yup';

import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { Container, Content, NewForm, DivForm } from './styles';

import SelectInput from '~/components/SelectInput';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Input from '~/components/Input';
import Select from '~/components/Select';

import { createEnrollmentRequest } from '../../../store/modules/enrollment/actions';
import { loadAllPlansRequest } from '../../../store/modules/plan/actions';
import { loadAllStudentsRequest } from '../../../store/modules/student/actions';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Aluno é obrigatório')
    .required(),
  plan_id: Yup.number()
    .typeError('Plano é obrigatório')
    .required(),
});

export default function Register() {
  const dispatch = useDispatch();
  const [start_date, setStartDate] = useState(new Date());
  const plans = useSelector(state => state.plan.allPlans);
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [choosenPlan, setChoosenPlan] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);

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

  // Atualiza campo de data de término
  useEffect(() => {
    // Se existe um plano carregado no selector
    if (selectedPlanId) {
      setEndDate(addMonths(start_date, choosenPlan.duration));
    }
  }, [choosenPlan, start_date]); // eslint-disable-line

  // Atualiza valor final
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
        <header>
          <h1>Cadastro de matrícula</h1>

          <div>
            <ButtonBack type="button" />
            <ButtonSave type="submit" form="enrollment-form" />
          </div>
        </header>

        <NewForm id="enrollment-form" onSubmit={handleSubmit} schema={schema}>
          <span>ALUNO</span>
          <SelectInput
            name="student_id"
            options={students}
            placeholder="Selecione um aluno"
          />
          <DivForm>
            <div>
              <span>PLANO</span>
              <Select
                selected={selectedPlanId}
                onChange={p => setSelectedPlanId(p.target.value)}
                name="plan_id"
                options={plans}
                placeholder="Selecione um plano"
              />
            </div>
            <div>
              <span>DATA DE INÍCIO</span>
              <DatePicker
                selected={start_date}
                onChange={date => setStartDate(date)}
                locale={pt}
                dateFormat="P"
              />
            </div>
            <div>
              <span>DATA DE TÉRMINO</span>
              <DatePicker
                name="endDate"
                selected={endDate}
                locale={pt}
                dateFormat="P"
                disabled
              />
            </div>
            <div>
              <span>VALOR FINAL</span>
              <Input name="finalPrice" value={priceCurrency} disabled />
            </div>
          </DivForm>
        </NewForm>
      </Content>
    </Container>
  );
}

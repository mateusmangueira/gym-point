import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addMonths, format, parseISO, startOfDay } from 'date-fns';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';

import { Container, Content, NewForm, DivForm } from './styles';

import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Input from '~/components/Input';
import Select from '~/components/Select';
import SelectInput from '~/components/SelectInput';

import { createEnrollmentRequest } from '../../../store/modules/enrollment/actions';
import { loadAllPlansRequest } from '~/store/modules/plan/actions';
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

export default function Register() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plan.allPlans);
  const students = useSelector(state => state.student.allStudents);

  const [startDate, setStartDate] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(loadAllPlansRequest(), loadAllStudentsRequest());
  }, []); // eslint-disable-line

  async function loadOptions(inputValue) {
    return students.filter(student =>
      student.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function handleSubmit({ student_id, plan_id }) {
    dispatch(createEnrollmentRequest(student_id, plan_id, startDate));
  }

  const end_date = useMemo(() => {
    if (!startDate || !selectedPlan) {
      return null;
    }

    return format(
      addMonths(startDate, selectedPlan.duration),
      "dd'/'MM'/'yyyy"
    );
  }, [selectedPlan, startDate]);

  const finalPrice = useMemo(() => {
    if (!selectedPlan) {
      return null;
    }

    return formatPrice(selectedPlan.price * selectedPlan.duration);
  }, [selectedPlan]);

  const initialData = useMemo(() => {
    return {
      start_date: format(new Date(), "yyyy'-'MM'-'dd"),
      end_date,
      finalPrice,
    };
  }, [end_date, finalPrice]);

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

        <NewForm
          id="enrollment-form"
          initialData={initialData}
          onSubmit={handleSubmit}
          schema={schema}
        >
          <span>ALUNO</span>
          <SelectInput
            name="student_id"
            loadOptions={loadOptions}
            defaultOptions={students}
            placeholder="Selecione o aluno"
          />
          <DivForm>
            <div>
              <span>PLANO</span>
              <Select
                name="plan_id"
                options={plans}
                onChange={e =>
                  setSelectedPlan(
                    plans.find(p => p.id === Number(e.target.value))
                  )
                }
                placeholder="Selecione o plano"
              />
            </div>
            <div>
              <span>DATA DE INÍCIO</span>
              <Input
                name="start_date"
                type="date"
                placeholder="Escolha a data"
                onChange={e => setStartDate(parseISO(e.target.value))}
              />
            </div>
            <div>
              <span>DATA DE TÉRMINO</span>
              <Input name="end_date" disabled />
            </div>
            <div>
              <span>VALOR FINAL</span>
              <Input name="finalPrice" disabled />
            </div>
          </DivForm>
        </NewForm>
      </Content>
    </Container>
  );
}

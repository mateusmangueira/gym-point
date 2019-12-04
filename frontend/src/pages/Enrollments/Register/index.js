import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { addMonths, format, parseISO, startOfDay } from 'date-fns';
import * as Yup from 'yup';
import { Container, Content, NewForm, DivForm } from './styles';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';

import SelectInput from '~/components/SelectInput';
import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Input from '~/components/Input';
import Select from '~/components/Select';

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
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    async function handleStudents() {
      const [studentsForm, plansForm] = await Promise.all([
        await api.get('students'),
        await api.get('plans'),
      ]);

      setStudents(
        studentsForm.data.map(student => ({
          value: student.id,
          label: student.name,
        }))
      );

      setPlans(plansForm.data);
    }

    handleStudents();
  }, []);

  async function loadOptions(inputValue) {
    return students.filter(student =>
      student.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.post('enrolls', {
        student_id,
        plan_id,
        start_date,
      });

      toast.success('Matrícula realizada com sucesso!');
      history.push('/');
    } catch (err) {
      toast.error('Aluno já possui uma matrícula!');
    }
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
            placeholder="Buscar aluno"
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

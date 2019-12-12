import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import HelpOrders from '~/pages/HelpOrders';

import Enrollments from '~/pages/Enrollments';
import EnrollmentsRegister from '~/pages/Enrollments/Register';
import EnrollmentsEdit from '~/pages/Enrollments/Edit';

import Plans from '~/pages/Plans';
import PlansEdit from '~/pages/Plans/Edit';
import PlansRegister from '~/pages/Plans/Register';

import Students from '~/pages/Students';
import StudentsRegister from '~/pages/Students/Register';
import StudentsEdit from '~/pages/Students/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={StudentsRegister} isPrivate />
      <Route path="/students/edit/:id" component={StudentsEdit} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/edit/:id" component={PlansEdit} isPrivate />
      <Route path="/plans/register" component={PlansRegister} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/register"
        component={EnrollmentsRegister}
        isPrivate
      />
      <Route
        path="/enrollments/edit/:id"
        component={EnrollmentsEdit}
        isPrivate
      />

      <Route path="/helpOrders" component={HelpOrders} isPrivate />
    </Switch>
  );
}

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import { object, ref, string } from 'yup';
import PropTypes from 'prop-types';

import AuthService from 'api/AuthService';
import Form from 'components/Form';
import Loading from 'components/Loading';
import { handleErrors } from 'helpers/errors';

import styles from './ForgotPassword.module.scss';

const PasswordForm = ({ token }) => {
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const validationSchema = object().shape({
    password: string().required(intl.messages['common.required']),
    confirmPassword: string().oneOf(
      [ref('password'), null],
      intl.messages['common.passwordsDontMatch']
    ),
  });

  const formMethods = useForm({
    validationSchema,
  });

  const onSubmit = async ({ password, confirmPassword }) => {
    setIsResponseSuccess(false);
    setLoading(true);

    try {
      await AuthService.resetPassword(password, token);
      setIsResponseSuccess(true);
    } catch (errors) {
      handleErrors(errors, formMethods.setError);
    }

    setLoading(false);
  };

  return (
    <Form
      data-testid="forgot-password-password-form"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      <p className={styles.resetPasswordLegend}>
        <FormattedMessage id="common.forgotPasswordChange" />
      </p>
      <Form.Input
        className={styles.formInput}
        name="password"
        type="password"
      />
      <Form.Input
        className={styles.formInput}
        name="confirmPassword"
        type="password"
      />
      <Form.Button text={intl.messages['common.next']} />
      {loading && <Loading />}
      {isResponseSuccess && (
        <p className={styles.success}>
          <FormattedMessage id="common.resetPasswordSuccess" />
        </p>
      )}
    </Form>
  );
};

PasswordForm.propTypes = {
  token: PropTypes.number.isRequired,
};

export default PasswordForm;

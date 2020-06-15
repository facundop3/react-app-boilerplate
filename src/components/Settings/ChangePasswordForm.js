import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useIntl, FormattedMessage } from 'react-intl';

import AuthService from 'api/AuthService';
import Form from 'components/Form';
import { handleErrors } from 'helpers/errors';

import { FormBody, FormButton, SuccessText } from './Settings.styles';

const ChangePasswordForm = () => {
  const intl = useIntl();
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);

  const validationSchema = object().shape({
    password: string().required(intl.messages['common.required']),
  });

  const formMethods = useForm({ validationSchema });

  const onSubmit = async ({ password }) => {
    try {
      await AuthService.updatePassword(password);
      setIsResponseSuccess(true);
    } catch (error) {
      handleErrors(error, formMethods.setError);
    }
  };

  return (
    <FormBody formMethods={formMethods} onSubmit={onSubmit}>
      <Form.Input
        label={intl.messages['common.newPassword']}
        name="password"
        type="password"
        data-testid="password-input-settings"
      />
      <FormButton
        data-testid="submit-password-button"
        text={intl.messages['common.updatePassword']}
      />
      {isResponseSuccess && (
        <SuccessText>
          <FormattedMessage id="common.changePasswordSuccess" />
        </SuccessText>
      )}
    </FormBody>
  );
};

export default ChangePasswordForm;

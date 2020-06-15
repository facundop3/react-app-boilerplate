import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useIntl, FormattedMessage } from 'react-intl';

import Form from 'components/Form';
import { handleErrors } from 'helpers/errors';
import { useUser } from 'hooks/auth';
import { updateUser } from 'actions/auth';

import { FormBody, FormButton, SuccessText } from './Settings.styles';

const SettingsForm = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const user = useUser();
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    locale: user.locale,
  };

  const validationSchema = object().shape({
    firstName: string().required(intl.messages['common.required']),
    lastName: string().required(intl.messages['common.required']),
    locale: string().nullable().required(intl.messages['common.required']),
  });

  const formMethods = useForm({ defaultValues, validationSchema });

  const onSubmit = async (attributes) => {
    try {
      await dispatch(updateUser(attributes));
      setIsResponseSuccess(true);
    } catch (error) {
      handleErrors(error, formMethods.setError);
    }
  };

  return (
    <FormBody formMethods={formMethods} onSubmit={onSubmit}>
      <Form.Input name="firstName" data-testid="firstName-input" />
      <Form.Input name="lastName" data-testid="lastName-input" />
      <Form.Select
        name="locale"
        options={[
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Español' },
        ]}
        data-testid="locale-input"
      />
      <FormButton
        data-testid="submit-settings-button"
        text={intl.messages['common.updateSettings']}
      />
      {isResponseSuccess && (
        <SuccessText>
          <FormattedMessage id="common.updateSettingsSuccess" />
        </SuccessText>
      )}
    </FormBody>
  );
};

export default SettingsForm;

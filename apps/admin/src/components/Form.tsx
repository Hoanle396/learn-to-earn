"use client";
import type * as React from 'react';
import { FormProvider, type UseFormReturn, type SubmitHandler, FieldValues } from 'react-hook-form';

interface Props<TFormValue extends FieldValues> {
  methods: UseFormReturn<TFormValue, unknown>;
  onSubmit: SubmitHandler<TFormValue>;
  children?: React.ReactNode;
}

const FormWrapper = <TFormValue extends FieldValues,>({ methods, onSubmit, children }: Props<TFormValue>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods?.handleSubmit ? methods.handleSubmit(onSubmit) : (e) => e.preventDefault()}>{children}</form>
    </FormProvider>
  );
};

export default FormWrapper;

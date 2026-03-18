// hooks/ui/useFormData.ts
import { useState, useCallback, type FormEvent } from "react";

interface UseFormDataOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormDataReturn<T> {
  values: T;
  handleChange: (key: keyof T, value: any) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  setValues: (values: T) => void;
}

export const useFormData = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
}: UseFormDataOptions<T>): UseFormDataReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((key: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(values);
    },
    [values, onSubmit],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
};

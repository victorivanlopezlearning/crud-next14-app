import { useState } from 'react';

export const useForm = (initForm = {}) => {
  const [formData, setFormData] = useState(initForm);

  const onInputChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  const onResetForm = () => {
    setFormData(initForm);
  }

  const onUpdateDataForm = (newData) => {
    setFormData(newData);
  }

  return {
    ...formData,
    formData,
    onInputChange,
    onResetForm,
    onUpdateDataForm,
  }
}
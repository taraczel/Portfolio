/* Dependencies */
// Libraries
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormErrorMsg from './FormErrorMsg';

// hookForm, refs: FormLogic 참조
const FormLayout = ({ hookForm, refs }) => {
  const {
    clearForm,
    handleSubmit,
    registerInput,
    errorMsgGenerator,
    setValue
  } = hookForm;
  const { onSuccess, onErrors } = refs;
  // state modalState의 값
  const modalState = useSelector(state => state.modalState);

  useEffect(() => {
    // submit시 폼 초기화
    clearForm();
    // 모달창이 닫힐 때 폼 값들 초기화
    if (modalState === false) {
      setValue('name', '');
      setValue('email', '');
      setValue('contents', '');
    }
  }, [clearForm, modalState, setValue]);

  return (
    <div className="form-layout">
      <form onSubmit={handleSubmit(onSuccess, onErrors)}>
        <div>
          <input type="text" placeholder="Name" {...registerInput('name')} />
          <FormErrorMsg type="name" errorMsg={errorMsgGenerator} />
          <input type="text" placeholder="Email" {...registerInput('email')} />
          <FormErrorMsg type="email" errorMsg={errorMsgGenerator} />
        </div>
        <textarea placeholder="Contents" {...registerInput('contents')} />
        <FormErrorMsg type="contents" errorMsg={errorMsgGenerator} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default FormLayout;
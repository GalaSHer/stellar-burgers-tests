import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { namePattern } from '../../utils/constants';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [repeatPasswordError, setIsRepeatPasswordError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    if (!namePattern.test(e.target.value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setIsRepeatPasswordError(false);
  };

  const handleRepeatPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setIsRepeatPasswordError(false);
    setRepeatPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setIsRepeatPasswordError(true);
      return;
    }
    setIsRepeatPasswordError(false);

    setMode('complete');
  };

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid='form'
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          className='text input__textfield text_type_main-default'
          data-testid='name-input'
          name='name'
          onChange={handleNameChange}
          required
          type='text'
          value={name}
          placeholder='Имя'
          error={nameError}
          errorText={'Некорректный формат имени'}
        />
        <EmailInput
          className='text input__textfield text_type_main-default'
          data-testid='email-input'
          disabled={false}
          name='email'
          onChange={handleEmailChange}
          required
          value={email}
        />
        <PasswordInput
          className='text input__textfield text_type_main-default'
          data-testid='password-input'
          disabled={false}
          name='password'
          onChange={handlePasswordChange}
          required
          icon='ShowIcon'
          value={password}
        />
        <PasswordInput
          className='text input__textfield text_type_main-default'
          data-testid='repeat-password-input'
          disabled={false}
          name='repeatPassword'
          onChange={handleRepeatPasswordChange}
          required
          icon='ShowIcon'
          value={repeatPassword}
        />
        {repeatPasswordError && (
          <p className='text input__error text_type_main-default mt-2 mb-2'>
            Пароли не совпадают
          </p>
        )}
        <Button
          className='button button_type_primary button_size_medium'
          htmlType='submit'
          type='primary'
          disabled={!formRef.current?.checkValidity()}
        >
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};

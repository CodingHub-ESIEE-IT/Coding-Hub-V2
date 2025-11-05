'use client';
import React, { useActionState } from 'react';
import './LoginForm.css';
import { ActionResponse } from '@/types/action';

interface LoginFormProps {
  loginAction: (
    prevState: ActionResponse | null,
    formData: FormData,
  ) => Promise<ActionResponse>;
}

const initialState: ActionResponse = {
  success: false,
  message: '',
};

const LoginForm: React.FC<LoginFormProps> = ({ loginAction }) => {
  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form className="login-form" action={action}>
      {state && !state.success && state.message.length > 1 && (
        <div className="error-message">{state.message}</div>
      )}
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Email *
        </label>
        <input className="form-input" type="text" name="email" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Mot de passe *
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          required
        />
      </div>
      <div className="create-topic-button-container">
        <button type="submit" className="login-submit-button">
          {isPending ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

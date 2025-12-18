'use client';

import React, { useActionState } from 'react';
import Button from '@/components/ui/Button/Button';
import { InputField } from '@/app/(app)/profil/edit/page';
import { User } from '@/types/user';
import { ActionResponse } from '@/types/action';
import { FaCheck } from 'react-icons/fa6';

import { toast, ToastContainer } from 'react-toastify';

type EditProfileFormProps = {
  inputs: InputField[];
  user: User;
  userEditAction: (
    prevState: ActionResponse | null,
    formData: FormData,
  ) => Promise<ActionResponse>;
};

const initialState: ActionResponse = {
  success: false,
  message: '',
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  inputs,
  user,
  userEditAction,
}) => {
  const [state, action, pending] = useActionState(userEditAction, initialState);
  const [userData, setUserData] = React.useState(user);

  const hasChanges = React.useMemo(() => {
    return inputs.some((input) => {
      const originalValue = user[input.id] ?? '';
      const currentValue = userData[input.id] ?? '';
      return originalValue !== currentValue;
    });
  }, [userData, user, inputs]);

  React.useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message, {
          className: 'chb-toast-container',
          hideProgressBar: true,
        });
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <>
      <form className="edit-profile-form" action={action}>
        <input type="hidden" name="id" value={user.id} />
        {inputs.map((input) => (
          <div className="form-group" key={input.id}>
            <div>
              <label className={'edit-form-label'} htmlFor={input.id}>
                {input.label}
              </label>
              <small className={'edit-form-small'}>{input.small}</small>
            </div>
            {input.textarea ? (
              <textarea
                id={input.id}
                name={input.id}
                defaultValue={userData[input.id] ?? ''}
                onChange={(e) =>
                  setUserData({ ...userData, [input.id]: e.target.value })
                }
                placeholder={input.placeholder}
                className={'edit-profile-input'}
                rows={8}
              />
            ) : (
              <input
                type={input.id === 'email' ? 'email' : 'text'}
                id={input.id}
                name={input.id}
                defaultValue={userData[input.id] ?? ''}
                onChange={(e) =>
                  setUserData({ ...userData, [input.id]: e.target.value })
                }
                placeholder={input.placeholder}
                className={'edit-profile-input'}
              />
            )}
          </div>
        ))}
        <div className={'form-footer'}>
          <Button
            type={'submit'}
            padding={'0.8rem 2rem'}
            disabled={pending || !hasChanges}
          >
            {pending ? (
              <span className="spinner" />
            ) : (
              'Enregistrer les modifications'
            )}
          </Button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        theme="dark"
        icon={<FaCheck size={'30px'} />}
      />
    </>
  );
};

export default EditProfileForm;

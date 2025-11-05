import React from 'react';
import './login.css';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import logo from '../../../../public/images/logo.png';
import screen from '../../../../public/images/login-screen.png';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ActionResponse } from '@/types/action';

const translateError = (englishMessage: string): string => {
  const translations: Record<string, string> = {
    'Invalid user credentials': 'Email ou mot de passe incorrect',
    'User not found': 'Utilisateur non trouvé',
    'The password field must have at least 8 characters':
      'Le mot de passe doit contenir au moins 8 caractères',
    'Email is required': "L'email est requis",
    'The email field must be a valid email address':
      "L'email doit être une adresse email valide",
  };

  return translations[englishMessage] || englishMessage;
};

const Page = () => {
  const loginAction = async (
      prevState: ActionResponse | null,
      formData: FormData): Promise<ActionResponse> => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(`${process.env.ADONIS_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
            data.errors &&
            Array.isArray(data.errors) &&
            data.errors.length > 0
        ) {
          const errorMessage = data.errors[0].message;

          return {
            success: false,
            message: translateError(errorMessage),
            errors: {},
          };
        }

        return {
          success: false,
          message: data.message || 'Erreur de connexion au serveur',
          errors: {},
        };
      }

      if (!data.token) {
        return {
          success: false,
          message: "Jeton d'accès manquant dans la réponse",
          errors: {},
        };
      }

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: 60 * 60 * 24 * 7,
      };

      (await cookies()).set('access_token', data.token, cookieOptions);

      redirect('/');

      return {
        success: true,
        message: 'Connexion réussie',
        errors: {},
      };
    } catch (error) {

      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error;
      }

      console.error('💥 Erreur réseau:', error);
      return {
        success: false,
        message: 'Erreur réseau. Veuillez réessayer plus tard.',
        errors: {},
      };
    }
  };

  return (
    <div className="login-container">
      <div className="side left">
        <div>
          <div className="login-details">
            <Image src={logo} alt={'Coding Hub'} className="custom-logo" />
            <h1>Bonjour!</h1>
            <p>Veuillez entrer vos identifiants de connexion.</p>
          </div>
          <LoginForm loginAction={loginAction} />
        </div>
      </div>
      <div className="side right">
        <div>
          <p className="login-title">Coding Hub x Coding Factory</p>
          <p className="login-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            aspernatur atque consectetur delectus dolor incidunt inventore ipsum
            molestias nesciunt, nisi odio praesentium quas quod rem, saepe
            soluta temporibus tenetur ut.
          </p>
        </div>
        <Image src={screen} alt={'Coding Hub'} className="login-screen-topic" />
      </div>
    </div>
  );
};

export default Page;

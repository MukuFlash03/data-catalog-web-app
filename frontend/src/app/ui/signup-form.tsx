'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { validateUserForm, validateUserForm2 } from '../lib/validation/users';
import { State } from '../lib/validation/users';

export default function SignupForm() {
  const initialState: State = {
    errors: {},
    message: '',
  };

  const [state, dispatch] = useFormState(validateUserForm2, initialState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state.redirectUrl) {
      setShowSuccessMessage(true);
      timer = setTimeout(() => {
        if (state.redirectUrl) {
          window.location.href = state.redirectUrl;
        }
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [state.redirectUrl]);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please sign up to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="string"
                  name="email"
                  placeholder="Enter your email address"
                  // required
                  aria-describedby='email-error'
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id='email-error' aria-live='polite' aria-atomic='true'>
              {
                state.errors?.email &&
                state.errors?.email.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))
              }
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                // minLength={6}
                // required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id='password-error' aria-live='polite' aria-atomic='true'>
              {
                state.errors?.password &&
                state.errors?.password.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))
              }
            </div>
          </div>
        </div>

        {showSuccessMessage && (
          <div className="success-message">
            {state.message}
          </div>
        )}

        <SignupButton />
        <div aria-live='polite' aria-atomic='true'>
          {
            state.message ?
              (
                <p className='mt-2 text-sm text-red-500'>
                  {state.message}
                </p>
              ) :
              null
          }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

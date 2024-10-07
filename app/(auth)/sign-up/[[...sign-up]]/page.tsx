"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid w-full flex-grow items-center px-4 sm:justify-center">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="flex flex-col justify-center items-center text-center">
            <Link
              href="/"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Crear cuenta en TradeAnalytics
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400">
            {() => (
              <span>Demasiados intentos fallidos, reinicie el registro.</span>
            )}
          </Clerk.GlobalError>
          <div className="space-y-4">
            <Clerk.Field name="emailAddress" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">
                Correo electronico
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400">
                {() => <span>El correo electronico no es válido.</span>}
              </Clerk.FieldError>
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">
                Contraseña
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400">
                {() => (
                  <span>La contraseña deben tener más de 8 caracteres.</span>
                )}
              </Clerk.FieldError>
            </Clerk.Field>
            <Clerk.Field name="confirmPassword" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">
                Repetir contraseña
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400">
                {() => (
                  <span>La contraseña deben tener más de 8 caracteres.</span>
                )}
              </Clerk.FieldError>
            </Clerk.Field>
          </div>
          <SignUp.Action
            submit
            className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
          >
            Registrarse
          </SignUp.Action>

          <p className="text-center text-sm text-zinc-500">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </SignUp.Step>
        <SignUp.Step
          name="verifications"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="flex flex-col justify-center items-center text-center">
            <Link
              href="/"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Verificar correo electronico
            </h1>
            <p className="text-sm">Se ha enviado un mensaje con el código</p>
            <p className="text-sm">a su correo electronico.</p>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400">
            {() => (
              <span>Demasiados intentos fallidos, reinicie el registro.</span>
            )}
          </Clerk.GlobalError>
          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-black">
                Código del correo electronico
              </Clerk.Label>
              <Clerk.Input
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400">
                {() => <span>El código es incorrecto.</span>}
              </Clerk.FieldError>
            </Clerk.Field>
            <SignUp.Action
              submit
              className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
            >
              Finalizar registro
            </SignUp.Action>
          </SignUp.Strategy>
          <p className="text-center text-sm text-zinc-500">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
}

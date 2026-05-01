"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"
import { HelpCircle } from "lucide-react"
import { login } from "@/api/auth"
import { redirect } from "next/navigation"
import { useStoreActions } from "easy-peasy"
import { setToken } from "@/utils/token"
import axios from "axios"


type Inputs = {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>()
  const loginState = useStoreActions((state: any) => state.auth.login)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const d = await login(data);
      setToken(d.token);
      loginState({...d.user, token: d.token})

      redirect('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error?.response?.data?.errors as Record<string, { msg: string }>;

        Object.entries(errors || {}).forEach(([path, { msg }]) => {

          setError(path as keyof Inputs, {
            type: "server",
            message: msg
          })
        })
      } else {
        throw Error(error instanceof Error ? error.message : 'Login failed')
      }
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-surface p-4 text-on-surface md:p-0">
      <div className="ghost-border ambient-shadow flex h-full w-full max-w-[1240px] flex-col overflow-hidden rounded-[2rem] bg-surface-container-lowest md:flex-row">
        <section className="relative hidden w-full flex-col justify-between overflow-hidden bg-surface-container-low p-12 md:flex md:w-1/2">
          <div className="relative z-10">
            <div className="mb-12 font-headline text-3xl font-black tracking-tight text-primary">
              CognitiveFlow
            </div>
            <h1 className="max-w-md font-headline text-[3.5rem] font-extrabold leading-[1.1] text-on-surface">
              Architect your <span className="text-primary-container">workflow</span> with precision.
            </h1>
          </div>

          <div className="ghost-border ambient-shadow relative z-10 flex w-fit items-center gap-4 rounded-full bg-surface-container-lowest/70 p-6 backdrop-blur-xl">
            <div className="flex -space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                <img
                  alt="Collaborator"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa-TcOXmNPTwA_mCliQLi665pGttz86Ivc_kMFwSnisBrNTcPVpHUKY6IY_EuELOJS66YrzYZeuCWEOqMBH5g_xEL4Fsj4MaLxnDHTR3ZIsk98Y2I8W1r8J4GVEUGM8iWPjYXzBAzQI3YBJQm81O8C093WNEfEa_zSzq1VEi8PaSnXUrmEcP6vegDDqB1_0xngEFX_s1s8sJp13b1yyNcJEM9xdoeAXx1HnvDA5F7_GdW_VWOWrEMgKiDYXiv-12WccdnRjLrTS5a6"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-primary" />
              </div>
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                <img
                  alt="Collaborator"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX0X2rw8kiV4j-HlPVKwWGGv0cZxz28cjmc8dQTiRbf7e7_-rZSnwgv9xWX48u4OMS2w6CvlDGSCOLvO3Gkml7NkCh0C9zx2uYSHiAO7w2NDJWLrZYMxRAun2fnAHco43o4LPk9jrCk-06JoivNqNVElr8xxlE1Mf9eNxbiwnC9S63r4Ja3V2IMcGc-PpJ01wQbwFoEBEZ0SXAE9lh-SVoqw1GIGajy-IHuZkQQx0RkH50hC69FKIsHP1Fvxj6DHWr8WDTpOrH8BQk"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-secondary" />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary-fixed text-xs font-bold text-on-primary-fixed">
                +12
              </div>
            </div>
            <div className="text-sm font-semibold text-on-surface-variant">Active in Workspace</div>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-primary blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-tertiary blur-[100px]" />
          </div>
        </section>

        <section className="flex w-full flex-1 flex-col items-center justify-center bg-surface-container-lowest p-8 md:w-1/2 md:p-24">
          <div className="w-full max-w-sm">
            <div className="mb-8 font-headline text-2xl font-black tracking-tight text-primary md:hidden">
              CognitiveFlow
            </div>
            <div className="mb-10">
              <h2 className="mb-2 text-3xl font-bold text-on-surface">Welcome back</h2>
              <p className="text-sm font-medium text-on-surface-variant">Continue your cognitive journey.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="space-y-2">
                <label className="ml-1 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...register('email', { required: "Email is required" })}
                  className="h-14 w-full rounded-xl border-0 bg-surface-container-lowest px-5 font-medium text-on-surface outline-none ring-1 ring-outline-variant/20 transition-all duration-200 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-primary"
                />
                {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
              </div>

              <div className="space-y-2">
                <div className="ml-1 flex items-center justify-between">
                  <label className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="password">
                    Password
                  </label>
                  <button
                    className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary-container"
                    type="button"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { required: "Password is required" })}
                  className="h-14 w-full rounded-xl border-0 bg-surface-container-lowest px-5 font-medium text-on-surface outline-none ring-1 ring-outline-variant/20 transition-all duration-200 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-primary"
                />
                {errors.password && <span className="text-sm text-red-400">{errors.password.message}</span>}
              </div>

              <button
                className="primary-gradient flex h-14 w-full items-center justify-center gap-2 rounded-xl font-bold text-on-primary shadow-[0_8px_20px_rgba(62,50,211,0.2)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                type="submit"
              >
                Sign In
              </button>
            </form>

          

            <p className="mt-12 text-center text-sm font-medium text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link className="font-bold text-primary hover:underline" href="/signup">
                Create for free
              </Link>
            </p>
          </div>
        </section>
      </div>

      <div className="fixed bottom-8 right-8 hidden md:block">
        <button
          className="ghost-border flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-lowest shadow-[0_12px_32px_rgba(62,50,211,0.12)] transition-colors hover:bg-surface-container-low"
          type="button"
          aria-label="Support"
        >
          <HelpCircle className="h-6 w-6 text-primary" />
        </button>
      </div>
    </main>
  )
}

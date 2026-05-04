"use client"

import Link from "next/link"
import { Eye, Loader2, Lock, Mail, User } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { signup } from "@/api/auth"
import { setToken } from "@/utils/token"
import { useStoreActions } from "easy-peasy"
import { redirect } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

type Inputs = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export default function SignupPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
  const signupState = useStoreActions((state: any) => state.auth.signup)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const user = await signup(data);
      // setToken(d.token); // no return token
      // signupState(user)
      toast.success("Signup successful");
      redirect('/login');
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
    <main className="flex min-h-screen overflow-hidden bg-surface font-body text-on-surface">
      <section className="relative hidden w-7/12 flex-col justify-between overflow-hidden bg-surface-container-low p-16 lg:flex">
        <div className="relative z-10">
          <span className="font-headline text-3xl font-black tracking-tight text-primary">CognitiveFlow</span>
          <div className="mt-32 max-w-xl">
            <h1 className="font-headline text-7xl font-bold leading-[0.9] tracking-tight text-on-surface">
              The Architect <br />
              <span className="text-primary">of Flow.</span>
            </h1>
            <p className="mt-8 max-w-md text-xl font-light leading-relaxed text-on-surface-variant">
              Transform chaotic collaboration into seamless architectural precision. Welcome to the workspace designed for the focused mind.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 h-3/4 w-3/4 overflow-hidden rounded-tl-[120px] bg-surface-container-highest">
          <img
            alt="Minimalist abstract architectural flow"
            className="h-full w-full object-cover opacity-80 mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeAgyewIdGJqITWsDHiW4ZA7hDavGJXwL2N0hBf3TloK92-yN9Q5qWpyIIkGWpHe0LQ_-JR51csAydBkwScBM4JsTB-IY0oM_wRCVkv_xPII3IWsvEy0FcaCCwT8zC2U3Z4V6mYP_JTD4q8uKYQnoqJ0w9dMhbf_w6xtiM_BBSVs0EZjaf94WTNlxmbDO82mLucC20WCwsIRI6VM3Z5-rBm6YVsjMORafHjme6RODOriF3Pn4qooQ3ltMVOh_pYpG5exbjz93OSkmX"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex gap-12">
          <div className="flex flex-col">
            <span className="font-headline text-4xl font-bold text-primary">99.9%</span>
            <span className="mt-1 text-xs uppercase tracking-widest text-on-surface-variant">Uptime Reliability</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-4xl font-bold text-primary">12M+</span>
            <span className="mt-1 text-xs uppercase tracking-widest text-on-surface-variant">Files Managed</span>
          </div>
        </div>
      </section>

      <section className="relative flex w-full items-center justify-center bg-surface-container-lowest p-8 sm:p-12 md:p-24 lg:w-5/12">
        <div className="absolute left-12 top-12 lg:hidden">
          <span className="font-headline text-2xl font-black tracking-tight text-primary">CognitiveFlow</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-12 mt-16 lg:mt-0">
            <h2 className="mb-3 font-headline text-4xl font-bold tracking-tight text-on-surface">
              Create your workspace
            </h2>
            <p className="text-on-surface-variant">To get started, create your account for free now</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="space-y-2">
              <label className="ml-1 block text-sm font-semibold text-on-surface" htmlFor="name">
                Full name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="block w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest py-4 pl-11 pr-4 text-on-surface transition-all placeholder:text-outline/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-fixed"
                />
              </div>
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="ml-1 block text-sm font-semibold text-on-surface" htmlFor="email">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="block w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest py-4 pl-11 pr-4 text-on-surface transition-all placeholder:text-outline/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-fixed"
                />  
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="ml-1 block text-sm font-semibold text-on-surface" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="block w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest py-4 pl-11 pr-12 text-on-surface transition-all placeholder:text-outline/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-fixed"
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-outline transition-colors hover:text-primary" type="button" aria-label="Show password">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <p className="mt-2 px-1 text-[11px] text-on-surface-variant/70">
                Must be at least 8 characters with a mix of letters, numbers &amp; symbols.
              </p>
            </div>

            <div className="space-y-2">
              <label className="ml-1 block text-sm font-semibold text-on-surface" htmlFor="confirm_password">
                Confirm password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", { required: "Confirm password is required" })}
                  className="block w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest py-4 pl-11 pr-4 text-on-surface transition-all placeholder:text-outline/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-fixed"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <button
              className="primary-gradient mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-on-primary shadow-[0_12px_32px_rgba(62,50,211,0.15)] transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:pointer-events-none disabled:opacity-60"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-on-surface-variant">
              Already have an account?{" "}
              <Link className="ml-1 font-bold text-primary underline-offset-4 transition-all hover:underline decoration-2" href="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </section>
    </main>
  )
}

import { AuthRegisterForm } from "../../components/authentication/auth-register-form";
import {Link} from "react-router-dom";

export default function Register() {
  
    return (
      <>
        <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            to="/login"
            className=""
          >
            Login
          </Link>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <span>6iphermail</span>
            </div>
            <div className="relative z-20">
    
            </div>
  
            <div className="flex justify-center z-20 mt-auto">
              <blockquote className="space-y-2">
                <p>
                  &ldquo;The project aims to develop an innovative anti-phishing
                  email system that uses advanced AI and machine learning to
                  detect and prevent phishing attacks. It analyzes incoming
                  emails, identifies phishing attempts, and alerts users in
                  real-time, ensuring secure electronic communications with a
                  user-friendly interface.&rdquo;
                </p>
                <footer className="flex justify-center  text-sm">6iphermail</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <AuthRegisterForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  to="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
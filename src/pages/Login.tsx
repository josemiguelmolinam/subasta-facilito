import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState("");

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("");
      await login(data.email, data.password);
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-auction-soft flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-auction-primary" />
          <p className="text-sm text-auction-dark">Iniciando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-auction-soft flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 transition-transform duration-300 hover:rotate-90"
          onClick={() => navigate('/')}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-auction-dark">
                ¡Bienvenido de nuevo!
              </h1>
              <p className="text-gray-500">
                Inicia sesión para continuar con tus subastas
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Correo electrónico"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}

                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => navigate('/reset-password')}
                    type="button"
                    className="text-sm text-auction-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-auction-primary hover:bg-auction-secondary transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
              <button 
                onClick={() => navigate('/register')}
                className="text-auction-primary hover:underline"
              >
                Regístrate aquí
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268415-3551762.png"
              alt="Login illustration"
              className="w-full max-w-md mx-auto animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
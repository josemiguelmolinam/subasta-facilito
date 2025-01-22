import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Correo enviado",
      description: "Si el correo existe, recibirás instrucciones para restablecer tu contraseña.",
    });
  };

  return (
    <div className="min-h-screen bg-auction-soft flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 transition-transform duration-300 hover:rotate-90"
          onClick={() => navigate('/login')}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-auction-dark">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="text-gray-500">
                Introduce tu correo electrónico y te enviaremos instrucciones para restablecerla
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-auction-primary hover:bg-auction-secondary transition-colors"
              >
                Enviar instrucciones
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              ¿Recordaste tu contraseña?{" "}
              <button 
                onClick={() => navigate('/login')}
                className="text-auction-primary hover:underline"
              >
                Volver al inicio de sesión
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-4268407-3551754.png"
              alt="Reset password illustration"
              className="w-full max-w-md mx-auto animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
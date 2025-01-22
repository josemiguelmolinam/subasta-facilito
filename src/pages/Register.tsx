import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff, X, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-auction-soft to-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-auction-primary" />
          <p className="text-sm text-auction-dark">Creando tu cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-auction-soft to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 transition-transform duration-300 hover:rotate-90"
            onClick={() => navigate('/')}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="mb-8">
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png" 
              alt="Create account illustration" 
              className="w-64 h-64 object-contain mx-auto animate-float"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-auction-dark mb-6">
            Crear una cuenta
          </h2>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-center hover:bg-gray-50 transition-all duration-300 animate-fade-in"
              onClick={() => console.log("Google login")}
              disabled={isLoading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continuar con Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-center hover:bg-gray-50 transition-all duration-300 animate-fade-in"
              onClick={() => console.log("Apple login")}
              disabled={isLoading}
            >
              <FaApple className="mr-2 h-5 w-5" />
              Continuar con Apple
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>
            
            <form className="space-y-4">
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    className="w-full pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-auction-primary transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all duration-300 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </div>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Registrarse con correo
                  </>
                )}
              </Button>
            </form>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              ¿Ya tienes una cuenta?{" "}
              <a 
                href="/login" 
                className="text-auction-primary hover:text-auction-secondary font-medium transition-colors"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
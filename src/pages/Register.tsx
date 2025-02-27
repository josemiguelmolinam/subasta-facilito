
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff, X, Loader2, User, Building2, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecaptchaModal, setShowRecaptchaModal] = useState(false);
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');

  const navigate = useNavigate();
  const { toast } = useToast();
  const { register: authRegister } = useAuth();

  const validateInputs = () => {
    if (!email.includes("@")) {
      setError("Por favor, introduce un email válido.");
      return false;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) return;
    setShowRecaptchaModal(true);
  };

  const handleRecaptchaVerify = async (token: string | null) => {
    if (!token) {
      setError("Debes completar el reCAPTCHA.");
      return;
    }

    setShowRecaptchaModal(false);
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: email.split("@")[0] });

      await authRegister(email, password, email.split("@")[0]);

      toast({
        title: "Registro exitoso",
        description: "Por favor, verifica tu email para continuar.",
      });

      navigate("/verify-email");
    } catch (error: any) {
      console.error("Error al registrar:", error);
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al crear tu cuenta.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuario registrado con Google:", result.user);
      
      if (result.user.email && result.user.displayName) {
        await authRegister(result.user.email, "", result.user.displayName);
      }
      
      navigate("/verify-email");
    } catch (error: any) {
      console.error("Error al registrar con Google:", error);
      setError("No se pudo registrar con Google.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-auction-soft to-white pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 transition-transform duration-300 hover:rotate-90"
          onClick={() => navigate('/')}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="mb-6 text-center space-y-4">
          {/* Icono animado */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-4 rounded-full">
              <UserPlus className="h-12 w-12 text-white animate-bounce" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary bg-clip-text text-transparent">
            Crear una cuenta
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <RadioGroup 
          defaultValue="personal" 
          className="mb-6 grid grid-cols-2 gap-4"
          onValueChange={(value) => setAccountType(value as 'personal' | 'business')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="personal" id="personal" className="text-auction-primary" />
            <Label 
              htmlFor="personal" 
              className="flex flex-col items-center cursor-pointer"
            >
              <User className="h-6 w-6 mb-2" />
              <span>Personal</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" className="text-auction-primary" />
            <Label 
              htmlFor="business" 
              className="flex flex-col items-center cursor-pointer"
            >
              <Building2 className="h-6 w-6 mb-2" />
              <span>Empresa</span>
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-center hover:bg-gray-50 transition-all duration-300 animate-fade-in"
            onClick={handleGoogleRegister}
            disabled={isSubmitting}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Continuar con Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-center hover:bg-gray-50 transition-all duration-300 animate-fade-in"
            onClick={() => alert("Apple Login estará disponible próximamente.")}
            disabled={isSubmitting}
          >
            <FaApple className="mr-2 h-5 w-5" />
            Continuar con Apple
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <Input
              type="email"
              placeholder="Correo electrónico"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-auction-primary transition-colors"
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary hover:opacity-90 text-white transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <button 
            onClick={() => navigate('/login')} 
            className="text-auction-primary hover:text-auction-secondary font-medium transition-colors"
          >
            Inicia sesión
          </button>
        </p>

        {showRecaptchaModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-center">Verificación de seguridad</h3>
              <ReCAPTCHA 
                sitekey="6Lf5VscqAAAAAKB3SfloHT_3RyBWbTkQ_EOS7vDy"
                onChange={handleRecaptchaVerify}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

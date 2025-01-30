import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff, X, Loader2, User, Building2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

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

        <div className="mb-6 flex justify-center">
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png" 
            alt="Crear cuenta" 
            className="w-40 sm:w-64 h-auto object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-auction-dark mb-6">
          Crear una cuenta
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-6 flex justify-center gap-4">
          <Button
            variant={accountType === "personal" ? "default" : "outline"}
            onClick={() => setAccountType("personal")}
            className="flex-col gap-2 h-auto py-3 px-6"
          >
            <User className="h-6 w-6" />
            <span>Personal</span>
          </Button>
          <Button
            variant={accountType === "business" ? "default" : "outline"}
            onClick={() => setAccountType("business")}
            className="flex-col gap-2 h-auto py-3 px-6"
          >
            <Building2 className="h-6 w-6" />
            <span>Empresa</span>
          </Button>
        </div>

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
          className="w-full justify-center hover:bg-gray-50 transition-all duration-300 animate-fade-in mt-2"
          onClick={() => alert("Apple Login estará disponible próximamente.")}
          disabled={isSubmitting}
        >
          <FaApple className="mr-2 h-5 w-5" />
          Continuar con Apple
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full pr-10"
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
            className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear cuenta"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <button 
            onClick={() => navigate('/login')} 
            className="text-auction-primary hover:text-auction-secondary font-medium transition-colors"
          >
            Inicia sesión
          </button>
        </p>
      </div>

      {showRecaptchaModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Verificación de seguridad</h2>
            <ReCAPTCHA 
              sitekey="6Lf5VscqAAAAAKB3SfloHT_3RyBWbTkQ_EOS7vDy"
              onChange={handleRecaptchaVerify}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

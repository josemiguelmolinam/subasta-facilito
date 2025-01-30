import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff, X, Loader2, User, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { validateEmail, validatePassword } from "@/lib/utils/validation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<'personal' | 'business'>('personal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      newErrors.email = "Por favor, introduce un email válido";
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (!name.trim()) {
      newErrors.name = "Por favor, introduce tu nombre";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register(email, password, name);
      toast({
        title: "¡Registro exitoso!",
        description: "Por favor, verifica tu email para continuar.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error en el registro",
        description: "Ha ocurrido un error al crear tu cuenta.",
      });
    }
  };

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
            <h2 className="text-2xl font-bold text-center text-auction-dark mb-2">
              Crear una cuenta
            </h2>
            <p className="text-center text-gray-500">
              Únete a nuestra comunidad de subastas
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-auction-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tipo de cuenta</Label>
                <RadioGroup
                  defaultValue="personal"
                  onValueChange={(value) => setUserType(value as 'personal' | 'business')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Personal</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>Empresa</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </div>
              ) : (
                "Crear cuenta"
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="text-auction-primary hover:text-auction-secondary font-medium transition-colors"
              >
                Inicia sesión
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
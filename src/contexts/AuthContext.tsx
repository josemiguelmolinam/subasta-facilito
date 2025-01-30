import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  setupTwoFactor: () => Promise<{ qrCode: string; secret: string }>;
  verifyTwoFactor: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({
        ...parsedUser,
        createdAt: new Date(parsedUser.createdAt),
        verificationStatus: parsedUser.verificationStatus || {
          email: false,
          twoFactor: false,
          identity: false,
        }
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Iniciando sesión...", { email });
      
      // Simulamos una llamada a la API
      const mockUser: UserProfile = {
        id: "1",
        email,
        name: email.split('@')[0],
        type: 'personal',
        verificationStatus: {
          email: true,
          twoFactor: false,
          identity: false,
        },
        createdAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      });
      
      navigate('/');
    } catch (error) {
      console.error("Error de login:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al iniciar sesión",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      console.log("Registrando usuario...", { email, name });
      
      // Simulamos una llamada a la API
      const mockUser: UserProfile = {
        id: "1",
        email,
        name,
        type: 'personal',
        verificationStatus: {
          email: false,
          twoFactor: false,
          identity: false,
        },
        createdAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Simular envío de email de verificación
      console.log("Enviando email de verificación a:", email);
      
      toast({
        title: "¡Registro exitoso!",
        description: "Por favor, verifica tu email para continuar",
      });
      
      navigate('/verify-email');
    } catch (error) {
      console.error("Error de registro:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al crear tu cuenta",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('user');
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      navigate('/login');
    } catch (error) {
      console.error("Error de logout:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al cerrar sesión",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("No hay usuario autenticado");
      
      const updatedUser = {
        ...user,
        ...data,
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Perfil actualizado",
        description: "Los cambios han sido guardados correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al actualizar tu perfil",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("No hay usuario autenticado");
      
      // Simulamos verificación de token
      console.log("Verificando token:", token);
      
      const updatedUser = {
        ...user,
        verificationStatus: {
          ...user.verificationStatus,
          email: true,
        },
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Email verificado",
        description: "Tu email ha sido verificado correctamente",
      });
      
      navigate('/profile');
    } catch (error) {
      console.error("Error al verificar email:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "El token de verificación no es válido",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (!user) throw new Error("No hay usuario autenticado");
      
      // Simulamos reenvío de email
      console.log("Reenviando email de verificación a:", user.email);
      
      toast({
        title: "Email enviado",
        description: "Se ha enviado un nuevo email de verificación",
      });
    } catch (error) {
      console.error("Error al reenviar email:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo reenviar el email de verificación",
      });
      throw error;
    }
  };

  const setupTwoFactor = async () => {
    try {
      if (!user) throw new Error("No hay usuario autenticado");
      
      // Simulamos generación de código QR y secreto
      console.log("Generando configuración 2FA para:", user.email);
      
      return {
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example",
        secret: "JBSWY3DPEHPK3PXP",
      };
    } catch (error) {
      console.error("Error al configurar 2FA:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo configurar la autenticación en dos pasos",
      });
      throw error;
    }
  };

  const verifyTwoFactor = async (code: string) => {
    try {
      if (!user) throw new Error("No hay usuario autenticado");
      
      // Simulamos verificación de código
      console.log("Verificando código 2FA:", code);
      
      const updatedUser = {
        ...user,
        verificationStatus: {
          ...user.verificationStatus,
          twoFactor: true,
        },
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "2FA activado",
        description: "La autenticación en dos pasos ha sido activada correctamente",
      });
    } catch (error) {
      console.error("Error al verificar código 2FA:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "El código no es válido",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        register, 
        updateProfile,
        verifyEmail,
        resendVerificationEmail,
        setupTwoFactor,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
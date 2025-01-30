import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Loader2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { user, resendVerificationEmail, isLoading } = useAuth();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.verificationStatus.email) {
      navigate('/profile');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
      setCanResend(false);
      setCountdown(60);
    } catch (error) {
      console.error('Error al reenviar email:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-auction-soft to-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-auction-primary" />
          <p className="text-sm text-auction-dark">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-auction-soft to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-auction-soft rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-auction-primary" />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-auction-dark">
                Verifica tu email
              </h1>
              <p className="text-gray-500">
                Hemos enviado un enlace de verificación a{' '}
                <span className="font-medium text-auction-dark">
                  {user?.email}
                </span>
              </p>
            </div>

            <div className="w-full space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResend}
                disabled={!canResend}
              >
                {canResend ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reenviar email
                  </>
                ) : (
                  `Reenviar en ${countdown}s`
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Volver al inicio de sesión
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
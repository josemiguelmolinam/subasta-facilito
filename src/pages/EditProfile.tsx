import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VerificationProgress from '@/components/verification/VerificationProgress';
import SecuritySettings from '@/components/security/SecuritySettings';
import Map from '@/components/Map';
import {
  User, Mail, Lock, MapPin, Phone, Briefcase, Calendar,
  Eye, EyeOff, Camera, Shield, CreditCard, Bell
} from 'lucide-react';

interface ProfileFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
  occupation: string;
  birthdate: string;
  bio: string;
  location: {
    lat: number;
    lng: number;
  };
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>();
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location, setLocation] = useState({ lat: 40.4168, lng: -3.7038 }); // Madrid by default

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    toast({
      title: 'Perfil actualizado',
      description: 'Tus cambios han sido guardados exitosamente.',
    });
    navigate('/profile');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <div className='container mx-auto px-4 py-8 mt-16'>
        <div className="max-w-6xl mx-auto">
          <h1 className='text-3xl font-bold text-center mb-8'>Editar Perfil</h1>
          
          <Tabs defaultValue='personal' className='space-y-6'>
            <TabsList className='w-full grid grid-cols-1 md:grid-cols-4 gap-2'>
              <TabsTrigger value='personal'>
                <User className="h-4 w-4 mr-2" />
                Información Personal
              </TabsTrigger>
              <TabsTrigger value='security'>
                <Shield className="h-4 w-4 mr-2" />
                Seguridad
              </TabsTrigger>
              <TabsTrigger value='payments'>
                <CreditCard className="h-4 w-4 mr-2" />
                Pagos
              </TabsTrigger>
              <TabsTrigger value='notifications'>
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value='personal'>
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='flex flex-col items-center space-y-4'>
                      <Avatar className='w-32 h-32 cursor-pointer group relative'>
                        <AvatarImage src={avatarPreview || '/placeholder.svg'} />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      </Avatar>
                      <Input
                        id='avatar'
                        type='file'
                        className='hidden'
                        onChange={handleAvatarChange}
                        accept='image/*'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <Label htmlFor='fullName'>Nombre Completo</Label>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                          <Input
                            id='fullName'
                            {...register('fullName', { required: true })}
                            className='pl-10'
                            placeholder='Tu nombre completo'
                          />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Correo Electrónico</Label>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                          <Input
                            id='email'
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            className='pl-10'
                            placeholder='tu@email.com'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <Label>Ubicación</Label>
                      <Map location={location} address="Madrid, España" />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <Label htmlFor='phone'>Teléfono</Label>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                          <Input
                            id='phone'
                            {...register('phone')}
                            className='pl-10'
                            placeholder='Tu número de teléfono'
                          />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='occupation'>Ocupación</Label>
                        <div className='relative'>
                          <Briefcase className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                          <Input
                            id='occupation'
                            {...register('occupation')}
                            className='pl-10'
                            placeholder='Tu ocupación'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='bio'>Biografía</Label>
                      <Textarea
                        id='bio'
                        {...register('bio')}
                        placeholder='Cuéntanos sobre ti...'
                        className='min-h-[100px]'
                      />
                    </div>

                    <div className='flex justify-end space-x-4'>
                      <Button type='button' variant='outline' onClick={() => navigate('/profile')}>
                        Cancelar
                      </Button>
                      <Button type='submit'>
                        Guardar Cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='security'>
              <SecuritySettings />
            </TabsContent>

            <TabsContent value='payments'>
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add payment methods component here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='notifications'>
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add notifications settings component here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
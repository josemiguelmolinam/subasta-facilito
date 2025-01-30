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
import {
  User,
  Mail,
  Lock,
  MapPin,
  Phone,
  Briefcase,
  Calendar,
  Eye,
  EyeOff,
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <MainLayout>
      <div className='container mx-auto px-4 py-8 mt-16'>
        <h1 className='text-3xl font-bold text-center mb-8'>Editar Perfil</h1>
        <Card className='max-w-4xl mx-auto'>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='personal' className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='personal'>Información Personal</TabsTrigger>
                <TabsTrigger value='verification'>Verificación</TabsTrigger>
                <TabsTrigger value='security'>Cuenta y Seguridad</TabsTrigger>
              </TabsList>

              <TabsContent value='personal'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div className='flex flex-col items-center space-y-4'>
                    <Avatar className='w-32 h-32'>
                      <AvatarImage src={avatarPreview || '/placeholder.svg'} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Label
                      htmlFor='avatar'
                      className='cursor-pointer bg-auction-primary text-white px-4 py-2 rounded-md hover:bg-auction-secondary transition-colors'
                    >
                      Cambiar Avatar
                    </Label>
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
                      {errors.fullName && (
                        <span className='text-red-500 text-sm'>
                          Este campo es requerido
                        </span>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='email'>Correo Electrónico</Label>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <Input
                          id='email'
                          {...register('email', {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                          className='pl-10'
                          placeholder='tu@email.com'
                        />
                      </div>
                      {errors.email && (
                        <span className='text-red-500 text-sm'>
                          Correo electrónico inválido
                        </span>
                      )}
                    </div>

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
                      <Label htmlFor='address'>Dirección</Label>
                      <div className='relative'>
                        <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <Input
                          id='address'
                          {...register('address')}
                          className='pl-10'
                          placeholder='Tu dirección'
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

                    <div className='space-y-2'>
                      <Label htmlFor='birthdate'>Fecha de Nacimiento</Label>
                      <div className='relative'>
                        <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <Input
                          id='birthdate'
                          type='date'
                          {...register('birthdate')}
                          className='pl-10'
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
                    />
                  </div>

                  <Button type='submit' className='w-full'>
                    Guardar Cambios
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value='verification'>
                <VerificationProgress />
              </TabsContent>

              <TabsContent value='security'>
                <SecuritySettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditProfile;

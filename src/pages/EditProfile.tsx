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
import { User, Mail, Phone, Briefcase, Camera } from 'lucide-react';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  bio: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

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

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <div className='container mx-auto px-4 py-8 mt-16'>
        <div className="max-w-3xl mx-auto">
          <h1 className='text-3xl font-bold text-center mb-8'>Editar Perfil</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-6'>
                  {/* Cover Photo */}
                  <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                    {coverPreview && (
                      <img
                        src={coverPreview}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="h-8 w-8 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleCoverChange}
                        accept="image/*"
                      />
                    </label>
                  </div>

                  {/* Avatar */}
                  <div className='flex flex-col items-center space-y-4'>
                    <div className="relative">
                      <Avatar className='w-32 h-32 cursor-pointer'>
                        <AvatarImage src={avatarPreview || '/placeholder.svg'} />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                          <Camera className="h-8 w-8 text-white" />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleAvatarChange}
                            accept="image/*"
                          />
                        </label>
                      </Avatar>
                    </div>
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
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
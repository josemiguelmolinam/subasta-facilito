
import React from "react";

interface LoginAlertEmailTemplateProps {
  ip: string;
  userAgent: string;
  location?: string;
  date: Date;
  loginSuccessful: boolean;
}

export const LoginAlertEmailTemplate: React.FC<LoginAlertEmailTemplateProps> = ({
  ip,
  userAgent,
  location = "Ubicación desconocida",
  date,
  loginSuccessful,
}) => {
  // Formatear la fecha en español
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(date);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#333' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="https://via.placeholder.com/150x60?text=LOGO" 
          alt="Logo" 
          style={{ maxWidth: '150px' }} 
        />
      </div>
      
      <div style={{ padding: '30px', border: '1px solid #e9e9e9', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h1 style={{ fontSize: '22px', color: '#333', margin: '0 0 20px' }}>
          {loginSuccessful ? '🔒 Nuevo inicio de sesión detectado' : '⚠️ Intento de inicio de sesión sospechoso'}
        </h1>
        
        <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
          Hola,
        </p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
          {loginSuccessful 
            ? 'Hemos detectado un nuevo inicio de sesión en tu cuenta.' 
            : 'Hemos detectado un intento de inicio de sesión sospechoso en tu cuenta.'}
        </p>
        
        <div style={{ 
          backgroundColor: loginSuccessful ? '#f8f9fa' : '#fff3cd', 
          border: `1px solid ${loginSuccessful ? '#e9e9e9' : '#ffeeba'}`,
          borderRadius: '5px', 
          padding: '15px', 
          marginBottom: '20px' 
        }}>
          <h2 style={{ fontSize: '18px', margin: '0 0 15px' }}>Detalles del inicio de sesión:</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', width: '40%' }}>Fecha y hora:</td>
                <td style={{ padding: '8px 0' }}>{formattedDate}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Dirección IP:</td>
                <td style={{ padding: '8px 0' }}>{ip}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Ubicación aproximada:</td>
                <td style={{ padding: '8px 0' }}>{location}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Dispositivo:</td>
                <td style={{ padding: '8px 0' }}>{userAgent}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', fontWeight: 'bold' }}>
          {loginSuccessful 
            ? '¿Fuiste tú? Si no reconoces esta actividad, te recomendamos:' 
            : '⚠️ Si no intentaste iniciar sesión, es importante que actúes de inmediato:'}
        </p>
        
        <div style={{ marginBottom: '25px' }}>
          <a 
            href="#" 
            style={{ 
              display: 'inline-block',
              backgroundColor: '#e74c3c',
              color: 'white',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            Cambiar contraseña
          </a>
          
          <a 
            href="#" 
            style={{ 
              display: 'inline-block',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            Verificar cuenta
          </a>
        </div>
        
        <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '10px' }}>
          Recomendaciones adicionales de seguridad:
        </p>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', paddingLeft: '20px' }}>
          <li>Activa la autenticación de dos factores</li>
          <li>No compartas tus credenciales con nadie</li>
          <li>Utiliza una contraseña única y segura</li>
          <li>Revisa regularmente la actividad de tu cuenta</li>
        </ul>
        
        <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
          Si necesitas ayuda o tienes alguna pregunta, no dudes en ponerte en contacto con nuestro equipo de soporte.
        </p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '10px' }}>
          Saludos,<br />
          El equipo de seguridad
        </p>
      </div>
      
      <div style={{ margin: '20px 0', fontSize: '12px', color: '#777', textAlign: 'center' }}>
        <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        <p>© 2023 Tu Empresa. Todos los derechos reservados.</p>
        <p>
          <a href="#" style={{ color: '#3498db', marginRight: '10px' }}>Política de privacidad</a>
          <a href="#" style={{ color: '#3498db' }}>Términos de servicio</a>
        </p>
      </div>
    </div>
  );
};

export default LoginAlertEmailTemplate;

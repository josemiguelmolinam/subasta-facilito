
export const getPasswordResetEmailTemplate = (userName: string, resetLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recupera tu contraseña</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt="Recuperar contraseña" style="width: 80px; height: 80px; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Recuperación de contraseña</h1>
      </td>
    </tr>
    <tr>
      <td style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Hola ${userName},</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 24px;">
          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has realizado esta solicitud, puedes ignorar este correo.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" style="background: #6366f1; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);">
            Restablecer contraseña
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px; line-height: 20px;">
          Por razones de seguridad, este enlace expirará en 1 hora. Si necesitas un nuevo enlace, puedes solicitarlo nuevamente en nuestra página de inicio de sesión.
        </p>
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Este es un correo automático, por favor no respondas a este mensaje.
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;


export const getVerificationEmailTemplate = (userName: string, verificationLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifica tu correo electrónico</title>
</head>
<body style="margin: 0; padding: 0; background-color: #E5DEFF; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header con logo y diseño llamativo -->
    <tr>
      <td style="text-align: center; padding: 40px 20px;">
        <img src="https://cdn-icons-png.flaticon.com/512/6357/6357048.png" alt="Logo" style="width: 120px; height: 120px; margin-bottom: 20px; filter: drop-shadow(0 4px 6px rgba(155, 135, 245, 0.4));">
      </td>
    </tr>
    
    <!-- Contenedor principal con gradiente -->
    <tr>
      <td>
        <div style="background: linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%); border-radius: 16px; padding: 3px; box-shadow: 0 10px 25px rgba(155, 135, 245, 0.3);">
          <div style="background: white; border-radius: 14px; padding: 40px 30px;">
            <!-- Saludo y título -->
            <h1 style="color: #1A1F2C; margin: 0 0 24px 0; font-size: 28px; text-align: center; font-weight: 800;">
              ¡Bienvenido a nuestra plataforma, ${userName}!
            </h1>

            <!-- Mensaje principal -->
            <p style="color: #4A5568; font-size: 16px; line-height: 24px; margin-bottom: 32px; text-align: center;">
              Estás a un paso de comenzar tu experiencia en nuestra plataforma. Para garantizar la seguridad de tu cuenta, necesitamos verificar tu dirección de correo electrónico.
            </p>

            <!-- Botón de verificación con efectos -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verificationLink}" style="
                background: linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%);
                color: white;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 12px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                box-shadow: 0 4px 15px rgba(155, 135, 245, 0.4);
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">
                Verificar mi correo
              </a>
            </div>

            <!-- Timeline de pasos -->
            <div style="margin: 40px 0; padding: 30px; background: #F8F7FF; border-radius: 12px;">
              <h3 style="color: #1A1F2C; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
                Próximos pasos
              </h3>
              
              <!-- Paso 1 -->
              <div style="display: flex; align-items: start; margin-bottom: 20px;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background: #9b87f5;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  margin-right: 15px;
                ">1</div>
                <div>
                  <h4 style="color: #1A1F2C; margin: 0; font-size: 16px;">Verifica tu email</h4>
                  <p style="color: #6E59A5; margin: 5px 0 0 0; font-size: 14px;">
                    Haz clic en el botón de verificación
                  </p>
                </div>
              </div>

              <!-- Paso 2 -->
              <div style="display: flex; align-items: start; margin-bottom: 20px;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background: #7E69AB;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  margin-right: 15px;
                ">2</div>
                <div>
                  <h4 style="color: #1A1F2C; margin: 0; font-size: 16px;">Completa tu perfil</h4>
                  <p style="color: #6E59A5; margin: 5px 0 0 0; font-size: 14px;">
                    Personaliza tu información
                  </p>
                </div>
              </div>

              <!-- Paso 3 -->
              <div style="display: flex; align-items: start;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background: #6E59A5;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  margin-right: 15px;
                ">3</div>
                <div>
                  <h4 style="color: #1A1F2C; margin: 0; font-size: 16px;">¡Comienza a explorar!</h4>
                  <p style="color: #6E59A5; margin: 5px 0 0 0; font-size: 14px;">
                    Descubre todas las funcionalidades
                  </p>
                </div>
              </div>
            </div>

            <!-- Nota de seguridad -->
            <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #E5DEFF;">
              <p style="color: #6E59A5; font-size: 14px; margin: 0; text-align: center;">
                Por razones de seguridad, este enlace expirará en 24 horas.
              </p>
              <p style="color: #9b87f5; font-size: 12px; margin-top: 15px; text-align: center;">
                Si no has creado una cuenta, puedes ignorar este correo.
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="text-align: center; padding: 30px 20px;">
        <p style="color: #6E59A5; font-size: 12px; margin: 0;">
          Este es un correo automático, por favor no respondas a este mensaje.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

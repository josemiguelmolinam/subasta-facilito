export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una mayúscula");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una minúscula");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe contener al menos un número");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateAuctionForm = (values: {
  title: string;
  description: string;
  startingPrice: number;
  buyNowPrice?: number;
  endDate: Date;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  if (!values.title.trim()) {
    errors.title = "El título es requerido";
  }
  if (!values.description.trim()) {
    errors.description = "La descripción es requerida";
  }
  if (values.startingPrice <= 0) {
    errors.startingPrice = "El precio inicial debe ser mayor a 0";
  }
  if (values.buyNowPrice && values.buyNowPrice <= values.startingPrice) {
    errors.buyNowPrice = "El precio de compra inmediata debe ser mayor al precio inicial";
  }
  if (new Date(values.endDate) <= new Date()) {
    errors.endDate = "La fecha de finalización debe ser posterior a la actual";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
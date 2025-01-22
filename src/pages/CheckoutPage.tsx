import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular la confirmación del pedido
    setTimeout(() => {
      setIsSubmitting(false);

      // Redirigir a la página de éxito
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Dirección de envío
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">
            Método de pago
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
          >
            <option value="credit-card">Tarjeta de crédito</option>
            <option value="bank-transfer">Transferencia bancaria</option>
            <option value="wallet">Wallet (ej. PayPal)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white font-medium rounded-md ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Procesando..." : "Confirmar Compra"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

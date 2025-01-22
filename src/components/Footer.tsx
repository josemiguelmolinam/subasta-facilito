import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-auction-dark text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-auction-primary">Subastalo</h3>
            <p className="text-gray-400">
              La plataforma líder de subastas online en Latinoamérica. Compra y vende de manera segura.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/categorias" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Categorías
                </a>
              </li>
              <li>
                <a href="/subastas" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Subastas Activas
                </a>
              </li>
              <li>
                <a href="/vender" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Vender
                </a>
              </li>
              <li>
                <a href="/ayuda" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
            </ul>
          </div>

          {/* Información legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/terminos" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-400 hover:text-auction-primary transition-colors">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir las últimas novedades
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-auction-primary"
              />
              <Button className="bg-auction-primary hover:bg-auction-secondary">
                Suscribir
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com" className="text-gray-400 hover:text-auction-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-auction-primary transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-auction-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Subastalo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
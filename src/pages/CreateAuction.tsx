<lov-code>
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuction } from "@/contexts/AuctionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  Upload,
  MapPin,
  Box,
  DollarSign,
  Truck,
  Edit3,
  Award,
  ShoppingCart,
  ClipboardList,
  Archive,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SaleOptions } from "@/types";

// Importa los SVG de las agencias de transporte como imágenes
import correosIcon from '@/assets/correos.svg';
import seurIcon from '@/assets/seur.svg';
import mrwIcon from '@/assets/mrw.svg';
import dhlIcon from '@/assets/dhl.svg';

interface CloudUploadIconProps {
  className?: string;
}

const CloudUploadIcon = ({ className = "h-11 w-11" }: CloudUploadIconProps) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#A855F7"
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
    />
    <path fill="#FFFFFF" d="M13 16v-4h3l-4-4-4 4h3v4h2z" />
  </svg>
);


// Componente CustomToggle: un pequeño switch que actúa como toggle
const CustomToggle = ({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-10 h-4 bg-gray-300 rounded-full peer peer-checked:bg-auction-primary transition-colors"></div>
        <div className="absolute -top-1 -left-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full"></div>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
};

const CreateAuction = () => {
  const navigate = useNavigate();
  const { createAuction } = useAuction();

  // Estados del formulario principal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("3");

  // Datos generales del producto
  const [itemCondition, setItemCondition] = useState<string>("");

  // Datos de envío
  const [shippingCost, setShippingCost] = useState<string>("0");
  const [shippingPayer, setShippingPayer] = useState<string>("seller");
  const [transport, setTransport] = useState<string>("");

  // Configuración de venta usando dos toggles independientes
  const [enableAuction, setEnableAuction] = useState<boolean>(false);
  const [auctionPrice, setAuctionPrice] = useState<string>("");
  const [buyNowAuctionPrice, setBuyNowAuctionPrice] = useState<string>("");
  const [enableDirectSale, setEnableDirectSale] = useState<boolean>(false);
  const [directSalePrice, setDirectSalePrice] = useState<string>("");

  // Configurador avanzado de envío (Modal)
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [boxSize, setBoxSize] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState
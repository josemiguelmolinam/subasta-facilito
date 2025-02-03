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

// Import transport agency icons
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

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("3");
  const [itemCondition, setItemCondition] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("0");
  const [shippingPayer, setShippingPayer] = useState<string>("seller");
  const [transport, setTransport] = useState<string>("");
  const [enableAuction, setEnableAuction] = useState<boolean>(false);
  const [auctionPrice, setAuctionPrice] = useState<string>("");
  const [buyNowAuctionPrice, setBuyNowAuctionPrice] = useState<string>("");
  const [enableDirectSale, setEnableDirectSale] = useState<boolean>(false);
  const [directSalePrice, setDirectSalePrice] = useState<string>("");
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [boxSize, setBoxSize] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(duration));

      const auctionData = {
        title,
        description,
        saleOptions: {
          auctionPrice: enableAuction ? parseFloat(auctionPrice) : undefined,
          buyNowAuctionPrice: enableAuction ? parseFloat(buyNowAuctionPrice) : undefined,
          directSalePrice: enableDirectSale ? parseFloat(directSalePrice) : undefined,
        },
        itemCondition,
        shippingCost: parseFloat(shippingCost),
        shippingPayer,
        transport,
        images,
        endDate,
        sellerId: "temp-seller-id", // This should be replaced with actual seller ID
        categoryId: category,
        status: "active" as const,
        shippingDetails: {
          originCity,
          destinationCity,
          boxSize,
          weight,
          dimensions,
        },
      };

      await createAuction(auctionData);
      toast({
        title: "Success",
        description: "Auction created successfully",
      });
      navigate("/auctions");
    } catch (error) {
      console.error("Error creating auction:", error);
      toast({
        title: "Error",
        description: "Failed to create auction",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Create Auction</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="itemCondition">Item Condition</Label>
            <Input id="itemCondition" value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="shippingCost">Shipping Cost</Label>
            <Input id="shippingCost" type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} required />
          </div>
          <div className="mb-4">
            <Label htmlFor="shippingPayer">Shipping Payer</Label>
            <Select onValueChange={setShippingPayer}>
              <SelectTrigger>
                <SelectValue placeholder="Select payer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="transport">Transport</Label>
            <Select onValueChange={setTransport}>
              <SelectTrigger>
                <SelectValue placeholder="Select transport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="correos">Correos</SelectItem>
                <SelectItem value="seur">Seur</SelectItem>
                <SelectItem value="mrw">MRW</SelectItem>
                <SelectItem value="dhl">DHL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CustomToggle
            checked={enableAuction}
            onChange={() => setEnableAuction(!enableAuction)}
            label="Enable Auction"
          />
          {enableAuction && (
            <div className="mb-4">
              <Label htmlFor="auctionPrice">Auction Price</Label>
              <Input id="auctionPrice" type="number" value={auctionPrice} onChange={(e) => setAuctionPrice(e.target.value)} required />
            </div>
          )}
          <CustomToggle
            checked={enableDirectSale}
            onChange={() => setEnableDirectSale(!enableDirectSale)}
            label="Enable Direct Sale"
          />
          {enableDirectSale && (
            <div className="mb-4">
              <Label htmlFor="directSalePrice">Direct Sale Price</Label>
              <Input id="directSalePrice" type="number" value={directSalePrice} onChange={(e) => setDirectSalePrice(e.target.value)} required />
            </div>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Auction"}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateAuction;

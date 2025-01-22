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
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const CreateAuction = () => {
  const navigate = useNavigate();
  const { createAuction } = useAuction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("3");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const startingPrice = Number(formData.get('startingPrice'));
      
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(duration));

      await createAuction({
        title,
        description,
        startingPrice,
        currentBid: startingPrice,
        imageUrl: "https://picsum.photos/400/300",
        endDate,
        sellerId: "user123",
        categoryId: category,
        status: "active",
        totalBids: 0, // Agregamos totalBids inicializado en 0
      });

      toast({
        title: "Subasta creada",
        description: "Tu subasta ha sido creada exitosamente",
      });
      navigate('/auctions');
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al crear la subasta",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-auction-dark mb-8">
            Crear Nueva Subasta
          </h1>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Título de la subasta"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe tu producto..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startingPrice">Precio inicial</Label>
                    <Input
                      id="startingPrice"
                      name="startingPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyNowPrice">Precio de compra inmediata (opcional)</Label>
                    <Input
                      id="buyNowPrice"
                      name="buyNowPrice"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electrónica</SelectItem>
                        <SelectItem value="fashion">Moda</SelectItem>
                        <SelectItem value="home">Hogar</SelectItem>
                        <SelectItem value="sports">Deportes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duración</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 días</SelectItem>
                        <SelectItem value="5">5 días</SelectItem>
                        <SelectItem value="7">7 días</SelectItem>
                        <SelectItem value="10">10 días</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Imágenes</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-auction-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-auction-primary focus-within:ring-offset-2 hover:text-auction-secondary"
                        >
                          <span>Sube un archivo</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              if (e.target.files) {
                                setImages(Array.from(e.target.files));
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/auctions')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-auction-primary hover:bg-auction-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creando..." : "Crear Subasta"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateAuction;
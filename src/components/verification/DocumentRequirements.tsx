
import { CheckCircle2 } from "lucide-react";

const DocumentRequirements = () => {
  const requirements = [
    "Documento oficial vigente y sin daños",
    "Todas las esquinas visibles en la foto",
    "Información claramente legible",
    "Sin reflejos ni brillos excesivos",
    "Foto tomada sobre fondo claro"
  ];

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-semibold text-gray-700">Requisitos del documento:</h4>
      <ul className="space-y-3">
        {requirements.map((req, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentRequirements;

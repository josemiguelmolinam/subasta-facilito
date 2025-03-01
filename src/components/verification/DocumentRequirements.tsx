
export const DocumentRequirements = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Requisitos del documento:</h3>
      <ul className="space-y-1 text-xs text-gray-500">
        <li className="flex items-start gap-1">
          <span className="text-primary font-bold block mt-0.5">•</span>
          <span>Documento en vigencia y legible</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-primary font-bold block mt-0.5">•</span>
          <span>Toda la información debe ser claramente visible</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-primary font-bold block mt-0.5">•</span>
          <span>Sin reflejos ni sombras que dificulten la lectura</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-primary font-bold block mt-0.5">•</span>
          <span>Documentos no recortados o manipulados</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-primary font-bold block mt-0.5">•</span>
          <span>Imágenes en formato JPG, PNG o PDF (máx. 5MB)</span>
        </li>
      </ul>
    </div>
  );
};

export default DocumentRequirements;

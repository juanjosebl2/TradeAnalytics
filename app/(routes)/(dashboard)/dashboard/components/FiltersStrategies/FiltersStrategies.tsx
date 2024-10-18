import { FiltersStrategiesProps } from "./FiltersStrategies.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

export function FiltersStrategies(props: FiltersStrategiesProps) {
  const { clearFilters, setFilters, filters } = props;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleFilter("name", value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleFilter("description", value);
  };

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };

  return (
    <div className="flex flex-col mt-5 mb-8 space-y-2 md:flex-row md:space-y-0 md:gap-5 gap-x-4">
      <div className="flex gap-5">
        <Input
          id="name"
          type="text"
          value={filters.name}
          onChange={handleNameChange}
          placeholder="Escribe un nombre"
          className="p-2 border border-gray-300 rounded"
        />
        <Input
          id="description"
          type="text"
          value={filters.description}
          onChange={handleDescriptionChange}
          placeholder="Escribe una descripcion"
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <Button onClick={clearFilters}>
        Borrar filtros <Trash className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

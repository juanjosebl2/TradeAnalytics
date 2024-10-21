"use client";

import { Strategy } from "@prisma/client";
import { ListStrategies } from "../ListStrategies";
import { useEffect, useState } from "react";
import { PageMainDashboardProps } from "./PageMainDashboardClient.types";
import { FiltersStrategies } from "../FiltersStrategies";

export function PageDashboardClient({ strategies }: PageMainDashboardProps) {

  const [filteredStrategies, setFilteredStrategies] = useState<Strategy[]>();
  const [filters, setFilters] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    let filtered = strategies;

    if (filters.name) {
      filtered = filtered.filter((strategy) =>
        strategy.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.description) {
      filtered = filtered.filter((strategy) =>
        strategy.description
          .toLowerCase()
          .includes(filters.description.toLowerCase())
      );
    }

    setFilteredStrategies(filtered);
  }, [filters, strategies]);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      description: "",
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">Listado de estrategias</h2>
      </div>
      <FiltersStrategies
        setFilters={handleFilterChange}
        clearFilters={clearFilters}
        filters={filters}
      />
      <ListStrategies
        strategies={filteredStrategies}
      />
    </div>
  );
}

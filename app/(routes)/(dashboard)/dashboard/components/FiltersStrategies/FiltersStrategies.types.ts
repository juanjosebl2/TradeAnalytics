export type FiltersStrategiesProps = {
    setFilters: (filterName: string, filterValue: string) => void,
    clearFilters: () => void
    filters: {
      name: string,
      description: string,
    },
}
export interface FiltersProps {
  nameFilter: string
  seriesFilter: string
  setNameFilter: (value: string) => void
  setSeriesFilter: (value: string) => void
  handleClearFilters: () => void
}
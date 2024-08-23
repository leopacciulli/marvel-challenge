import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { FiltersProps } from './types'
import { useTranslation } from 'react-i18next'
import '../../i18n'

import './Filters.css'

export const Filters = ({
  nameFilter,
  seriesFilter,
  setNameFilter,
  setSeriesFilter,
  handleClearFilters,
}: FiltersProps) => {
  const { t } = useTranslation()
  return (
    <div className="filters">
      <Input
        type="text"
        placeholder={t('input-char-placeholder')}
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <Input
        type="text"
        placeholder={t('input-series-placeholder')}
        value={seriesFilter}
        onChange={(e) => setSeriesFilter(e.target.value)}
      />
      <Button
        variant="tertiary"
        label={t('clear-button')}
        onClick={handleClearFilters}
      />
    </div>
  )
}

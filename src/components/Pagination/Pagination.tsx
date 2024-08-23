import { Button } from '../Button/Button'
import { PaginationProps } from './types'
import { useTranslation } from 'react-i18next'
import '../../i18n'

import './Pagination.css'

export const Pagination = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) => {
  const { t } = useTranslation()
  return (
    <div className="pagination">
      <Button
        label={t('previous-button')}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        variant="primary"
      />
      <span>
        {t('page-label')} {currentPage}
      </span>
      <Button
        label={t('next-button')}
        onClick={handleNextPage}
        variant="primary"
      />
    </div>
  )
}

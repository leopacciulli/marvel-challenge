import React from 'react'
import { useTranslation } from 'react-i18next'

import './SelectLanguage.css'

export const SelectLanguage = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value
    i18n.changeLanguage(selectedLanguage)
  }

  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      aria-label="Select Language"
    >
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  )
}

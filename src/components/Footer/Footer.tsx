import React from 'react'
import logo from '../../assets/m.png'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import './Footer.css'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="footer">
      <div>
        <img src={logo} alt="Logo" className="marvel-logo" />
      </div>
      <div className="links">
        <div>{t('about-label')}</div>
        <div>{t('help-label')}</div>
        <div>{t('careers-label')}</div>
        <div>{t('internships-label')}</div>
      </div>
      <div className="links">
        <div>{t('advertising-label')}</div>
        <div>{t('marvel-label')}</div>
        <div>{t('digital-label')}</div>
        <div>{t('disney-label')}</div>
      </div>
    </div>
  )
}

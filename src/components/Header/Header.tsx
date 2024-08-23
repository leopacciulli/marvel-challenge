import React from 'react'
import logo from '../../assets/marvel.svg'
import { SelectLanguage } from '../SelectLanguage/SelectLanguage'

import './Header.css'

export const Header: React.FC = () => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="marvel-logo" />
      <div className="language">
        <SelectLanguage />
      </div>
    </div>
  )
}

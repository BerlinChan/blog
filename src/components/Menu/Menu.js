import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import styles from './Menu.module.scss'
import { useSiteMetadata, useCategoriesList } from '../../hooks'

const Menu = ({ menu }) => {

  return  <ul>
    {menu.map((item) => (
      <li key={item.path}>
        <Link component={GatsbyLink}
              to={item.path}
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
}

export default Menu

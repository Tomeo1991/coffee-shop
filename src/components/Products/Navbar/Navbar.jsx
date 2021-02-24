import React from 'react'
import { IconButton, Badge } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';

import {
    Nav,
    NavBarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks
} from './NavbarStyle'



const Navbar = ({ totalItems }) => {
    const location = useLocation();

    return (
        <>
            <Nav>
                <NavBarContainer>
                    <NavLogo to='/'>
                        CoffeShop
                    </NavLogo>
                    <MobileIcon onClick=''>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to='/products'>
                                Store
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/contact'>
                                Contact
                            </NavLinks>
                        </NavItem>

                        <IconButton component={Link} to='/cart' aria-label='show cart item' color='inherit '>
                            <Badge badgeContent={totalItems} color='white'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                    </NavMenu>
                </NavBarContainer>
            </Nav>
        </>

    )
}

export default Navbar


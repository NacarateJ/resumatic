import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo';
import Link from 'next/link';
import { AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';

const pages = ['Dashboard'];
const settings = ['Account', 'Logout'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const isLogin = router.pathname === '/login';
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar id='navbar' position='static' sx={{ backgroundColor: '#0077B6' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ mr: 3, flexGrow: 1, display: { xs: 'flex' } }}>
            <Link key='home' href={`/`} passHref>
              <Logo />
            </Link>
          </Box>
          {!isHomePage && !isLogin && (
            <Box
              sx={{ mr: 2, flexGrow: 0, display: { xs: 'none', md: 'flex' } }}
            >
              {pages.map((page) => (
                <Link key={page} href={`/${page.toLowerCase()}`} passHref>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 1,
                      color: 'white',
                      display: 'block',
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
          {!isHomePage && !isLogin && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ fontSize: 36, color: 'white' }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link
                    key={setting}
                    href={`/${setting.toLowerCase()}`}
                    passHref
                  >
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

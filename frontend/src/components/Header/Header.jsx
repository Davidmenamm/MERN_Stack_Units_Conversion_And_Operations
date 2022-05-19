import React from 'react';
import logo from '@assets/fractals.svg';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE_HOME, PAGE_OPERATION, PAGE_CONVERSION, VERSION, SITE_TITLE, SITE_SUBTITLE } from '@utils/constants';
import { uiSliceActions } from '@features/ui.slice';
import ChangelogButton from '@components/Header/ChangelogButton';
import '@styles/Header.scss';
import LogoutButton from './LogoutButton';

const Header = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.ui);

  const isSelected = ({ pageSelected }) => {
    return page === pageSelected ? 'selected-page' : '';
  };

  const handleSetPage = (newPage) => {
    dispatch(uiSliceActions.setPage(newPage));
  };
  return (
    <>
      <div className="header__version">v{VERSION}</div>
      <nav>
        <div className="navbar-left">
          <div
            onClick={() => {
              handleSetPage(PAGE_HOME);
            }}
          >
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="title-text">
            <p className="title">{SITE_TITLE}</p>
            <p className="subtitle">{SITE_SUBTITLE}</p>
          </div>
        </div>

        <div className="navbar-right">
          <ul>
            <li
              className={isSelected({ pageSelected: PAGE_OPERATION })}
              onClick={() => {
                handleSetPage(PAGE_OPERATION);
              }}
            >
              Operation
            </li>
            <li
              className={isSelected({ pageSelected: PAGE_CONVERSION })}
              onClick={() => {
                handleSetPage(PAGE_CONVERSION);
              }}
            >
              Conversion
            </li>
          </ul>
          <ChangelogButton />
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default Header;

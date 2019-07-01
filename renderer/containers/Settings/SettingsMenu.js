import { connect } from 'react-redux'
import { setLocale } from 'reducers/locale'
import { setFiatTicker, tickerSelectors } from 'reducers/ticker'
import { infoSelectors } from 'reducers/info'
import {
  openSettingsMenu,
  closeSettingsMenu,
  setActiveSubMenu,
  disableSubMenu,
} from 'reducers/settingsmenu'
import { setTheme, themeSelectors } from 'reducers/theme'
import { walletSelectors } from 'reducers/wallet'
import { openModal } from 'reducers/modal'
import SettingsMenu from 'components/Settings/SettingsMenu'

const mapStateToProps = state => ({
  activeSubMenu: state.settingsmenu.activeSubMenu,
  activeWalletSettings: walletSelectors.activeWalletSettings(state),
  fiatTicker: tickerSelectors.fiatTicker(state),
  fiatTickers: tickerSelectors.fiatTickers(state),
  locales: state.locale,
  currentLocale: state.intl.locale,
  themes: state.theme.themes,
  currentTheme: themeSelectors.currentTheme(state),
  isSettingsMenuOpen: state.settingsmenu.isSettingsMenuOpen,
  isWalletReady: infoSelectors.isSyncedToChain(state),
})

const mapDispatchToProps = {
  openSettingsMenu,
  openModal,
  closeSettingsMenu,
  setActiveSubMenu,
  disableSubMenu,
  setFiatTicker,
  setLocale,
  setTheme,
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  activeWalletSettings: stateProps.activeWalletSettings,
  isWalletReady: stateProps.isWalletReady,
  activeSubMenu: stateProps.activeSubMenu,
  isSettingsMenuOpen: stateProps.isSettingsMenuOpen,
  openModal: dispatchProps.openModal,
  openSettingsMenu: dispatchProps.openSettingsMenu,
  closeSettingsMenu: dispatchProps.closeSettingsMenu,
  setActiveSubMenu: dispatchProps.setActiveSubMenu,
  ...ownProps,

  fiatProps: {
    fiatTicker: stateProps.fiatTicker,
    fiatTickers: stateProps.fiatTickers,
    disableSubMenu: dispatchProps.disableSubMenu,
    setFiatTicker: dispatchProps.setFiatTicker,
  },

  localeProps: {
    locales: stateProps.locales,
    currentLocale: stateProps.currentLocale,
    disableSubMenu: dispatchProps.disableSubMenu,
    setLocale: dispatchProps.setLocale,
  },

  themeProps: {
    themes: stateProps.themes,
    currentTheme: stateProps.currentTheme,
    disableSubMenu: dispatchProps.disableSubMenu,
    setTheme: dispatchProps.setTheme,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SettingsMenu)
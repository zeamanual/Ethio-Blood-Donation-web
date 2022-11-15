import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import '../styles/globals.css'
import { createEmotionCache } from '../utils/createEmotionCache'
import {theme} from '../utils/theme'
import {store} from '../state/store/store'
import {wrapper} from '../state/store/store'
import styles from '../styles/testimonial.css'


let clientSideEmotionCache = createEmotionCache()
function MyApp({ Component,emotionCache=clientSideEmotionCache, pageProps }) {
  return (
    <Provider store={store}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} /> 
      </ThemeProvider>     
    </CacheProvider>
    </Provider>

)
}

export default wrapper.withRedux(MyApp)
// export default wrapper.useWrappedStore(store)

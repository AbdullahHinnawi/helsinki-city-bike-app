import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'
import * as ReactDOMClient from 'react-dom/client'

const root = ReactDOMClient.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

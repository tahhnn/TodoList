import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ProductProvider from './context/Product.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ProductProvider>
            <App />
        </ProductProvider>
    </React.StrictMode>
)

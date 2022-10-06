import { HashRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import './styles.css'
import { getProductsThunk } from './store/slices/Products.slice';
import { Container } from 'react-bootstrap'

import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Home from './pages/Home'
import Login from './pages/Login'
import MyNavbar from './components/MyNavbar'
import ProtectedRoutes from "./components/ProtedtedRoutes";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'


function App() {

  const isLoading = useSelector((state) => state.isLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])


  return (
    <HashRouter>
      <MyNavbar />
      {isLoading && <LoadingScreen />}
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App

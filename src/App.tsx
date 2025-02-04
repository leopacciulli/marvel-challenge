import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import AppRouter from './routes/Routes'

export const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  )
}

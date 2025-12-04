import { Route, Routes } from "react-router-dom"
import HomePages from "../pages/HomePages"
import { SobrePages } from "../pages/SobrePages"
import { UsuarioPages } from "../pages/UsuarioPages"
import { SessoesPages } from "../pages/SessoesPages"
import { FilmesPages } from "../pages/FilmesPages"

import DefaultLayout from "../layouts/DefaultLayout"


export const AppRouter = () => {
  return (
  <>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePages />} />
        <Route path="/sobre" element={<SobrePages />} />
        <Route path="/usuario" element={<UsuarioPages />} />
        <Route path="/sessoes" element={<SessoesPages />} />
        <Route path="/filmes" element={<FilmesPages />} />
      </Route>
    </Routes>
  </>
  )
}

import { Route, Routes } from "react-router-dom"
import {HomePages} from "../pages/HomePages"
import { IngressosPages } from "../pages/IngressosPages"
import { SalasPages } from "../pages/SalasPages"
import { SessoesPages } from "../pages/SessoesPages"
import { FilmesPages } from "../pages/FilmesPages"
import { LanchesPages } from "../pages/LanchesPages"
import DefaultLayout from "../layouts/DefaultLayout"


export const AppRouter = () => {
  return (
  <>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/home" element={<HomePages />} />
        <Route path="/ingressos" element={<IngressosPages />} />
        <Route path="/salas" element={<SalasPages />} />
        <Route path="/sessoes" element={<SessoesPages />} />
        <Route path="/filmes" element={<FilmesPages />} />
        <Route path="/lanches" element={<LanchesPages />} />

      </Route>
    </Routes>
  </>
  )
}

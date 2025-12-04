import { Route, Routes } from "react-router-dom"
import {HomePages} from "../pages/HomePages"
import { SessoesPages } from "../pages/SessoesPages"
import { FilmesPages } from "../pages/FilmesPages"
import { SalasPages } from "../pages/SalasPages"
import { ProgPages } from "../pages/ProgPages"
import { IngressosPages } from "../pages/IngressosPages"

import DefaultLayout from "../layouts/DefaultLayout"


export const AppRouter = () => {
  return (
  <>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/home" element={<HomePages />} />
        <Route path="/prog" element={<ProgPages />} />
        <Route path="/sessoes" element={<SessoesPages />} />
        <Route path="/filmes" element={<FilmesPages />} />
        <Route path="/salas" element={<SalasPages />} />
        <Route path="/ingressos" element={<IngressosPages />} />
      </Route>
    </Routes>
  </>
  )
}

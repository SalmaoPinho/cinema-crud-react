import { Route, Routes } from "react-router-dom"
import { HomePages } from "../pages/HomePages"
import { IngressosPages } from "../pages/IngressosPages"
import { SalasPages } from "../pages/SalasPages"
import { SessoesPages } from "../pages/SessoesPages"
import { FilmesPages } from "../pages/FilmesPages"
import { LanchesPages } from "../pages/LanchesPages"
import { LanchesAdminPages } from "../pages/LanchesAdminPages"
import { ProgramacaoPages } from "../pages/ProgPages"
import { LoginPage } from "../pages/LoginPage"
import DefaultLayout from "../layouts/DefaultLayout"
import { ROUTES } from "../routes/constants"


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={ROUTES.HOME} element={<HomePages />} />
          <Route path={ROUTES.INGRESSOS} element={<IngressosPages />} />
          <Route path={ROUTES.SALAS} element={<SalasPages />} />
          <Route path={ROUTES.SESSOES} element={<SessoesPages />} />
          <Route path={ROUTES.FILMES} element={<FilmesPages />} />
          <Route path={ROUTES.LANCHES} element={<LanchesPages />} />
          <Route path={ROUTES.LANCHES_ADMIN} element={<LanchesAdminPages />} />
          <Route path={ROUTES.PROGRAMACAO} element={<ProgramacaoPages />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  )
}

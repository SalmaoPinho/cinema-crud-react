import { AppRouter } from "./routers/app.routers"
import { AuthProvider } from "./contexts/AuthContext"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { ToastProvider } from "./components/Toast"

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App

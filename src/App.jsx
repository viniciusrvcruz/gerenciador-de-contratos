import { AuthProvider } from "./contexts/authProvider"
import { AppRoutes } from "./routes/AppRoutes"

function App() { 

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>

  )
}

export default App

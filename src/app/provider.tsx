import type { ReactNode } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const client = new QueryClient()

const AppProvider = ({children}:{children: ReactNode}) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          {children}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default AppProvider
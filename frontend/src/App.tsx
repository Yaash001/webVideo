import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './reducer/store'
import { Toaster } from 'sonner'

const App : React.FC = () => {
  return (
    <>
    <Provider store={store}>
      <Toaster position='bottom-right' richColors closeButton/>
    <RouterProvider router={router}/>
    </Provider>
    </>
  )
}

export default App
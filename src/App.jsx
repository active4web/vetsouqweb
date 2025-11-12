import { RouterProvider } from "react-router-dom"
import routes from "./utils/Routes"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
    useEffect(() => {
        if (!localStorage.getItem("fcmToken")) {
            localStorage.setItem("fcmToken", uuidv4());
        }
    }, [])

    return (
        <div className="App">
            <Toaster reverseOrder={false} />
            <RouterProvider router={routes} />
        </div>
    )
}

export default App

import { Outlet } from "react-router"

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="border rounded-sm p-6">
        <Outlet/>
      </section>
    </div>
  )
}
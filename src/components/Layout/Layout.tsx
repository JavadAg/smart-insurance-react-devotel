import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
    </div>
  )
}

export default Layout

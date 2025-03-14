import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="mt-8 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-6xl font-bold text-transparent sm:text-8xl">
          404
        </h1>

        <p className="mt-4 text-xl text-gray-600 sm:text-2xl">Page not found</p>

        <p className="mt-2 max-w-md text-gray-500">
          The page you are looking for does not exist or has been deleted.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 px-8 py-3 text-white transition-transform hover:scale-105 active:scale-95"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

const NotFound = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-2xl mb-4">Page Not Found</p>
          <p className="text-lg mb-8">
            The page you are looking for does not exist.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-black font-bold py-2 px-4 rounded-lg"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  };
  
  export default NotFound;
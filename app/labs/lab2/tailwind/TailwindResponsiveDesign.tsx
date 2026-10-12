export default function TailwindResponsiveDesign() {
    return (
      <div className="font-sans">
        <h2 className="text-3xl font-bold mb-4">Responsive Design</h2>
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
          <div className="md:flex">
            <div className="relative md:w-48 md:shrink-0">
              <img
                className="h-56 w-full object-cover object-top md:h-full md:min-h-56 md:w-48"
                src="/images/sasori.webp"
                alt="Sasori"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-center text-lg font-semibold text-white">
                Sasori
              </div>
            </div>
            <div className="min-w-0 p-8">
              <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                Favorite Characters
              </div>
              <a
                href="#"
                className="mt-1 block text-lg leading-tight font-medium text-black no-underline hover:underline md:text-2xl"
              >
                Sasori of the Red Sand
              </a>
              <p className="mt-2 text-gray-500">
                A puppet master from the Hidden Sand Village and one of my
                favorite Naruto characters...
              </p>
            </div>
          </div>
        </div>
        <div
          id="wd-ai-responsive"
          className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl"
        >
          <div className="md:flex">
            <div className="relative bg-gray-900 md:w-48 md:shrink-0">
              <img
                className="h-56 w-full object-contain md:h-full md:min-h-56 md:w-48"
                src="/images/reactjs.png"
                alt="React JS"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 text-white">
                <div className="text-2xl font-semibold">React JS</div>
              </div>
            </div>
            <div className="min-w-0 p-8 lg:p-12">
              <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                Professional Courses
              </div>
              <a
                href="#"
                className="mt-1 block text-lg leading-tight font-medium text-black no-underline hover:underline"
              >
                Rocket Propulsion Fundamentals
              </a>
              <p className="mt-2 text-gray-500">
                An in-depth study of the fundamentals of rocket propulsion...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default function LoadingBar() {
    return (
      <div className="mt-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 font-poppins">
                Generating
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600 font-poppins">
                Abiel&apos;s AI
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500">
              <div className="w-full h-full bg-indigo-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
import ReactPlaceholder from "react-placeholder";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout size="full">
      <div className="flex bg-white" style={{ height: '900px' }}>
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">Ryan Rishi</h2>
            <p className="pt-2 text-2xl text-gray-500 lg:text-base">
                <ReactPlaceholder type="text" rows={4} ready={false} />
              </p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" href="#">Get Started</a>
              <a className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">Learn More</a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}>
          <div className="h-full object-cover" style={{ backgroundImage: 'url(assets/img/ryan-sitting.jpg)' }}>
            <div className="h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

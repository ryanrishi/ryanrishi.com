export const H1 = ({ children }) => {
  return (
    <h1 className="text-5xl font-semibold leading-tight text-gray-800 md:text-6xl md:font-bold lg:text-7xl lg:font-extrabold xl:text-8xl uppercase italic">
      {children}
    </h1>
  );
}

export const H3 = ({ children }) => {
  return (
    <h3 className="text-3xl font-semibold leading-tight text-gray-800 md:text-4xl md:font-bold lg:text-5xl lg:font-extrabold xl:text-6xl uppercase italic">
      {children}
    </h3>
  );
}

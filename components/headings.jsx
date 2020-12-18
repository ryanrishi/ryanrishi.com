export const H1 = ({ className, children }) => {
  return (
    <h1 className={"text-5xl font-semibold leading-tight md:text-6xl md:font-bold lg:text-7xl lg:font-extrabold xl:text-8xl " + (className || "")}>
      {children}
    </h1>
  );
}

export const H3 = ({ className, children }) => {
  return (
    <h3 className={"text-xl font-semibold leading-tight md:font-bold lg:font-bold " + (className || "")}>
      {children}
    </h3>
  );
}

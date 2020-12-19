const baseClassNames = ["font-semibold", "leading-tight", "uppercase", "italic", "text-gray-800"];

export const H1 = ({ className, children }) => {
  return (
    <h1 className={baseClassNames.join(' ').concat(" text-4xl md:text-6xl " + (className || ""))}>
      {children}
    </h1>
  );
}

export const H3 = ({ className, children }) => {
  return (
    <h3 className={baseClassNames.join(' ').concat(" text-xl md:text-4xl " + (className || ""))}>
      {children}
    </h3>
  );
}

export const H6 = ({ className, children }) => {
  return (
    <h6 className={baseClassNames.join(' ').concat(" text-sm md:text-xl " + (className || ""))}>
      {children}
    </h6>
  )
}

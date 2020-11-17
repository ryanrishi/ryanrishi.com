export default function Container({ size, children }) {
  const baseClasses = "container mx-auto px-4 mt-4";
  const sizes = {
    sm: "max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl",
    md: "max-w-md lg:max-w-xl xl:max-w-2xl",
    lg: "max-w-xl px-6 mx-auto lg:max-w-3xl lg:px-0",
    xl: "max-w-2xl",
    full: "w-full"
  };

  return <div className={`${baseClasses} ${sizes[size]}`}>{children}</div>
}

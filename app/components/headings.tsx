export function FancyH1({ children }) {
  return <h1 className="not-prose text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#00cc99] to-[#6600ff] pb-4">{`${children?.replace(/\.$/, '')}.`}</h1>
}

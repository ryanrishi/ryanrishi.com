export function FancyH1({ children }) {
  return <h1 className="not-prose font-bold tracking-tighter text-4xl md:text-5xl text-slate-900 dark:text-slate-50 mb-8">{`${children?.replace(/\.$/, '')}.`}</h1>
}

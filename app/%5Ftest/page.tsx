import { FancyH1 } from '@/components/headings'

export default async function Test() {
  const { default: Test } = await import('@/%5Ftest/test.mdx')

  return (
    <>
      <FancyH1>test</FancyH1>
      <div className="prose prose-slate dark:prose-invert">
        <Test />
      </div>
    </>
  )
}

import { ReactNode } from 'react'

const subagents = ['firewall rules', 'LAN and Wi-Fi', 'client methods']

const Connector = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center">
    <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
    {label && <span className="py-1 font-mono text-xs text-slate-500 dark:text-slate-400">{label}</span>}
    <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
  </div>
)

function Box({ title, subtitle, accent = false, children }: { title: string, subtitle?: string, accent?: boolean, children?: ReactNode }) {
  return (
    <div className={`rounded-lg border bg-white p-3 dark:bg-slate-900 ${accent ? 'border-valencia-500' : 'border-slate-200 dark:border-slate-700'}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <span className="font-medium text-slate-900 dark:text-slate-100">{title}</span>
        {subtitle && <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>}
      </div>
      {children}
    </div>
  )
}

function Group({ label, detail, children }: { label: string, detail?: string, children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-3 dark:border-slate-600">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 font-mono text-xs">
        <span className="uppercase tracking-wide text-slate-600 dark:text-slate-300">{label}</span>
        {detail && <span className="text-slate-500 dark:text-slate-400">{detail}</span>}
      </div>
      {children}
    </div>
  )
}

const Items = ({ items }: { items: string[] }) => (
  <ul className="mt-2 flex flex-wrap gap-1.5">
    {items.map(item => (
      <li key={item} className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item}</li>
    ))}
  </ul>
)

export default function WorkflowDiagram() {
  return (
    <figure className="not-prose my-10 text-sm">
      <div className="mx-auto max-w-md">
        <Box title="Me" subtitle="direction">
          <Items items={['rules', 'scope', 'decisions', 'release approval']} />
        </Box>
        <Connector />
        <Box title="Claude Fable 5.2" subtitle="orchestrator · one long session" accent>
          <Items items={['plans', 'writes briefs', 'checks every diff', 'opens PRs', 'merges']} />
        </Box>
      </div>
      <Connector label="a narrow written brief each" />

      <Group label="Claude Opus 5.5 subagents" detail="in parallel · one git worktree each">
        <div className="grid gap-3 sm:grid-cols-3">
          {subagents.map(task => (
            <Box key={task} title="Subagent" subtitle={task}>
              <Items items={['code', 'tests', 'report']} />
            </Box>
          ))}
        </div>
      </Group>
      <Connector label="branch and report back to the orchestrator" />

      <Group label="Pull request">
        <div className="grid gap-3 sm:grid-cols-3">
          <Box title="CI">
            <Items items={['build', 'lint', 'fake-router tests']} />
          </Box>
          <Box title="GitHub Copilot" subtitle="review">
            <Items items={['every pull request']} />
          </Box>
          <Box title="Fixes">
            <Items items={['valid: back to the same subagent', 'wrong: declined with a reason']} />
          </Box>
        </div>
      </Group>
      <Connector label="squash merge" />

      <div className="mx-auto max-w-md">
        <Box title="main" />
        <Connector label="before the tag" />
        <Box title="OpenAI Codex" subtitle="adversarial review of both repos" />
        <Connector />
        <Box title="v1.0.0" accent />
      </div>
    </figure>
  )
}

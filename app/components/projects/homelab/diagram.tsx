import { ReactNode } from 'react'

const nodes = [
  { hardware: 'Intel NUC', vms: ['k3s-server', 'k3s-agent', 'k3s-agent · iGPU'] },
  { hardware: 'Intel NUC', vms: ['k3s-server', 'k3s-agent', 'k3s-agent · iGPU'] },
  { hardware: 'Lenovo M920q', vms: ['k3s-server', 'k3s-agent'] },
]

const workloads = ['Pi-hole', 'Plex + *arr', 'Home Assistant', 'kube-prometheus-stack', 'Loki', 'camping bot', 'email organizer', 'ddclient']
const platform = ['Flux', 'Traefik', 'MetalLB', 'Longhorn', 'SOPS']

const Connector = () => <div className="mx-auto h-6 w-px bg-slate-300 dark:bg-slate-600" />

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

export default function HomelabDiagram() {
  return (
    <figure className="not-prose my-10 text-sm">
      <div className="mx-auto max-w-xs">
        <Box title="Internet" />
        <Connector />
        <Box title="Verizon Fios gateway" subtitle="NAT" />
        <Connector />
        <Box title="UniFi Dream Machine" subtitle="NAT · firewall" accent />
      </div>
      <Connector />

      <div className="grid gap-3 sm:grid-cols-2">
        <Group label="Default VLAN" detail="192.168.0.0/24">
          <Items items={['laptops', 'phones', 'iPad']} />
        </Group>
        <Group label="IoT VLAN" detail="192.168.2.0/24">
          <Items items={['Philips Hue bridge', 'smart lights', 'Sonos']} />
        </Group>
      </div>
      <Connector />

      <Group label="Homelab VLAN" detail="192.168.4.0/24">
        <div className="mx-auto max-w-xs">
          <Box title="TP-Link switch" subtitle="unmanaged" />
        </div>
        <Connector />

        <div className="grid gap-3 md:grid-cols-[3fr_1fr]">
          <Group label="Proxmox cluster">
            <div className="grid gap-3 sm:grid-cols-3">
              {nodes.map((node, i) => (
                <Box key={i} title={node.hardware}>
                  <Items items={node.vms} />
                </Box>
              ))}
            </div>
          </Group>
          <Box title="Synology DS218+">
            <Items items={['backups', 'media']} />
          </Box>
        </div>
        <Connector />

        <Box title="k3s cluster" subtitle="3 servers · 5 agents" accent>
          <Items items={workloads} />
          <p className="mt-3 font-mono text-xs text-slate-500 dark:text-slate-400">runs on</p>
          <Items items={platform} />
        </Box>
      </Group>
    </figure>
  )
}

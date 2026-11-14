import { curveBasis, csvParse, extent, line, mean, rollups, scaleLinear } from 'd3'
import fs from 'fs'
import NextLink from 'next/link'
import path from 'path'

const WIDTH = 600
const HEIGHT = 180
const PADDING = { top: 12, right: 8, bottom: 24, left: 8 }
const SAMPLE_SIZE = 100

function loadTracks() {
  const csv = fs.readFileSync(path.join(process.cwd(), 'public', 'loudness-wars.csv'), 'utf8')

  return csvParse(csv, row => ({
    name: row.track_name!,
    artist: row.artist_name!,
    year: +row.release_date!.slice(0, 4),
    loudness: +row.loudness!,
  }))
    .filter(track => track.year >= 1970)
    .sort((a, b) => a.year - b.year)
}

export default function LoudnessWarsPreview() {
  const tracks = loadTracks()
  const step = tracks.length / SAMPLE_SIZE
  const sample = Array.from({ length: SAMPLE_SIZE }, (_, i) => tracks[Math.floor(i * step)])

  const meanByYear = rollups(tracks, group => mean(group, t => t.loudness)!, t => t.year)
    .sort(([a], [b]) => a - b)

  const [minYear, maxYear] = extent(tracks, t => t.year) as [number, number]
  const [minLoudness, maxLoudness] = extent(sample, t => t.loudness) as [number, number]

  const x = scaleLinear().domain([minYear, maxYear]).range([PADDING.left, WIDTH - PADDING.right])
  const y = scaleLinear().domain([minLoudness, maxLoudness]).range([HEIGHT - PADDING.bottom, PADDING.top])

  const trendline = line<[number, number]>()
    .x(([year]) => x(year))
    .y(([, loudness]) => y(loudness))
    .curve(curveBasis)(meanByYear)!

  return (
    <NextLink
      href="/projects/loudness-wars"
      className="group not-prose mt-10 block rounded-lg border border-slate-200 p-4 transition-colors hover:border-valencia-500 dark:border-slate-800 dark:hover:border-valencia-500"
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Average loudness of popular music, ${minYear}–${maxYear}, trending louder over time`}
      >
        {sample.map((track, i) => (
          <g key={i} className="loudness-point">
            <title>{`${track.name} · ${track.artist} (${track.year})`}</title>
            <circle cx={x(track.year)} cy={y(track.loudness)} r={9} fill="transparent" />
            <circle
              cx={x(track.year)}
              cy={y(track.loudness)}
              r={3.5}
              className="loudness-dot fill-slate-400 opacity-40 dark:fill-slate-500"
            />
          </g>
        ))}
        <path
          d={trendline}
          pathLength={1}
          className="loudness-trendline fill-none stroke-valencia-500 stroke-2"
        />
        <text x={PADDING.left} y={HEIGHT - 4} className="fill-slate-400 font-mono text-[11px]">{minYear}</text>
        <text x={WIDTH - PADDING.right} y={HEIGHT - 4} textAnchor="end" className="fill-slate-400 font-mono text-[11px]">{maxYear}</text>
      </svg>
      <p className="mt-3 flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium text-slate-900 transition-colors group-hover:text-valencia-600 dark:text-slate-100 dark:group-hover:text-valencia-500">
          Loudness Wars
        </span>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
          2500+ songs, 50+ years, getting louder &rarr;
        </span>
      </p>
    </NextLink>
  )
}

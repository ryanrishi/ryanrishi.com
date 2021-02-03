import ReactPlaceholder from "react-placeholder";
import Layout from "../components/layout";
import Link from "next/Link";

export default function Music() {
  return (
    <Layout>
      <h1>Projects</h1>
      {/* TODO have this generated from /projects */}
      <ul>
        <li><Link href="/projects/covid-19-dashboard">COVID-19 Dashboard</Link>&mdash; Visualize COVID-19 cases and deaths in the United States.</li>
        <li><Link href="/projects/homelab">Homelab</Link>&mdash; Ongoing project of managing servers and services at home.</li>
      </ul>
    </Layout>
  );
}

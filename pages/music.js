import ReactPlaceholder from "react-placeholder";
import Layout from "../components/layout";
import { H1, H3 } from "../components/headings";

export default function Music() {
  return (
    <Layout>
      <H1>Music</H1>
      <ReactPlaceholder type="text" rows={7} ready={false} />
    </Layout>
  );
}

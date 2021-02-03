import ReactPlaceholder from "react-placeholder";
import Layout from "../components/layout";

export default function Music() {
  return (
    <Layout>
      <h1>Music</h1>
      <ReactPlaceholder type="text" rows={7} ready={false} />
    </Layout>
  );
}

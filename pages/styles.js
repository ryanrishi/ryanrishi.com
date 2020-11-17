import { H1, H3 } from "../components/headings";
import Container from "../components/container";

export default function Styles() {
  return (
    <>
      <H1>Heading 1</H1>
      <H3>Heading 3</H3>

      <hr />
      {["sm", "md", "lg", "xl"].map((size) =>
        <Container
          key={size}
          size={size}>
            <div className="flex bg-gray-400 border-gray-600 h-8 my-4 justify-center">
              {size}
            </div>
        </Container>
      )}
    </>
  );
}

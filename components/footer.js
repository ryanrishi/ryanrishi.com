import { H6 } from "./headings";

export default function Footer() {
  return (
    <footer className="mt-4 p-4">
      <H6>&copy; Copyright {new Date().getFullYear()} Ryan Rishi. All rights reserved.</H6>
      {/* TODO social links */}
    </footer>
  );
}

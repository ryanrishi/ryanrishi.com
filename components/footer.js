export default function Footer() {
  return (
    <footer className="container uppercase italic font-bold text-sm px-4 my-16">
      <div>
        <p>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          &copy; Copyright&nbsp;{ new Date().getFullYear() }&nbsp;Ryan Rishi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

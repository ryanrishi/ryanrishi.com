export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          &copy; Copyright&nbsp;{ new Date().getFullYear() }&nbsp;Ryan Rishi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

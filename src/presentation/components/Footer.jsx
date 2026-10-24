// PRESENTATION: the page footer.

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>Created with 💚 to keep my GitHub tidy.</p>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://github.com/TumeloLutaka/">Tumelo Lutaka</a>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

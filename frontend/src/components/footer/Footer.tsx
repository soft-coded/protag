import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="wrapper">
          <div className="more">
            <h4>MORE FROM US</h4>
            <ul>
              <li>Merch</li>
              <li>Affiliations</li>
              <li>Work for us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="stay-connected">
            <h4>STAY CONNECTED</h4>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Pinterest</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className="support">
            <h4>SUPPORT</h4>
            <ul>
              <li>Email</li>
              <li>FAQs</li>
              <li>Return Policy</li>
              <li>Phone</li>
            </ul>
          </div>
        </div>
        <h3>&copy; ProTag Limited</h3>
      </div>
    </footer>
  );
}

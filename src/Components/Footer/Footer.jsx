import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Jobs</h2>
            <span>Reactjs</span>
            <span>Mern</span>
            <span>Nodejs</span>
            <span>Python</span>
            <span>Web Designer</span>
            <span>Ui/Ux</span>
            <span>Frontend Developer</span>
            <span>FullStack Developer</span>
            <span>Backend Developer</span>
            <span>Programming</span>
            <span>It Expert</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on WorkNow</span>
            <span>Buying on WorkNow</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Students Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Invite a Friend</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From WorkNow</h2>
            <span>WorkNow Business</span>
            <span>WorkNow Pro</span>
            <span>WorkNow Logo Maker</span>
            <span>WorkNow Guides</span>
            <span>Get Inspired</span>
            <span>WorkNow Select</span>
            <span>ClearVoice</span>
            <span>WorkNow Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <div className="bottom">
          <div className="left-b">
            <h2>WorkNow</h2>
            <span>© WorkNow International Ltd. 2023</span>
          </div>
          <div className="right-b">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
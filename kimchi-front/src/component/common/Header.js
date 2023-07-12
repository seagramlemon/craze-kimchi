import './Header.css';

function Header() {

    return (
    <header>
      <div className="header">
        <div className="site-logo">
          <a href="/">
            <img src="image/logo_t.png"></img>
          </a>
        </div>
        <div className="search-box">
          <input type="text" id="searchInput"></input>
          <button>
            <span id="search-btn" class="material-icons">
              search
            </span>
          </button>
        </div>
        <div className="member-link">
          <a href="#">로그인</a>
          <a href="#">회원가입</a>
        </div>
      </div>
      <div className="main-nav">
        <ul>
          <li>
            <a href="#">PRODUCT</a>
          </li>
          <li>
            <a href="#">NOTICE</a>
          </li>
          <li>
            <a href="#">REVIEW</a>
          </li>
          <li>
            <a href="#">COMMUNITY</a>
          </li>
        </ul>
      </div>
    </header>
    );
}

export default Header;

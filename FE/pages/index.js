import Link from "next/link";
// import AuthProvider from "./AuthComp";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function HomePage() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/shortenurl">
          <a>Shorten URL</a>
        </Link>
      </li>
    </ul>
  );
}

function mapStateToProps(state) {
  return {
    val: state.val,
  };
}

// export default withRouter(connect(mapStateToProps, {})(AuthProvider(HomePage)));
export default HomePage;

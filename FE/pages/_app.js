import "../styles.scss";
import AuthProvider from "./AuthComp";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withRouter(connect(mapStateToProps, {})(AuthProvider(MyApp)));

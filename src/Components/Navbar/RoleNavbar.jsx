import AuthorizedNav from './AuthorizedNavbar';
import UnauthorizedNav from './UnAuthorizedNavbar';

const RoleNavbar = () => {
    const user = sessionStorage.getItem("active-user");

    if (user != null) {
        return <AuthorizedNav />;
    } else {
        return <UnauthorizedNav />;
    }
}
export default RoleNavbar;
import AuthorizedNav from './AuthorizedNavbar';
import UnauthorizedNav from './UnAuthorizedNavbar';
import {useUser} from '../UserContext/UserContext';

const RoleNavbar = () => {
    const {user} = useUser();
    return user ? <AuthorizedNav/> : <UnauthorizedNav/>;
}
export default RoleNavbar;
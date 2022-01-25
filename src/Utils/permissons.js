import { ServiceFactory } from '../services/ServiceFactory'
const UsersService = ServiceFactory.get('Users')

// this request will block the navigation
// I'm making sure it's just get blocked for unnoticeable time
export const fetchPermisson = async (token) => {
    const { data } = await UsersService.getPermissons(token)
    console.log(data)
}

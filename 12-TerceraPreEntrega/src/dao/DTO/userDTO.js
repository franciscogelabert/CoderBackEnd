class UserDTO{
    constructor(userInfo){
        this.name=userInfo?.name;
        this.lastName=userInfo?.lastName;
        this.email=userInfo?.email;
        this.age=userInfo?.age;
        this.rol=userInfo?.rol;
        this._id=userInfo?._id;
         }
}
export default UserDTO;
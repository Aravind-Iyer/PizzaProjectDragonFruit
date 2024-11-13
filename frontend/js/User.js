class User{
    username;
    password;
    email;
    phone;
    address;
    isLoggedIn;
    loginAttempts;

    UserEmpty(){
        this.username="";
        this.password="";
        this.email="";
        this.phone="";
        this.address="";
        this.isLoggedIn=false;
        this.loginAttempts=0;
    }

    UserCreated(username, password, email){
        this.username=username;
        this.password=password;
        this.email=email;
        this.phone="";
        this.address="";
        this.isLoggedIn=false;
        this.loginAttempts=0;
    }
    //need to access database to compare input info to database info
    login(){
        this.isLoggedIn = true;
    }

    logout(){
        this.isLoggedIn = false;
    }
    // what exactly does the update profile method actually update?
    updateProfile(email,phone,address){
        this.email=email;
        this.phone=phone;
        this.address=address;
    }

    resetPassword(password){
        this.password=password;
    }
}
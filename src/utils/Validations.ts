export class AppValidation {
    // Regex email
    private emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    private readonly passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  
    private readonly userName = /^(?=.*[A-Za-z])[A-Za-z0-9 _]+$/;
  
    get emailReg() {
      return this.emailRegex;
    }
  
    set emailReg(reg: RegExp) {
      this.emailRegex = reg;
    }
  
    // Validate Login
    validateLogin = (email: string): boolean => {
      if (this.emailRegex.test(email) === false) {
        return false;
      }
      return true;
    };
  
    validatePassword = (password: string): boolean => {
      if (this.passwordRegex.test(password) === false) {
        return false;
      }
      if (password.length < 8) {
        return false;
      }
      return true;
    };
  
    // validate name
    validateUserName = (name: string): boolean => {
      if (this.userName.test(name) === false) {
        return false;
      }
      return true;
    };
  }
  
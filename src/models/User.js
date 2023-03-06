import { USER_ROLES } from "../constants/appConstants";

export class User {
  username = "";
  email = "";
  dp = "";
  userRole = USER_ROLES.DEFAULT;
}

import { User } from '../../ui/util/types/user';
import { allUsers, userIdGenerator } from '../users/users_services';

export let currentUser: User | undefined = undefined;

export class AuthenticationService {
  verifyInformation(opts: {email: string, id: number}) {
    const user = allUsers.get(opts.id);
    if (!user){
      return undefined;
    }
    currentUser = user;
    return user;
  }

  login(opts: {email: string, password: string}) {
    const email = opts.email.toLowerCase();
    const users = Array.from(allUsers.values());
    const matchedEmail = users.find(user => user.email === email);
    const matchedUser = users.find(user => user.email === email && user.password === opts.password);
    if (!matchedEmail) {
      throw Error(`User with ${email} does not exist.`);
    }
    if (!matchedUser) {
      throw Error(`Incorrect password for provided email.`);
    }
    currentUser = matchedUser;
    return matchedUser;
  }

  signUp(opts: {email: string, name: string, phoneNumber: string, street: string, suburb: string, postcode: string, state: string, country: string, password: string}) {
    const users = Array.from(allUsers.values());
    if (users.find(user => user.email === opts.email.toLowerCase())) {
      throw Error('Email already exists.');
    }
    const newUser: User = {
      id: userIdGenerator.next(),
      blurb: "Hi! I'm new here.",
      ...opts,
    }
    currentUser = newUser;
    allUsers.set(newUser.id, newUser);
    return newUser;
  }

  logout() {
    currentUser = undefined;
  }
}
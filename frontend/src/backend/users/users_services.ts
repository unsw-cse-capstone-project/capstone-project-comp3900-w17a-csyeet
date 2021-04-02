import { User } from "../../ui/util/types/user";
import { IdGenerator } from "../../ui/util/id_generator";
import { fakeUsers } from "./fakes";
import { currentUser } from '../authentication/authentication_service';

export const userIdGenerator = new IdGenerator();
export const getFakeUser = (opts?: Partial<User>): User => {
  const id = opts?.id ?? userIdGenerator.next();
  return {
    id,
    email: opts?.name
      ? `${opts.name.toLowerCase()}@example.com`
      : `user${id}@example.com`,
    password: "password",
    name: `User ${id}`,
    phoneNumber: "0488888888",
    street: "1 Ivy St",
    suburb: "Redfern",
    postcode: "2016",
    state: "NSW",
    country: "Australia",
    blurb: "Hi! I'm new here.",
    ...opts,
  };
};

export const allUsers = new Map<number, User>();
for (const fakeUser of fakeUsers) {
  const id = userIdGenerator.next();
  allUsers.set(id, getFakeUser({ id, ...fakeUser }));
}

export class UsersService {
  getProfile(id: number) {
    const user = allUsers.get(id);
    if (!user) {
      throw Error();
    }
    return {
      ...user,
      registrations: [],
      starred_listings: [],
      listings: [],
    };
  }
  updateProfile(opts: {
    name?: string;
    blurb?: string;
    phoneNumber?: string;
    street?: string;
    suburb?: string;
    postcode?: string;
    state?: string;
    country?: string;
    oldPassword?: string;
    newPassword?: string;
  }) {
    if (!currentUser) {
      throw Error();
    }
    if (opts.oldPassword) {
      if (!opts.newPassword || currentUser.password !== opts.oldPassword){
        throw Error();
      }
      currentUser.password = opts.oldPassword;
    } else {
      const {name, blurb, phoneNumber, street, suburb, postcode, state, country} = opts;
      console.log(name);
      name && (currentUser.name = name);
      blurb && (currentUser.blurb = blurb);
      phoneNumber && (currentUser.phoneNumber = phoneNumber);
      street && (currentUser.street = street);
      suburb && (currentUser.suburb = suburb);
      postcode && (currentUser.postcode = postcode);
      state && (currentUser.state = state);
      country && (currentUser.country = country);
    }
    console.log(currentUser)
    allUsers.set(currentUser.id, currentUser);
    return currentUser;
  }
  
  updateAvatar(dataString: string) {
    if (!currentUser) {
      throw Error();
    }
    console.log(dataString);
    currentUser.avatar = dataString;
    return currentUser.avatar;
  }
}

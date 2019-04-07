import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
import { Profile } from 'passport-twitter';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOrCreateByProfile(profile: Profile) {
    const { id: twitterId, displayName } = profile;
    return this.findOneOrFail({ twitterId })
      .catch(() => this.create({ twitterId, displayName }));
  }
}

import {
  AccountRepositoryLoginResponseLogged_in_user,
  IgApiClient,
} from 'instagram-private-api';
import { simulateHumanity } from './utils';

require('dotenv').config();

export async function generateClientAndLogIn(): Promise<{
  ig: IgApiClient;
  auth: AccountRepositoryLoginResponseLogged_in_user;
}> {
  const { IG_USERNAME, IG_PASSWORD } = process.env;
  if (IG_USERNAME && IG_PASSWORD) {
    const ig = new IgApiClient();
    simulateHumanity(1000, 4588);
    ig.state.generateDevice(IG_USERNAME);
    simulateHumanity(1000, 4582);

    await ig.simulate.preLoginFlow();
    simulateHumanity(1000, 4703);
    const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
    simulateHumanity(1000, 4491);

    return { ig, auth };
  } else {
    throw new Error('Must have values for IG_USERNAME and IG_PASSWORD');
  }
}

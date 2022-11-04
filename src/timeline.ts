import {
  AccountRepositoryLoginResponseLogged_in_user,
  IgApiClient,
  TimelineFeed,
} from 'instagram-private-api';
import { simulateHumanity } from './utils';

export async function likeTimelinePostsUntilLastLiked(
  ig: IgApiClient,
  auth: AccountRepositoryLoginResponseLogged_in_user
) {
  const timeline: TimelineFeed = ig.feed.timeline();
  let anyNewLikes;
  let count = 0;
  while (!anyNewLikes) {
    console.info(`Fetching page ${count} of run`);
    count += 1;

    const items = await timeline.items();
    for (const post of items) {
      simulateHumanity(1000, 10491);
      if (
        !post.has_liked &&
        !post.ad_action &&
        !post.ad_id &&
        !post.ad_metadata &&
        !post.ad_header_style &&
        !(post.ad_header_style == 0)
      ) {
        console.info(
          `Liking post from ${post.user.full_name} aka ${post.user.username}`
        );
        anyNewLikes = true;
        ig.media.like({
          mediaId: post.id,
          moduleInfo: {
            module_name: 'profile',
            user_id: auth.pk,
            username: auth.username,
          },
          d: 1,
        });
      } else {
        console.info(
          `Skipping post from ${post.user.full_name} aka ${post.user.username}. Liked or is ad.`
        );
      }
    }
    simulateHumanity(1000, 3512);
    anyNewLikes = false;
  }
}

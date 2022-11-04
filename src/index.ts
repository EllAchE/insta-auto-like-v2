import { generateClientAndLogIn } from './login';
import { likeTimelinePostsUntilLastLiked } from './timeline';

async function loginAndLikePosts() {
  const { ig, auth } = await generateClientAndLogIn();
  await likeTimelinePostsUntilLastLiked(ig, auth);
}

loginAndLikePosts();

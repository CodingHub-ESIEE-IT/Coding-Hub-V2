import { getOneTopic } from '@/lib/utils/api/topic';
import { Topic } from '@/types/topic';
import TopicDetails from "@/components/forum/TopicDetails/TopicDetails";
import { getCurrentUser } from "@/lib/utils/api/auth";

interface TopicPageProps {
  params: Promise<{ topicId: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topicId = parseInt((await params).topicId, 10);
  const user = await getCurrentUser();

  if (isNaN(topicId)) {
    throw new Error('Invalid topic ID');
  }

  try {
    const topic: Topic = await getOneTopic(topicId);

    if (!topic) {
      return <div>Topic non trouvé</div>;
    }

    return <TopicDetails topic={topic} user={user} />;
  } catch (error) {
    console.error('Erreur lors du chargement du topic:', error);
    return <div>Erreur lors du chargement du topic</div>;
  }
}

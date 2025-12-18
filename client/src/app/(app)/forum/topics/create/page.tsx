import CreateTopicForm from '@/components/forum/CreateTopicForm/CreateTopicForm'
import { createTopicAction } from '@/lib/actions/topic.action'
import './createTopic.css'
import { getCategories } from "@/lib/utils/api/category";
import { Category, CategoryOption } from "@/types/category";

/* const categoryOptions: CategoryOption[] = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'devops', label: 'DevOps' },
  { value: 'mobile', label: 'Développement Mobile' },
  { value: 'database', label: 'Bases de données' },
  { value: 'other', label: 'Autre' },
]; */

export default async function CreateTopicPage() {
  const categories = await getCategories();
  const categoryOptions: CategoryOption[] = categories.map(
    (category: Category) => ({
      value: category.id,
      label: category.name
    })
  );

  return (
    <div className="create-topic-container">
      <h1 className="create-topic-title">
        Créer un <span>sujet</span>
      </h1>
      <p className="create-topic-description">
        Assurez-vous de formuler votre question de manière concise et claire
        pour faciliter la compréhension des autres membres et obtenir des
        réponses pertinentes.
      </p>
      <div className="create-topic-separator" />

      <CreateTopicForm
        categories={categoryOptions}
        topicAction={createTopicAction}
      />
    </div>
  )
}
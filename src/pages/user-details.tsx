import { useRouter } from 'next/router';
import { useAxios } from '../hooks/useAxios';

interface IUsers {
  id: number;
  name: string;
}

export default function UserList() {
  const router = useRouter();
  const { query: { id } } = router
  
  const { data } = useAxios<IUsers>(`/users/${id}`)

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      <li>ID: {data?.id}</li>
      <li>Name: {data?.name}</li>
    </ul>
  )
}

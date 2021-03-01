import Link from 'next/link';
import { mutate as mutateGlobal } from 'swr';

import { useCallback } from 'react';
import { useAxios } from '../hooks/useAxios';

import api from '../services/api';

interface IUsers {
  id: number;
  name: string;
}

export default function UserList() {
  const { data, mutate } = useAxios<IUsers[]>('users');

  const handleNameChange = useCallback((id: number) => {
    api.put(`users/${id}`, { name: 'Pedro' });

    const updatedUsers = data?.map(user => {
      if (user.id === id) {
        return { ...user, name: 'Pedro' }
      }

      return user;
    })

    mutate(updatedUsers, false)
    mutateGlobal(`/users/${id}`, { id, name: 'Pedro' })
  }, [data, mutate]);
  

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          <Link href={{
            pathname: `/user-details`,
            query: { id: user.id }
          }}>{user.name}</Link>
          {' '}
          <button type="button" onClick={() => handleNameChange(user.id)}>Alterar nome</button>
        </li>
      ))}
    </ul>
  )
}

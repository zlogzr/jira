import { Task } from '@/types/task'
import { useHttp } from '@/utils/http'
import { useQuery } from 'react-query'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

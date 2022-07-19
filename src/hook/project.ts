import { useAsync } from '@/hook/use-async'
import { Project } from '@/pages/project-list/list'
import { useHttp } from '@/utils/http'
import { cleanObject } from '@/utils/index'
import { useEffect } from 'react'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param])

  return result
}

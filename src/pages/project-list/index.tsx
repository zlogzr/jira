import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useMount } from '@/utils'
import * as qs from 'qs'
import { useEffect, useState } from 'react'

// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectList = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
      async response => {
        if (response.ok) {
          setList(await response.json())
        }
      }
    )
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}

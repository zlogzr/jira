import { useAddKanban } from '@/hook/kanban'
import { Input } from 'antd'
import { useState } from 'react'

import { Container } from './kanban-column'
import { useKanbansQueryKey, useProjectIdInUrl } from './util'

export const CreateKanban = () => {
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())

  const [name, setName] = useState('')

  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }

  return (
    <Container>
      <Input
        size={'large'}
        placeholder={'新建看板名称'}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Container>
  )
}

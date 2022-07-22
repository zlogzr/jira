import { ButtonNoPadding, Row } from '@/components/lib'
import { useProjects } from '@/hook/project'
import { useDocumentTitle } from '@/hook/useDocumentTitle'
import { useUsers } from '@/hook/user'
import { useDebounce } from '@/utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'

import { List } from './list'
import { SearchPanel } from './search-panel'
import { useProjectModal, useProjectsSearchParams } from './util'

// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectList = () => {
  useDocumentTitle('项目列表', false)
  const { open } = useProjectModal()

  const [param, setParam] = useProjectsSearchParams()

  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} refresh={retry} />
    </Container>
  )
}

ProjectList.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`

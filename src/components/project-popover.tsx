import { useProjects } from '@/hook/project'
import { projectListActions } from '@/pages/project-list/project-list.slice'
import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useDispatch } from 'react-redux'

import { ButtonNoPadding } from './lib'

export const ProjectPopover = () => {
  const dispatch = useDispatch()
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => dispatch(projectListActions.openProjectModal())}
        type={'link'}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
